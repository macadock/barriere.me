import { Hono } from 'hono';
import { basicAuth } from "hono/basic-auth";
import { zValidator } from "@hono/zod-validator";
import zod from 'zod';
import { createClient } from '@supabase/supabase-js'

import {
  getCloudflareDomainId,
  updateCloudflareDomainWithIp,
} from "./cloudflare/domain.ts";

import type {Database} from "../../types/supabase.ts";

type Configuration = {
    username: string;
    password: string;
    cloudflareApiToken: string;
    cloudflareZoneId: string;
    domainId: string
}

type Variables = {
    configuration: Configuration
};

const functionName = 'ddns-update';

const app = new Hono<{ Variables: Variables}>().basePath(`/${functionName}`);

const domainRegex = /\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

const updateDomainSchema = zod.object({
  domain: zod.string().regex(domainRegex, "Invalid domain"),
  ip: zod.string().ip(),
});

const supabase = createClient<Database>(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
)

app.use(zValidator("query", updateDomainSchema), async (c, next) => {

    const { domain } = c.req.valid("query");

    const { data, error } = await supabase.from('ddns_authorization').select('id, configuration').eq('domain', domain).limit(1).single()

    if (error || !data) {
        return c.text("Domain unauthorized", 401);
    }

    const configuration = data.configuration as Configuration

    c.set('configuration', {
        ...configuration,
        domainId: data.id
    })

    return next();

})

app.use(basicAuth({
    verifyUser: (username, password, c) => {
        const config = c.get("configuration");
        return username === config.username && password === config.password;
    },
}))

app.get(
    "/",
    async (c) => {
        const { domain, ip } = c.req.valid("query");
        const { cloudflareApiToken, cloudflareZoneId, domainId } = c.get("configuration");

        try {
        console.log(`Starting to update ${domain} with ${ip}`)

        const recordId = await getCloudflareDomainId({ domain, cloudflareApiToken, cloudflareZoneId });

        await updateCloudflareDomainWithIp({
          recordId,
          ip,
          cloudflareZoneId,
        cloudflareApiToken
        })

          const { error} = await supabase.from('ddns_logs').insert([{
              domain,
              ip,
              domain_id: domainId
          }])

            if (error) {
                console.error(`Error inserting ddns_logs ${domain} with ${ip}`, error)
            }


            console.log(`Successfully updated ${domain} with ${ip}`)
        return c.text("ok");
      } catch (error: unknown) {
          console.error(`Error updating domain ${domain} with ${ip}`, error)
        return c.json({ error: "Error updating domain" }, 500);
      }
    },
);

Deno.serve(app.fetch);

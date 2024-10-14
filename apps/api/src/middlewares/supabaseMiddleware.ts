import type { Database } from "@repo/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import type { MiddlewareHandler } from "hono";
import type { AppType } from "../app";

export const supabaseMiddleware: MiddlewareHandler<AppType> = (c, next) => {
	const supabaseUrl = c.env.SUPABASE_URL;
	const supabaseAnonKey = c.env.SUPABASE_ANON_KEY;
	const accessToken = c.req.header("Authorization");

	const supabase = new SupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
		global: {
			headers: accessToken
				? {
						Authorization: accessToken,
					}
				: {},
		},
	});

	c.set("supabase", supabase);
	return next();
};

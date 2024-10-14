import { zValidator } from "@hono/zod-validator";
import type { Database } from "@repo/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { Hono } from "hono";
import zod from "zod";
import type { AppType } from "../../app";

export const publicAuthRoutes = new Hono<AppType>();

const loginDto = zod.object({
	email: zod.string(),
	password: zod.string(),
});

publicAuthRoutes.post("/login", zValidator("json", loginDto), async (c) => {
	const supabaseUrl = c.env.SUPABASE_URL;
	const supabaseAnonKey = c.env.SUPABASE_ANON_KEY;

	const supabase = new SupabaseClient<Database>(supabaseUrl, supabaseAnonKey);

	const { email, password } = c.req.valid("json");

	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return c.text("Unable to login", 401);
	}

	const accessToken = data.session.access_token;
	const refreshToken = data.session.refresh_token;

	return c.json({
		accessToken,
		refreshToken,
	});
});

const refreshTokenDto = zod.object({
	token: zod.string(),
});
publicAuthRoutes.get(
	"/refresh-token",
	zValidator("query", refreshTokenDto),
	async (c) => {
		const supabase = c.get("supabase");
		const token = c.req.valid("query").token;
		const { data, error } = await supabase.auth.refreshSession({
			refresh_token: token,
		});

		if (error || !data?.session) {
			return c.text("Unable to refresh token", 401);
		}

		const accessToken = data.session.access_token;
		const refreshToken = data.session.refresh_token;

		return c.json({
			accessToken,
			refreshToken,
		});
	},
);

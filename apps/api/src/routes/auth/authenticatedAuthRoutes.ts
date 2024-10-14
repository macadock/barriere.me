import { Hono } from "hono";
import type { AppType } from "../../app";

export const authenticatedAuthRoutes = new Hono<AppType>();

authenticatedAuthRoutes.post("/logout", async (c) => {
	const supabase = c.get("supabase");

	const { error } = await supabase.auth.signOut();

	if (error) {
		return c.text("Error while logging out", 500);
	}

	return c.text("ok");
});

authenticatedAuthRoutes.get("/me", async (c) => {
	const supabase = c.get("supabase");

	const { data, error } = await supabase.auth.getUser();

	if (error || !data) {
		return c.text("Error while getting user", 500);
	}

	return c.json({
		email: data.user.email,
	});
});

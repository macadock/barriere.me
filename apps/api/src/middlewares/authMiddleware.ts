import type { MiddlewareHandler } from "hono";
import type { AppType } from "../app";

const PUBLIC_ROUTES = ["/api/auth/login", "/api/auth/refresh-token"];

export const authMiddleware: MiddlewareHandler<AppType> = async (c, next) => {
	if (PUBLIC_ROUTES.includes(c.req.path)) {
		return next();
	}

	const supabase = c.get("supabase");
	const { data, error } = await supabase.auth.getUser();

	const user = data?.user;

	if (error || !user) {
		return c.text("Unauthorized", 401);
	}

	c.set("user", user);
	return next();
};

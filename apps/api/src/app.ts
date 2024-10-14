import type { Database } from "@repo/supabase";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { Hono } from "hono";
import { authMiddleware } from "./middlewares/authMiddleware";
import { supabaseMiddleware } from "./middlewares/supabaseMiddleware";
import { privateRoutes, publicRoutes } from "./routes";

export type Variables = {
	supabase: SupabaseClient<Database>;
	user: User;
};

export type AppType = {
	Bindings: CloudflareBindings;
	Variables: Variables;
};

export const app = new Hono<AppType>().basePath("api");

app.use(supabaseMiddleware);
app.use(authMiddleware);
app.route("/", privateRoutes);
app.route("/", publicRoutes);

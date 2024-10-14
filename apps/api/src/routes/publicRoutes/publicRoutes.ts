import { Hono } from "hono";
import type { AppType } from "../../app";
import { publicAuthRoutes } from "../auth";

export const publicRoutes = new Hono<AppType>();

publicRoutes.route("/auth", publicAuthRoutes);

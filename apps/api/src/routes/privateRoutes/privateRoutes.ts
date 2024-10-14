import { Hono } from "hono";
import type { AppType } from "../../app";
import { measuresRoutes } from "../api";
import { authenticatedAuthRoutes } from "../auth";

export const privateRoutes = new Hono<AppType>();

privateRoutes.route("/auth", authenticatedAuthRoutes);
privateRoutes.route("/measures", measuresRoutes);

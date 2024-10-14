import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import type { AppType } from "../../../app";
import {
	createMeasureBodyDto,
	measureIdDto,
	updateMeasureBodyDto,
} from "./schema";

export const measuresRoutes = new Hono<AppType>();

measuresRoutes.get("/", async (c) => {
	const supabase = c.get("supabase");

	const { data, error } = await supabase.from("measurements").select("*");

	if (error) {
		return c.json(error, 500);
	}

	return c.json(data, 200);
});

measuresRoutes.post(
	"/",
	zValidator("json", createMeasureBodyDto),
	async (c) => {
		const supabase = c.get("supabase");

		const user = c.get("user");
		const userId = user.id;

		const body = c.req.valid("json");
		const payload = {
			user_id: userId,
			...body,
		};

		const { data, error } = await supabase
			.from("measurements")
			.insert(payload)
			.select("*")
			.single();

		if (error) {
			return c.json({ payload, error }, 500);
		}

		return c.json(data, 201);
	},
);

measuresRoutes.get(
	"/:measureId",
	zValidator("param", measureIdDto),
	async (c) => {
		const supabase = c.get("supabase");

		const { measureId } = c.req.valid("param");

		const { data, error } = await supabase
			.from("measurements")
			.select("*")
			.match({ id: measureId })
			.single();

		if (error) {
			return c.notFound();
		}

		return c.json(data, 200);
	},
);

measuresRoutes.patch(
	"/:measureId",
	zValidator("param", measureIdDto),
	zValidator("json", updateMeasureBodyDto),
	async (c) => {
		const supabase = c.get("supabase");

		const { measureId } = c.req.valid("param");
		const body = c.req.valid("json");

		const {
			data: measure,
			error: errorSelect,
			count: countSelect,
		} = await supabase
			.from("measurements")
			.select("*", { count: "exact" })
			.match({ id: measureId })
			.single();

		if (errorSelect || countSelect === 0) {
			return c.notFound();
		}

		const newMeasure = {
			...body,
			measures: {
				...(measure.measures as object),
				...body.measures,
			},
		};

		const {
			data,
			count,
			error: errorUpdate,
		} = await supabase
			.from("measurements")
			.update(newMeasure, { count: "exact" })
			.match({ id: measureId })
			.select("*")
			.single();

		if (errorUpdate || count === 0) {
			return c.text("Error while updating measure", 500);
		}

		return c.json(data, 200);
	},
);

measuresRoutes.delete(
	"/:measureId",
	zValidator("param", measureIdDto),
	async (c) => {
		const supabase = c.get("supabase");

		const { measureId } = c.req.valid("param");

		const { error, count } = await supabase
			.from("measurements")
			.delete({ count: "exact" })
			.match({ id: measureId });

		if (error || count === 0) {
			return c.notFound();
		}

		return c.body(null, 204);
	},
);

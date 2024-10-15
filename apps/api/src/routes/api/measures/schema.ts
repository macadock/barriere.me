import zod, { type ZodRawShape } from "zod";

const measureAttribute = zod.preprocess(
	(val) => {
		if (typeof val === "string") {
			return val.replace(",", ".");
		}
		return val;
	},
	zod
		.number({
			coerce: true,
			message: "Merci d'entrer un nombre",
		})
		.positive("Le nombre doit être positif")
		.optional(),
);

const measureProperties = [
	"leftBicep",
	"rightBicep",
	"chest",
	"waist",
	"belly",
	"hips",
	"leftThigh",
	"rightThigh",
	"leftKnee",
	"rightKnee",
	"weight",
];

export const measuresSchema = zod.object(
	measureProperties.reduce((acc, prop) => {
		acc[prop] = measureAttribute;
		return acc;
	}, {} as ZodRawShape),
);

export const measureSchema = zod.object({
	measures: zod.object(measuresSchema.shape),
	date: zod.date({
		coerce: true,
		message: "Merci d'entrer une date",
	}),
	id: zod.string().uuid(),
});

export type Measure = zod.infer<typeof measureSchema>;

export const createMeasureBodyDto = measureSchema
	.omit({
		id: true,
	})
	.partial()
	.required({
		measures: true,
	});

export const updateMeasureBodyDto = measureSchema.partial();

export const measureIdDto = zod.object({
	measureId: zod.string().uuid(),
});

import zod from "zod";

export const measuresSchema = zod.object({
	leftBicep: zod.number().positive().optional(),
	rightBicep: zod.number().positive().optional(),
	chest: zod.number().positive().optional(),
	waist: zod.number().positive().optional(),
	belly: zod.number().positive().optional(),
	hips: zod.number().positive().optional(),
	leftThigh: zod.number().positive().optional(),
	rightThigh: zod.number().positive().optional(),
	leftKnee: zod.number().positive().optional(),
	rightKnee: zod.number().positive().optional(),
	weight: zod.number().positive().optional(),
});

export const measureSchema = zod.object({
	measures: zod.object(measuresSchema.shape),
	date: zod.string().datetime(),
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

"use server";

import { fetchWithCookies } from "@/utils/fetch";
import type { Measure } from "api/src/routes/api/measures/schema";
import { revalidateTag } from "next/cache";

const ALL_MEASURES_CACHE_TAG = "allMeasures";

export const getMeasures = async (): Promise<Array<Measure>> => {
	const response = await fetchWithCookies({
		url: "/measures",
		tags: [ALL_MEASURES_CACHE_TAG],
	});

	if (!response.ok) {
		return [];
	}

	return response.json();
};

export const createMeasure = async (
	measure: Omit<Measure, "id">,
): Promise<Measure> => {
	const response = await fetchWithCookies({
		url: "/measures",
		query: {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(measure),
		},
	});

	if (!response.ok) {
		throw new Error("Error while creating measure");
	}

	revalidateTag(ALL_MEASURES_CACHE_TAG);
	return response.json();
};

export const updateMeasure = async (
	measure: Pick<Measure, "id" | "measures"> &
		Partial<Omit<Measure, "id" | "measures">>,
): Promise<Measure> => {
	const measureId = measure.id;
	const response = await fetchWithCookies({
		url: `/measures/${measureId}`,
		query: {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(measure),
		},
	});

	if (!response.ok) {
		throw new Error("Error while updating measure");
	}

	revalidateTag(ALL_MEASURES_CACHE_TAG);
	return response.json();
};

export const removeMeasure = async (measureId: string) => {
	const response = await fetchWithCookies({
		url: `/measures/${measureId}`,
		query: {
			method: "DELETE",
		},
	});

	if (!response.ok) {
		throw new Error("Error while deleting measure");
	}
	revalidateTag(ALL_MEASURES_CACHE_TAG);
};

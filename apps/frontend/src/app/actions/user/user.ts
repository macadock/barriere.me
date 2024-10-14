"use server";

import { fetchWithCookies } from "@/utils/fetch";

export const getUser = async () => {
	const response = await fetchWithCookies({ url: "/auth/me" });

	if (!response.ok) {
		return undefined;
	}

	return response.json<{ email: string }>();
};

"use server";

import { fetchWithCookies } from "@/utils/fetch";

export const getUser = async (): Promise<{ email: string } | undefined> => {
	const response = await fetchWithCookies({ url: "/auth/me" });

	if (!response.ok) {
		return undefined;
	}

	return response.json();
};

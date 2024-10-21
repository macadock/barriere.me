"use server";

import { fetchWithAuthentication } from "@/utils/fetch";

export const getUser = async (): Promise<{ email: string } | undefined> => {
	const response = await fetchWithAuthentication({ url: "/auth/me" });

	if (!response.ok) {
		return undefined;
	}

	return response.json();
};

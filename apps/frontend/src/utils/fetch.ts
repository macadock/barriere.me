import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cookies } from "next/headers";

interface FetchWithCookiesParams {
	url: string;
	query?: RequestInit;
	tags?: string[];
}

export const fetchWithCookies = async ({
	url,
	query,
	tags = [],
}: FetchWithCookiesParams): Promise<Response> => {
	const { API_URL } = (await getCloudflareContext()).env;
	const cookiesStore = cookies();

	const accessTokenCookie = cookiesStore.get("access_token");

	const requestInit: RequestInit = {
		...query,
		headers: {
			...query?.headers,
			Authorization: `Bearer ${accessTokenCookie?.value}`,
		},
	};

	return await fetch(`${API_URL}${url}`, {
		...requestInit,
		next: {
			tags,
		},
	});
};

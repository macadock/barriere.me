import { cookies } from "next/headers";

interface FetchWithCookiesParams {
	url: string;
	query?: RequestInit;
	tags?: string[];
}

export const fetchWithAuthentication = async ({
	url,
	query,
	tags = [],
}: FetchWithCookiesParams): Promise<Response> => {
	const API_URL = process.env.API_URL;
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

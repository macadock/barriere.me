import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cookies } from "next/headers";

const COOKIE_EXPIRATION_DELAY = 60 * 60 * 24 * 30; // 30 days
export const REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
export const ACCESS_TOKEN_COOKIE_NAME = "access_token";

const COOKIE_OPTIONS = {
	path: "/",
	httpOnly: true,
	expires: new Date(Date.now() + COOKIE_EXPIRATION_DELAY * 1000),
};

const getCookiesOptions = async () => {
	const { ENVIRONMENT } = (await getCloudflareContext()).env;
	return {
		...COOKIE_OPTIONS,
		secure: ENVIRONMENT !== "local",
	};
};

const setCookies = async ({
	accessToken,
	refreshToken,
}: { accessToken?: string; refreshToken?: string }) => {
	const cookieStore = cookies();
	const cookiesOptions = await getCookiesOptions();
	if (accessToken) {
		cookieStore.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, cookiesOptions);
	}

	if (refreshToken) {
		cookieStore.set(REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookiesOptions);
	}
};

const removeCookies = () => {
	const cookieStore = cookies();
	cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME);
	cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);
};

export { setCookies, removeCookies };

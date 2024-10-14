import type { CookieOptions } from "hono/dist/types/utils/cookie";

export const COOKIE_EXPIRATION_DELAY = 60 * 60 * 24 * 30; // 30 days

export const getDefaultCookieOptions = ({
	isSecure = false,
}): CookieOptions => {
	return {
		httpOnly: true,
		secure: isSecure,
		sameSite: "Lax",
		expires: new Date(Date.now() + COOKIE_EXPIRATION_DELAY * 1000),
	};
};

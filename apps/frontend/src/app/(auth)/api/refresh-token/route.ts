import {
	REFRESH_TOKEN_COOKIE_NAME,
	removeCookies,
	setCookies,
} from "@/app/actions/auth/cookies.utils";
import { getUser } from "@/app/actions/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
	const user = await getUser();
	const cookieStore = cookies();

	if (user) {
		redirect("/");
	}

	if (!cookieStore.has(REFRESH_TOKEN_COOKIE_NAME)) {
		redirect("/login");
	}

	const API_URL = process.env.API_URL;

	const { searchParams } = new URL(request.url);
	const url = new URL(`${API_URL}/auth/refresh-token`);

	const refreshTokenCookie = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME);
	if (refreshTokenCookie) {
		url.searchParams.set("token", refreshTokenCookie.value);
	}

	const page = searchParams.get("page");

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		removeCookies();
		redirect("/login");
	}

	const { accessToken, refreshToken } = await response.json<{
		accessToken: string;
		refreshToken: string;
	}>();

	setCookies({
		accessToken,
		refreshToken,
	});

	return redirect(page ?? "/");
}

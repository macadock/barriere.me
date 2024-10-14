"use server";

import { setCookies } from "@/app/actions/auth/cookies.utils";
import { fetchWithCookies } from "@/utils/fetch";
import { redirect } from "next/navigation";

export async function handleLogin(
	page: string | undefined,
	formData: FormData,
) {
	const payload = {
		email: formData.get("email"),
		password: formData.get("password"),
	};

	const response = await fetchWithCookies({
		url: "/auth/login",
		query: {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		},
	});

	if (!response.ok) {
		redirect(
			`/login?message=${encodeURIComponent("Mauvais identifiants ou mot de passe")}`,
		);
	}

	const { accessToken, refreshToken } = await response.json<{
		accessToken: string;
		refreshToken: string;
	}>();

	await setCookies({
		accessToken,
		refreshToken,
	});

	redirect(page ?? "/");
}

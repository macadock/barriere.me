"use server";

import { fetchWithCookies } from "@/utils/fetch";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleLogout = async () => {
	const cookieStore = cookies();
	const response = await fetchWithCookies({
		url: "/auth/logout",
		query: {
			method: "POST",
		},
	});

	if (response.ok) {
		cookies().delete("access_token");
		cookies().delete("refresh_token");
		redirect("/login");
	}
};

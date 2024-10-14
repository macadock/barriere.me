"use client";

import type { getUser } from "@/app/actions/user";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import type { PropsWithChildren } from "react";

export interface AuthRedirectionProps {
	user: Awaited<ReturnType<typeof getUser>>;
	hasRefreshToken: boolean;
}

export const AuthRedirection = ({
	user,
	hasRefreshToken,
	children,
}: PropsWithChildren<AuthRedirectionProps>) => {
	const pathname = usePathname();
	const isLoginPage = pathname === "/login";
	const searchParams = useSearchParams();

	const urlParams = new URLSearchParams();
	if (pathname && !searchParams.has("page")) {
		urlParams.append("page", pathname);
	}

	if (user) {
		return isLoginPage ? redirect("/") : children;
	}

	if (!user) {
		if (isLoginPage) {
			return children;
		}

		return hasRefreshToken
			? redirect(`/api/refresh-token?${urlParams.toString()}`)
			: redirect(`/login?${urlParams.toString()}`);
	}

	return null;
};

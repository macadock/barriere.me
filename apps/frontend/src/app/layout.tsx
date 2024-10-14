import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getUser } from "@/app/actions/user";
import { AuthRedirection } from "@/components/common/auth-redirection/auth-redirection";
import { BreakpointsHelper } from "@/components/common/breakpoint-helper";
import { clsx } from "clsx";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Maison",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await getUser();
	return (
		<html lang="en">
			<body
				className={clsx(
					"min-h-screen max-w-full overflow-hidden text-balance",
					inter.className,
				)}
			>
				<AuthRedirection
					user={user}
					hasRefreshToken={cookies().has("refresh_token")}
				>
					{children}
					<BreakpointsHelper />
				</AuthRedirection>
			</body>
		</html>
	);
}

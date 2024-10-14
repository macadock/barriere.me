"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItemProps {
	icon: React.ReactNode;
	label: string;
	href: string;
	mobile?: boolean;
}

export const NavItem = ({
	label,
	icon,
	href,
	mobile = false,
}: NavItemProps) => {
	const pathname = usePathname();
	const isActive = pathname === href;

	if (mobile) {
		return (
			<Link
				href={href}
				className={clsx(
					"mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
					{
						"text-foreground bg-muted": isActive,
						"text-muted-foreground": !isActive,
					},
				)}
			>
				{icon}
				{label}
			</Link>
		);
	}

	return (
		<Link
			href={href}
			className={clsx(
				"flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
				{
					"text-primary bg-muted": isActive,
					"text-muted-foreground": !isActive,
				},
			)}
		>
			{icon}
			{label}
		</Link>
	);
};

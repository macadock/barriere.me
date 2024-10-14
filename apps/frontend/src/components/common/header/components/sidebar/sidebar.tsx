import { NavItem } from "@/components/common/header/components/nav-item/nav-item";
import { Home, Package2, Ruler } from "lucide-react";
import Link from "next/link";

export const Sidebar = () => {
	return (
		<div className="hidden border-r bg-muted/40 md:block">
			<div className="flex h-full max-h-screen flex-col gap-2">
				<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
					<Link
						href="/apps/frontend/public"
						className="flex items-center gap-2 font-semibold"
					>
						<Package2 className="h-6 w-6" />
						<span className="">Barriere & Cie</span>
					</Link>
				</div>
				<div className="flex-1">
					<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
						<NavItem
							icon={<Home className="h-4 w-4" />}
							label={"Tableau de bord"}
							href={"/"}
						/>
						<NavItem
							icon={<Ruler className="h-4 w-4" />}
							label={"Mesures"}
							href={"/measures"}
						/>
					</nav>
				</div>
			</div>
		</div>
	);
};

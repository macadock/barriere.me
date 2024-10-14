import { NavItem } from "@/components/common/header/components/nav-item/nav-item";
import { Home, Package2, Ruler } from "lucide-react";
import Link from "next/link";

export const MobileNavbar = () => {
	return (
		<nav className="grid gap-2 text-lg font-medium">
			<Link href="#" className="flex items-center gap-2 text-lg font-semibold">
				<Package2 className="h-6 w-6" />
				<span className="sr-only">Barriere & Cie</span>
			</Link>
			<NavItem
				icon={<Home className="h-5 w-5" />}
				label={"Tableau de bord"}
				href={"/"}
				mobile
			/>
			<NavItem
				icon={<Ruler className="h-5 w-5" />}
				label={"Mesures"}
				href={"/measures"}
				mobile
			/>
		</nav>
	);
};

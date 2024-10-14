import { MobileNavbar } from "@/components/common/header/components/mobile-navbar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Menu, Package2, Ruler } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export const Header = ({ children }: PropsWithChildren) => {
	return (
		<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden">
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="flex flex-col">
					<MobileNavbar />
				</SheetContent>
			</Sheet>
			{children}
		</header>
	);
};

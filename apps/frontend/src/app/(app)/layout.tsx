import { Header } from "@/components/common/header";
import { Sidebar } from "@/components/common/header/components/sidebar";
import { LogoutButton } from "@/components/common/logout-button";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/sonner";
import { CircleUser } from "lucide-react";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<Sidebar />
			<div className="flex flex-col">
				<Header>
					<div className="w-full flex-1 flex justify-end">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="secondary"
									size="icon"
									className="rounded-full"
								>
									<CircleUser className="h-5 w-5" />
									<span className="sr-only">Toggle user menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Mon compte</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<LogoutButton />
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</Header>
				<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
					{children}
				</main>
				<Toaster />
			</div>
		</div>
	);
}

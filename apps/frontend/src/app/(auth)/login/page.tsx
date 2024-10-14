import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Metadata } from "next";
import { handleLogin } from "../../actions/auth";

export const metadata: Metadata = {
	title: "Connexion",
};

export default async function LoginForm({
	searchParams,
}: { searchParams: { page: string | undefined } }) {
	console.log(searchParams.page);

	const handleLoginWithRedirection = handleLogin.bind(null, searchParams.page);

	return (
		<form
			className={"w-full h-svh flex items-center justify-center"}
			action={handleLoginWithRedirection}
		>
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Connexion</CardTitle>
					<CardDescription>
						Entrez votre email ci-dessous pour vous connecter à votre compte.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							type="email"
							id="email"
							name={"email"}
							placeholder="nom@domaine.com"
							autoComplete={"email"}
							required
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Mot de passe</Label>
						<Input
							type="password"
							id="password"
							name={"password"}
							placeholder="Mot de passe"
							autoComplete={"current-password"}
							required
						/>
					</div>
				</CardContent>
				<CardFooter>
					<Button className="w-full" type={"submit"}>
						Se connecter
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}

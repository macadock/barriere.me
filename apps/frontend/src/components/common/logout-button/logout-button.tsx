import { handleLogout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export const LogoutButton = () => {
	return (
		<form action={handleLogout} className={"w-full"}>
			<Button type={"submit"} className={"w-full"}>
				Déconnexion
			</Button>
		</form>
	);
};

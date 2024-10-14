import { handleLogout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export const LogoutButton = () => {
	return (
		<form action={handleLogout}>
			<Button type={"submit"}>Déconnexion</Button>
		</form>
	);
};

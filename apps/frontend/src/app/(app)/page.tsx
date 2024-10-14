import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Tableau de bord | Maison",
};

export default function Dashboard() {
	return redirect("/measures");
}

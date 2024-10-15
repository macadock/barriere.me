import { getMeasures } from "@/app/actions/measures";
import {
	MeasureTabs,
	MeasuresHeader,
} from "@/components/features/measures/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Mesures | Maison",
};

export default async function Measures() {
	const measures = await getMeasures();

	return (
		<div className={"flex flex-col flex-1 gap-6 overflow-hidden"}>
			<MeasuresHeader />
			<MeasureTabs measures={measures} />
		</div>
	);
}

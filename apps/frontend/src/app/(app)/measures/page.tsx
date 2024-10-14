import { deleteMeasure, getMeasures } from "@/app/actions/measures";
import { MeasureEmptyScreen } from "@/components/features/measures/measure-empty-screen";
import { MeasuresHeader } from "@/components/features/measures/measures-header";
import { MeasuresTable } from "@/components/features/measures/measures-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Mesures | Maison",
};

export default async function Measures() {
	const measures = await getMeasures();

	return (
		<div className={"flex flex-col gap-6 overflow-hidden h-full"}>
			<MeasuresHeader />
			{measures.length > 0 ? (
				<MeasuresTable measures={measures} onClickRemove={deleteMeasure} />
			) : (
				<MeasureEmptyScreen />
			)}
		</div>
	);
}

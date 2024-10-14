import { getMeasures } from "@/app/actions/measures";
import { MeasureEmptyScreen } from "@/components/features/measures/measure-empty-screen";
import { MeasuresCard } from "@/components/features/measures/measures-card";
import { MeasuresHeader } from "@/components/features/measures/measures-header";

export default async function Measures() {
	const measures = await getMeasures();

	return (
		<>
			<MeasuresHeader />
			{measures.length > 0 ? <MeasuresCard /> : <MeasureEmptyScreen />}
		</>
	);
}

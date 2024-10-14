import { MeasureItem } from "@/components/features/measures/measure-item/measure-item";
import type { Measure } from "api/src/routes/api/measures/schema";

export interface MeasureListProps {
	measures: Array<Measure>;
}

export const MeasureList = ({ measures }: MeasureListProps) => {
	return (
		<>
			{measures.map((measure) => (
				<MeasureItem key={measure.id} measure={measure} />
			))}
		</>
	);
};

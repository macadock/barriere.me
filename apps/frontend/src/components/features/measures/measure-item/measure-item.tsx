import type { Measure } from "api/src/routes/measures/schema";

export interface MeasureItemProps {
	measure: Measure;
}

export const MeasureItem = ({ measure }: MeasureItemProps) => {
	return <div>{measure.date}</div>;
};

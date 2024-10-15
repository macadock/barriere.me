import { deleteMeasure } from "@/app/actions/measures";
import {
	MeasureEmptyScreen,
	MeasuresTable,
} from "@/components/features/measures/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Measure } from "api/src/routes/api/measures/schema";

export interface MeasureTabsProps {
	measures: Array<Measure>;
}

export const MeasureTabs = ({ measures = [] }: MeasureTabsProps) => {
	if (measures.length === 0) {
		return <MeasureEmptyScreen />;
	}

	return (
		<Tabs defaultValue="table">
			<TabsList>
				<TabsTrigger value="table">Table</TabsTrigger>
				<TabsTrigger value="password" disabled>
					Graphique (à venir)
				</TabsTrigger>
			</TabsList>
			<TabsContent value="table">
				<MeasuresTable measures={measures} onClickRemove={deleteMeasure} />
			</TabsContent>
		</Tabs>
	);
};

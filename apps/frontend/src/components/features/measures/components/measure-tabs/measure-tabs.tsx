import {
	MeasureEmptyScreen,
	MeasuresTable,
} from "@/components/features/measures/components";
import { MeasureChart } from "@/components/features/measures/components/measure-chart/measure-chart";
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
		<Tabs defaultValue="table" className={"flex-1 overflow-hidden"}>
			<TabsList>
				<TabsTrigger value="table">Table</TabsTrigger>
				<TabsTrigger value="chart">Graphique</TabsTrigger>
			</TabsList>
			<TabsContent value="table">
				<MeasuresTable measures={measures} />
			</TabsContent>
			<TabsContent value="chart" className={"h-full overflow-y-auto"}>
				<MeasureChart measures={measures} />
			</TabsContent>
		</Tabs>
	);
};

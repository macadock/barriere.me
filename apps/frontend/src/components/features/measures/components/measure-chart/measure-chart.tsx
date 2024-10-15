"use client";

import { measureProps } from "@/components/features/measures/config";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	type Measure,
	measureProperties,
} from "api/src/routes/api/measures/schema";
import { useMemo, useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "recharts";

export interface MeasureChartProps {
	measures: Array<Measure>;
}

export const MeasureChart = ({ measures }: MeasureChartProps) => {
	const [property, setProperty] = useState<string>(measureProperties[0]);

	const { data, chartConfig } = useMemo(() => {
		const { label } = measureProps[property];

		const data = measures.map((measure) => ({
			id: measure.id,
			date: new Intl.DateTimeFormat("fr-FR").format(new Date(measure.date)),
			data: measure.measures[property] as number,
		}));

		const chartConfig = {
			data: {
				label,
				color: "hsl(var(--chart-1))",
			},
			label: {
				color: "hsl(var(--background))",
			},
		} satisfies ChartConfig;

		return {
			data,
			chartConfig,
		};
	}, [measures, property]);

	return (
		<div className={"flex flex-col gap-4 p-4"}>
			<Select value={property} onValueChange={setProperty}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Mesure" />
				</SelectTrigger>
				<SelectContent>
					{measureProperties.map((measure) => {
						const { label } = measureProps[measure];
						return (
							<SelectItem key={measure} value={measure}>
								{label}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
			<ChartContainer config={chartConfig} className={"w-full min-h-[200px]"}>
				<BarChart
					accessibilityLayer
					data={data}
					layout={"vertical"}
					margin={{
						right: 40,
					}}
				>
					<CartesianGrid horizontal={false} />
					<XAxis type="number" dataKey="data" hide />
					<YAxis
						dataKey="date"
						type="category"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						hide
					/>
					<ChartTooltip
						cursor={false}
						content={
							<ChartTooltipContent className="w-[250px]" nameKey="data" />
						}
					/>
					<Bar dataKey={"data"} fill={"var(--color-data)"} radius={5}>
						<LabelList
							dataKey="date"
							position="insideLeft"
							offset={8}
							className="fill-[--color-label]"
							fontSize={12}
						/>
						<LabelList
							dataKey="data"
							position="right"
							offset={8}
							className="fill-foreground"
							fontSize={12}
						/>
					</Bar>
				</BarChart>
			</ChartContainer>
		</div>
	);
};

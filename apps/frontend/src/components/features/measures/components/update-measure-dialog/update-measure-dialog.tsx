"use client";

import { updateMeasure } from "@/app/actions/measures";
import { measureProps } from "@/components/features/measures/config";
import {
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	type Measure,
	measureSchema,
} from "api/src/routes/api/measures/schema";
import { CalendarIcon } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export interface UpdateMeasureDialogProps {
	measure: Measure;
	onClose: () => void;
}

export const UpdateMeasureDialog = ({
	measure,
	onClose,
}: UpdateMeasureDialogProps) => {
	const form = useForm({
		mode: "onChange",
		resolver: zodResolver(measureSchema),
		defaultValues: {
			date: new Date(measure.date),
			id: measure.id,
			measures: Object.entries(measure.measures).reduce(
				(acc, [key, value]) => {
					const number = Number.parseFloat(`${value}`);
					if (!Number.isNaN(number)) {
						acc[key as keyof Measure["measures"]] = number;
						return acc;
					}

					acc[key as keyof Measure["measures"]] = value;
					return acc;
				},
				{} as Measure["measures"],
			),
		},
	});
	const { control, handleSubmit } = form;

	const measuresKeys = Object.keys(measureProps);

	const onSubmit = useCallback(async (data: Measure) => {
		await updateMeasure(data);

		toast.success("Mesures enregistrées");
		onClose();
	}, []);

	return (
		<AlertDialogContent className={"h-2/3"}>
			<Form {...form}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={"flex flex-col overflow-hidden"}
				>
					<AlertDialogHeader>
						<AlertDialogTitle>Éditer une mesure</AlertDialogTitle>
					</AlertDialogHeader>
					<div className={"flex flex-col gap-4 overflow-y-auto p-2"}>
						<FormField
							control={control}
							name={"date"}
							render={({ field }) => {
								const value = new Date(field.value);

								return (
									<FormItem className="flex flex-col">
										<FormLabel>Date</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"w-[240px] pl-3 text-left font-normal",
															!field.value && "text-muted-foreground",
														)}
													>
														{field.value ? (
															new Intl.DateTimeFormat("fr-FR").format(
																new Date(value),
															)
														) : (
															<span>Date</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) =>
														date > new Date() || date < new Date("1900-01-01")
													}
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						{measuresKeys.map((key) => (
							<FormField
								key={key}
								control={control}
								render={({ field }) => {
									const { label, unit } = measureProps[key];

									return (
										<FormItem>
											<FormLabel>{label}</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder={`Mesure en ${unit}`}
													inputMode={"decimal"}
													pattern={"[0-9]*[.,]?[0-9]+"}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									);
								}}
								name={`measures.${key}`}
							/>
						))}
					</div>
					<AlertDialogFooter>
						<AlertDialogCancel>Annuler</AlertDialogCancel>
						<Button type={"submit"}>Mettre à jour</Button>
					</AlertDialogFooter>
				</form>
			</Form>
		</AlertDialogContent>
	);
};

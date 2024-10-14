"use client";

import { createMeasure, updateMeasure } from "@/app/actions/measures";
import { measureProps } from "@/components/features/measures/config";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
	measuresSchema,
} from "api/src/routes/api/measures/schema";
import { ArrowLeft, CalendarIcon, X } from "lucide-react";
import { type PropsWithChildren, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { date } from "zod";

export const NewMeasureModal = ({ children }: PropsWithChildren) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [measureId, setMeasureId] = useState<string | undefined>();
	const [measureDate, setMeasureDate] = useState<Date>(new Date());

	const attributes = Object.keys(measureProps);
	const key = attributes[currentStep];

	const { icon, description, label } = measureProps[key];

	const { control, reset } = useForm<Measure["measures"]>({
		resolver: zodResolver(measuresSchema),
		defaultValues: attributes.reduce((acc, key) => ({ ...acc, [key]: "" }), {}),
	});

	const handleNext = () => {
		setCurrentStep((prev) => Math.min(prev + 1, attributes.length - 1));
	};

	const handlePrevious = () => {
		setCurrentStep((prev) => Math.max(prev - 1, 0));
	};

	const resetStep = () => {
		setCurrentStep(0);
		setMeasureId(undefined);
		setMeasureDate(new Date());
		reset();
	};

	const handleSave = async (formData: FormData) => {
		try {
			const isNewMeasure = measureId === undefined;

			const stringValues = Object.fromEntries(formData);
			const numberValues = Object.fromEntries(
				Object.entries(stringValues).map(([key, value]) => [key, +value]),
			);

			const parsedMeasures = measuresSchema.safeParse(numberValues);

			if (!parsedMeasures.success) {
				throw new Error("Mauvais format de mesure");
			}

			if (isNewMeasure) {
				const createdMeasure = await createMeasure({
					measures: parsedMeasures.data,
					date: measureDate.toISOString(),
				});
				setMeasureId(createdMeasure.id);
			} else {
				await updateMeasure({
					id: measureId,
					measures: parsedMeasures.data,
					date: measureDate.toISOString(),
				});
			}
			const isLastStep = currentStep + 1 === attributes.length;
			if (isLastStep) {
				resetStep();
			} else {
				handleNext();
			}
			toast.success("Mesure sauvegardée");
		} catch (e) {
			console.log("error", e);
			toast.error("Une erreur est survenue lors de la sauvegarde");
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<form action={handleSave} className={"flex flex-col gap-4"}>
					<AlertDialogHeader>
						<div className={"flex flex-col gap-2 items-center justify-between"}>
							<div className="flex items-center gap-2 justify-between w-full">
								<Button
									type="button"
									variant="outline"
									size="icon"
									disabled={currentStep === 0}
									title={"Retour"}
									onClick={handlePrevious}
								>
									<ArrowLeft className={"h-4 w-4"} />
								</Button>
								<AlertDialogTitle>
									<label htmlFor={key} className={"flex items-center gap-2"}>
										{label}
										{icon}
									</label>
								</AlertDialogTitle>

								<AlertDialogCancel
									title="Annuler"
									onClick={resetStep}
									className={"w-10 h-10 p-0"}
								>
									<X className={"h-4 w-4"} />
								</AlertDialogCancel>
							</div>
							<AlertDialogDescription>{description}</AlertDialogDescription>
						</div>
					</AlertDialogHeader>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col sm:flex-row gap-2">
							<Controller
								key={key}
								control={control}
								name={key as keyof Measure["measures"]}
								render={({ field: { name, onChange, value } }) => (
									<Input
										id={name}
										name={name}
										placeholder={"Mesure en mm"}
										autoFocus
										inputMode={"decimal"}
										value={value}
										onChange={onChange}
										pattern={"[0-9]*[.,]?[0-9]+"}
									/>
								)}
							/>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										className={cn(
											"justify-start text-left font-normal",
											!date && "text-muted-foreground",
										)}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{new Intl.DateTimeFormat("fr-FR").format(measureDate)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="single"
										selected={measureDate}
										onSelect={(value) => {
											if (value) {
												setMeasureDate(value);
											}
										}}
										toDate={new Date()}
									/>
								</PopoverContent>
							</Popover>
						</div>
					</div>
					<div className="text-sm text-gray-500 text-center">
						Mesure {currentStep + 1} sur {attributes.length}
					</div>
					<div className={"flex flex-col gap-2"}>
						{currentStep + 1 === attributes.length ? (
							<AlertDialogFooter className={"flex flex-col"}>
								<div className={"flex flex-col gap-2 w-full"}>
									<AlertDialogAction className={"w-full"} type={"submit"}>
										Enregister
									</AlertDialogAction>
									<AlertDialogCancel className={"w-full"} onClick={resetStep}>
										Fermer
									</AlertDialogCancel>
								</div>
							</AlertDialogFooter>
						) : (
							<>
								<Button type={"submit"}>Suivant</Button>
								<Button
									variant={"outline"}
									onClick={handleNext}
									type={"button"}
								>
									Ignorer
								</Button>
							</>
						)}
					</div>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
};

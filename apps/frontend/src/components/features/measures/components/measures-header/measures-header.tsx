import { NewMeasureModal } from "@/components/features/measures/components";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const MeasuresHeader = () => {
	return (
		<div>
			<div className="flex items-center w-full justify-between">
				<h1 className="text-lg font-semibold md:text-2xl">Mesures</h1>
				<NewMeasureModal>
					<Button>
						<div className={"flex items-center"}>
							<Plus className="mr-2 h-4 w-4" />
							Ajouter une mesure
						</div>
					</Button>
				</NewMeasureModal>
			</div>
		</div>
	);
};

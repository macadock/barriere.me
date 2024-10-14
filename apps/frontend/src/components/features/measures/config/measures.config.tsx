import { Dumbbell, RulerIcon, Scale } from "lucide-react";
import type { ReactNode } from "react";

export const measureProps: {
	[key: string]: { icon: ReactNode; label: string; description?: string };
} = {
	leftBicep: {
		icon: <Dumbbell className="h-4 w-4" />,
		label: "Tour de bras gauche",
	},
	rightBicep: {
		icon: <Dumbbell className="h-4 w-4" />,
		label: "Tour de bras droit",
	},
	chest: {
		icon: <RulerIcon className="h-4 w-4" />,
		label: "Tour de poitrine",
	},
	waist: {
		icon: <RulerIcon className="h-4 w-4" />,
		label: "Tour de taille",
	},
	belly: {
		icon: <RulerIcon className="h-4 w-4" />,
		label: "Tour de ventre",
	},
	hips: {
		icon: <RulerIcon className="h-4 w-4" />,
		label: "Tour de hanches",
	},
	leftThigh: {
		icon: <RulerIcon className="h-4 w-4" />,
		label: "Tour de cuisse gauche",
	},
	rightThigh: {
		icon: <RulerIcon className="h-4 w-4" />,
		label: "Tour de cuisse droite",
	},
	leftKnee: {
		icon: <RulerIcon className="h-4 w-4" />,
		label: "Tour de genou gauche",
	},
	rightKnee: {
		icon: <RulerIcon className="h-4 w-4" />,
		label: "Tour de genou droit",
	},
	weight: {
		icon: <Scale className="h-4 w-4" />,
		label: "Poids",
	},
};

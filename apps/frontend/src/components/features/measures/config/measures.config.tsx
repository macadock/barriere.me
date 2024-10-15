import { Dumbbell, RulerIcon, Scale } from "lucide-react";
import type { ReactNode } from "react";

export const measureProps: {
	[key: string]: {
		icon: ReactNode;
		label: string;
		description?: string;
		unit: string;
	};
} = {
	leftBicep: {
		icon: <Dumbbell className="h-4 w-4" />,
		label: "Tour de bras gauche",
		unit: "cm",
	},
	rightBicep: {
		icon: <Dumbbell className="h-4 w-4" />,
		label: "Tour de bras droit",
		unit: "cm",
	},
	chest: {
		icon: <RulerIcon className="h-4 w-4" />,
		label: "Tour de poitrine",
		unit: "cm",
	},
	waist: {
		icon: <RulerIcon className="h-4 w-4" />,
		label: "Tour de taille",
		unit: "cm",
	},
	belly: {
		icon: <RulerIcon className="h-4 w-4" />,
		label: "Tour de ventre",
		unit: "cm",
	},
	hips: {
		icon: <RulerIcon className="h-4 w-4" />,
		label: "Tour de hanches",
		unit: "cm",
	},
	leftThigh: {
		icon: <RulerIcon className="h-4 w-4" />,
		label: "Tour de cuisse gauche",
		unit: "cm",
	},
	rightThigh: {
		icon: <RulerIcon className="h-4 w-4" />,
		label: "Tour de cuisse droite",
		unit: "cm",
	},
	leftKnee: {
		icon: <RulerIcon className="h-4 w-4" />,
		label: "Tour de genou gauche",
		unit: "cm",
	},
	rightKnee: {
		icon: <RulerIcon className="h-4 w-4" />,
		label: "Tour de genou droit",
		unit: "cm",
	},
	weight: {
		icon: <Scale className="h-4 w-4" />,
		label: "Poids",
		unit: "kg",
	},
};

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { date } from "zod";

export type CalendarPopoverProps = ComponentProps<typeof Calendar>;

export const CalendarPopover = (props: CalendarPopoverProps) => {
	return (
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
					{props.selected &&
						new Intl.DateTimeFormat("fr-FR").format(props.selected)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar {...props} />
			</PopoverContent>
		</Popover>
	);
};

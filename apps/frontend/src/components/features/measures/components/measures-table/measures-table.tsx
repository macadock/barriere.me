"use client";

import { removeMeasure } from "@/app/actions/measures";
import { DataTable } from "@/components/common/data-table";
import { DataTableColumnHeader } from "@/components/common/data-table/components/data-table-column-header";
import { UpdateMeasureDialog } from "@/components/features/measures/components";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/table-core";
import type { Measure } from "api/src/routes/api/measures/schema";
import {
	ArrowDownRight,
	ArrowUpRight,
	Equal,
	MoreHorizontal,
	Pencil,
	Trash,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

type Action = "edit" | "remove";

export interface MeasuresTableProps {
	measures: Array<Measure>;
}

export const MeasuresTable = ({ measures = [] }: MeasuresTableProps) => {
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<Measure | null>(null);
	const [action, setAction] = useState<Action | undefined>();

	const handleOpenDialog = useCallback((action: Action, measure: Measure) => {
		setAction(action);
		setOpenDialog(true);
		setSelectedItem(measure);
	}, []);

	const memoizedColumns = useMemo(() => {
		const measureKeys = Object.keys(measureProps) as Array<
			keyof Measure["measures"]
		>;
		const columns: Array<ColumnDef<Measure>> = [
			{
				accessorKey: "date",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Date" />
				),
				cell: (row) =>
					new Intl.DateTimeFormat("fr-FR").format(
						new Date(row.getValue() as string),
					),
			},
			...measureKeys.map((key) => {
				return {
					accessorKey: `measures.${key}`,
					header: ({ column }) => (
						<DataTableColumnHeader
							column={column}
							title={`${measureProps[key].label} (${measureProps[key].unit})`}
						/>
					),
					cell: (row) => {
						const index = row.row.index;
						const value = row.getValue() as number;

						const rowsById = row.table.getRowModel().rowsById;
						const previousRow = rowsById[index + 1];
						const previousValue = previousRow?.original.measures[key];

						return (
							<div className={"flex items-center gap-4"}>
								{value}
								<Trend current={value} previous={previousValue} />
							</div>
						);
					},
				} as ColumnDef<Measure>;
			}),
		];

		const actionsColumn: Array<ColumnDef<Measure>> = [
			{
				id: "actions",
				enableSorting: true,
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Actions" />
				),
				cell: ({ row }) => {
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button aria-haspopup="true" size="icon" variant="ghost">
									<MoreHorizontal className="h-4 w-4" />
									<span className="sr-only">Toggle menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuItem
									onClick={() => {
										handleOpenDialog("edit", row.original);
									}}
									className={"gap-2 cursor-pointer"}
								>
									<Pencil className={"size-4"} />
									<p>Éditer</p>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => {
										handleOpenDialog("remove", row.original);
									}}
									className={"gap-2 cursor-pointer"}
								>
									<Trash className={"size-4"} />
									<p>Supprimer</p>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
			},
		];

		return [...columns, ...actionsColumn];
	}, [handleOpenDialog]);

	return (
		<AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
			<DataTable columns={memoizedColumns} data={measures} />
			{
				<>
					{action === "remove" && selectedItem && (
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Supprimer</AlertDialogTitle>
								<AlertDialogDescription>
									Cette action est irréversible, êtes-vous sûr de vouloir
									supprimer cet élément ?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Annuler</AlertDialogCancel>
								<AlertDialogAction
									onClick={async () => {
										await removeMeasure(selectedItem.id);
										setSelectedItem(null);
									}}
								>
									Supprimer
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					)}
					{action === "edit" && selectedItem && (
						<UpdateMeasureDialog
							key={selectedItem.id}
							measure={selectedItem}
							onClose={() => {
								setOpenDialog(false);
							}}
						/>
					)}
				</>
			}
		</AlertDialog>
	);
};

const Trend = ({
	current,
	previous,
}: {
	current: number | undefined;
	previous: number | undefined;
}) => {
	if (current === undefined || previous === undefined) return null;
	if (current > previous) return <ArrowUpRight className="text-red-500" />;
	if (current < previous) return <ArrowDownRight className="text-green-500" />;
	return <Equal className="text-gray-500" />;
};

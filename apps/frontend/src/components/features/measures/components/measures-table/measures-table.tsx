"use client";

import { DataTable } from "@/components/common/data-table";
import { DataTableColumnHeader } from "@/components/common/data-table/components/data-table-column-header";
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
import { useMemo, useState } from "react";

export interface MeasuresTableProps {
	measures: Array<Measure>;
	onClickRemove?: (id: string) => Promise<void> | void;
	onClickEdit?: (id: string) => Promise<void> | void;
}

export const MeasuresTable = ({
	measures = [],
	onClickRemove,
	onClickEdit,
}: MeasuresTableProps) => {
	const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
	const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

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

		const actionsColumn: Array<ColumnDef<Measure>> =
			onClickRemove || onClickEdit
				? [
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
											{onClickEdit && (
												<DropdownMenuItem
													onClick={() => {
														onClickEdit(row.original.id);
													}}
													className={"gap-2 cursor-pointer"}
												>
													<Pencil className={"size-4"} />
													<p>Éditer</p>
												</DropdownMenuItem>
											)}
											{onClickRemove && (
												<DropdownMenuItem
													onClick={() => {
														setSelectedItemId(row.original.id);
														setOpenDeleteDialog(true);
													}}
													className={"gap-2 cursor-pointer"}
												>
													<Trash className={"size-4"} />
													<p>Supprimer</p>
												</DropdownMenuItem>
											)}
										</DropdownMenuContent>
									</DropdownMenu>
								);
							},
						},
					]
				: [];

		return [...columns, ...actionsColumn];
	}, [onClickEdit, onClickRemove]);

	return (
		<AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
			<DataTable columns={memoizedColumns} data={measures} />
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Supprimer</AlertDialogTitle>
					<AlertDialogDescription>
						Cette action est irréversible, êtes-vous sûr de vouloir supprimer
						cet élément ?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Annuler</AlertDialogCancel>
					<AlertDialogAction
						onClick={async () => {
							if (onClickRemove && selectedItemId) {
								await onClickRemove(selectedItemId);
								setSelectedItemId(null);
							}
						}}
					>
						Supprimer
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
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
	console.log("current", current);
	console.log("previous", previous);
	if (current === undefined || previous === undefined) return null;
	if (current > previous) return <ArrowUpRight className="text-red-500" />;
	if (current < previous) return <ArrowDownRight className="text-green-500" />;
	return <Equal className="text-gray-500" />;
};

export const MeasureEmptyScreen = () => {
	return (
		<div
			className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
			x-chunk="dashboard-02-chunk-1"
		>
			<div className="flex flex-col items-center gap-1 text-center">
				<h3 className="text-2xl font-bold tracking-tight">Aucune mesures</h3>
				<p className="text-sm text-muted-foreground">
					Ajouter une mesure pour commencer à mesurer votre progression
				</p>
			</div>
		</div>
	);
};

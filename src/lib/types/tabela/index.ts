export interface Column<T> {
	header: string;
	accessorKey: keyof T;
	cell?: (row: T) => any;
	component?: any;
	props?: (row: T) => Record<string, any>;
	isFilterable: boolean;
	class?: string;
}

// columns.ts
import type { Column } from '$types';
import type { Historico } from '$types';

export const LayoutHistorico: Column<Historico>[] = [
	{
		accessorKey: 'Filial',
		header: 'Filial',
		cell: (row: Historico) => row.Filial,
		isFilterable: true
	},
	{
		accessorKey: 'NF',
		header: 'Nota Fiscal',
		cell: (row: Historico) => row.NF,
		isFilterable: true
	},
	{
		accessorKey: 'Cliente',
		header: 'Cliente',
		cell: (row: Historico) => row.Cliente,
		isFilterable: true
	},
	{
		accessorKey: 'Produto',
		header: 'Produto',
		cell: (row: Historico) => row.Produto,
		isFilterable: true
	},
	{
		accessorKey: 'DataHora',
		header: 'Data/Hora',
		cell: (row: Historico) => row.DataHora,
		isFilterable: true
	},
	{
		accessorKey: 'Responsavel',
		header: 'Responsável',
		cell: (row: Historico) => row.Responsavel,
		isFilterable: true
	},
	{
		accessorKey: 'Placa',
		header: 'Placa',
		cell: (row: Historico) => row.Placa,
		isFilterable: true
	},
	{
		accessorKey: 'Observacao',
		header: 'Observação',
		cell: (row: Historico) => row.Observacao || 'Sem Observação',
		isFilterable: true
	},
	{
		accessorKey: 'DataConf',
		header: 'Data de Confirmação',
		cell: (row: Historico) => row.DataConf,
		isFilterable: true
	},
	{
		accessorKey: 'Saldo',
		header: 'Saldo',
		cell: (row: Historico) => row.Saldo.toString(),
		isFilterable: true
	}
];

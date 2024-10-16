// src/lib/components/portaria/Borracharia/columns.ts
import { UserAvatar } from '$components';
import type { Borracharia, Column } from '$types';
import ActionBorracharia from './ActionBorracharia.svelte'; // Importa o componente Action


export const LayoutBorracharia: Column<Borracharia>[] = [
	{
		accessorKey: 'Vendedor',
		header: 'Vendedor',
		component: UserAvatar,
		props: (row: Borracharia) => ({ username: row.Vendedor }),
		isFilterable: true
	},

	{
		accessorKey: 'Filial',
		header: 'Filial',
		cell: (row: Borracharia) => row.Filial,
		isFilterable: true
	},
	{
		accessorKey: 'NF',
		header: 'Nota Fiscal',
		cell: (row: Borracharia) => row.NF,
		isFilterable: true
	},
	{
		accessorKey: 'Cliente',
		header: 'Cliente',
		cell: (row: Borracharia) => row.Cliente,
		isFilterable: true
	},
	{
		accessorKey: 'Emissao',
		header: 'Emissão',
		cell: (row: Borracharia) => row.Emissao,
		isFilterable: true
	},
	{
		accessorKey: 'actions',
		header: 'Ações',
		component: ActionBorracharia,
		props: (row: Borracharia) => ({
			documentoCompleto: row.NF,
			clienteCompleto: row.Cliente,
			filial: row.Filial
		}),
		isFilterable: false
	}
];

// src/lib/components/portaria/Borracharia/columns.ts
import { ClienteBadge, UserAvatar } from '$components';
import type { Borracharia, Column } from '$types';
import ActionBorracharia from './ActionBorracharia.svelte'; // Importa o componente Action

export const LayoutBorracharia: Column<Borracharia>[] = [
	{
		accessorKey: 'Vendedor',
		header: 'Vendedor',
		component: UserAvatar,
		props: (row: Borracharia) => ({ username: row.Vendedor }),
		isFilterable: true,
		class: 'w-48'
	},

	{
		accessorKey: 'Filial',
		header: 'Filial',
		cell: (row: Borracharia) => row.Filial,
		isFilterable: true,
		class: 'w-48'
	},
	{
		accessorKey: 'NF',
		header: 'Nota Fiscal',
		cell: (row: Borracharia) => row.NF,
		isFilterable: true,
		class: 'w-56 truncate'
	},
	{
		accessorKey: 'Emissao',
		header: 'Emissão',
		cell: (row: Borracharia) => row.Emissao,
		isFilterable: true,
		class: 'w-48'
	},
	{
		accessorKey: 'Cliente',
		header: 'Cliente',
		component: ClienteBadge,
		props: (row: Borracharia) => ({ clienteNome: row.Cliente }),
		isFilterable: true
	},
	{
		accessorKey: 'Produtos',
		header: 'Ações',
		component: ActionBorracharia,
		props: (row: Borracharia) => ({
			documentoCompleto: row.NF,
			clienteCompleto: row.Cliente,
			filial: row.Filial
		}),
		isFilterable: false,
		class: 'w-36'
	}
];

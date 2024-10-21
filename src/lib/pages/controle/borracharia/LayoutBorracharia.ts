// src/lib/pages/controle/borracharia/LayoutBorracharia.ts
import { ClienteBadge, UserAvatar } from '$components';
import type { Borracharia, Column } from '$types';

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
		accessorKey: 'NF',
		header: 'Nota Fiscal',
		cell: (row: Borracharia) => row.NF,
		isFilterable: true,
		class: 'w-56 truncate'
	},

	{
		accessorKey: 'Cliente',
		header: 'Cliente',
		component: ClienteBadge,
		props: (row: Borracharia) => ({ clienteNome: row.Cliente }),
		isFilterable: true,
		class: 'w-64'
	},
	{
		accessorKey: 'Filial',
		header: 'Filial',
		cell: (row: Borracharia) => row.Filial,
		isFilterable: true,
		class: 'w-48'
	},
	{
		accessorKey: 'Emissao',
		header: 'Emissão',
		cell: (row: Borracharia) => row.Emissao,
		isFilterable: true,
		class: 'w-48'
	},

];

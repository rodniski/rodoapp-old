import type { Conferencia, Column } from '$types';
import { PortariaModal } from '.';

export const LayoutPortaria: Column<Conferencia>[] = [
	{
		accessorKey: 'Filial',
		header: 'Filial',
		cell: (row: Conferencia) => row.Filial,
		isFilterable: true,
		class:"w-36"
	},
	{
		accessorKey: 'NF',
		header: 'Nota Fiscal',
		cell: (row: Conferencia) => row.NF,
		isFilterable: true,
		class:"w-36"
	},
	{
		accessorKey: 'Cliente',
		header: 'Cliente',
		cell: (row: Conferencia) => row.Cliente,
		isFilterable: true
	},
	{
		accessorKey: 'Produto',
		header: 'Produto',
		cell: (row: Conferencia) => row.Produto,
		isFilterable: true
	},
	{
		accessorKey: 'DataHora',
		header: 'Data/Hora',
		cell: (row: Conferencia) => row.DataHora,
		isFilterable: true,
		class:"w-36"
	},
	{
		accessorKey: 'Responsavel',
		header: 'Responsável',
		cell: (row: Conferencia) => row.Responsavel,
		isFilterable: true,
		class:"w-48 truncate"
	},
	{
		accessorKey: 'actions',
		header: 'Ações',
		component: PortariaModal, // Usa o componente ActionButton para ações
		props: (row: Conferencia) => ({
			documento: row.NF, // Passa o NF (nota fiscal)
			produto: row.Produto, // Passa o Produto
			saldoConferencia: row.Saldo, // Passa o saldo
			responsavel: row.Responsavel,
			filial: row.Filial, // Adicionado para uso no componente ActionButton
			cliente: row.Cliente // Adicionado para uso no componente ActionButton
		}),
		isFilterable: false,
		class:"w-36"
	}
];

import type { Conferencia, Column } from '$types';
import ActionPortaria from './ActionPortaria.svelte'; // Componente para a ação de conferência

export const LayoutPortaria: Column<Conferencia>[] = [
	{
		accessorKey: 'Filial',
		header: 'Filial',
		cell: (row: Conferencia) => row.Filial,
		isFilterable: true
	},
	{
		accessorKey: 'NF',
		header: 'Nota Fiscal',
		cell: (row: Conferencia) => row.NF,
		isFilterable: true
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
		isFilterable: true
	},
	{
		accessorKey: 'Responsavel',
		header: 'Responsável',
		cell: (row: Conferencia) => row.Responsavel,
		isFilterable: true
	},
	{
		accessorKey: 'actions',
		header: 'Ações',
		component: ActionPortaria, // Usa o componente ActionButton para ações
		props: (row: Conferencia) => ({
			documento: row.NF, // Passa o NF (nota fiscal)
			produto: row.Produto, // Passa o Produto
			saldoConferencia: row.Saldo, // Passa o saldo
			responsavel: row.Responsavel,
			filial: row.Filial, // Adicionado para uso no componente ActionButton
			cliente: row.Cliente // Adicionado para uso no componente ActionButton
		}),
		isFilterable: false // Ações não são filtráveis
	}
];

<script lang="ts">
	import { Table } from '$components'; // Componente de Tabela compartilhado
	import { LayoutHistorico, HistoricoTableRow } from '$pages'; // Layout das colunas específicas

	const endpoint = 'api/pneus/historico'; // Endpoint da API
	const defaultSortBy: string = 'DataHora'; // Coluna padrão para ordenação
	const defaultSortOrder: 'asc' | 'desc' = 'desc'; // Ordem padrão
</script>

<div class="flex h-screen flex-col justify-end pb-14">
	<!-- Cabeçalho com título -->
	<div class="fixed left-1/2 top-8 -translate-x-1/2 transform text-center">
		<h1 class="text-3xl font-bold">Central de Histórico de Envios</h1>
	</div>

	<!-- Área de Tabela -->
	<div class="flex flex-col items-end">
		<div class="h-[70dvh] w-[95dvw] 2xl:h-[80dvh]">
			<Table
				columns={LayoutHistorico}
				{endpoint}
				TableRow={HistoricoTableRow}
				sortBy={defaultSortBy}
				sortOrder={defaultSortOrder}
			/>
		</div>
	</div>
</div>

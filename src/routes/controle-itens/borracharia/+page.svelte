<script lang="ts">
	import { Table, Filtrar } from '$components'; // Componente de Tabela compartilhado
	import { LayoutBorracharia } from '$pages'; // Layout das colunas específicas

	const endpoint = 'api/borracharia'; // Endpoint da API
	const defaultSortBy: string = 'Emissao'; // Coluna padrão para ordenação
	const defaultSortOrder: 'asc' | 'desc' = 'desc'; // Ordem padrão
</script>

<div class="h-full">
	<!-- Cabeçalho com título -->
	<div class="fixed left-1/2 top-8 -translate-x-1/2 transform text-center">
		<h1 class="text-3xl font-bold">Central de Envio de Pneus</h1>
	</div>

	<!-- Área de Tabela -->
	<div class="flex flex-col items-end">
		<div class="h-[70dvh] w-[95dvw] 2xl:h-[80dvh]">
			<div class="flex w-full justify-end pb-5 pr-1">
				<div class="join border border-primary">
					<!-- Componente de Filtros -->
					<Filtrar columns={LayoutBorracharia} />
				</div>
			</div>
			<Table
				columns={LayoutBorracharia}
				{endpoint}
				sortBy={defaultSortBy}
				sortOrder={defaultSortOrder}
			/>
		</div>
	</div>
</div>

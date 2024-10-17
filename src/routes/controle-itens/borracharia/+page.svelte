<script lang="ts">
	import { Table } from '$components'; // Componente de Tabela compartilhado
	import { LayoutBorracharia } from '$pages'; // Layout das colunas específicas

	const endpoint = 'api/borracharia'; // Endpoint da API
	const defaultSortBy: string = 'Emissao'; // Coluna padrão para ordenação
	const defaultSortOrder: 'asc' | 'desc' = 'desc'; // Ordem padrão
</script>

<div class="h-screen flex flex-col justify-end pb-14">
	<!-- Cabeçalho com título -->
	<div class="fixed left-1/2 top-8 -translate-x-1/2 transform text-center">
		<h1 class="text-3xl font-bold">Central de Envio de Pneus</h1>
	</div>

	<!-- Área de Tabela -->
	<div class="">
		<div class="h-[70dvh] w-[95dvw] 2xl:h-[80dvh]">
			<Table
				columns={LayoutBorracharia}
				{endpoint}
				sortBy={defaultSortBy}
				sortOrder={defaultSortOrder}
			/>
		</div>
	</div>
</div>

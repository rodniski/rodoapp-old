<script lang="ts">
	import { filterStore } from '$stores';
	import { tableFetching } from '$api'; // Função de fetch para os dados
	import { onMount } from 'svelte';
	import type { Column } from '$types';
	import SortableHeader from './SortableHeader.svelte';

	export let columns: Column<any>[] = [];
	export let endpoint: string;
	export let sortBy: string = 'Inclusao';
	export let sortOrder: 'asc' | 'desc' = 'desc';
	export let pageSize: number = 10;

	let error: string | null = null;
	let pageData: any[] = [];
	let currentPage: number = 1;
	let hasMore: boolean = true;
	let isLoading = true;

	// Observa a store de filtros
	let filters: Record<string, string> = {};
	$: filters = $filterStore; // Observa e atualiza com os filtros da store

	// Função para carregar os dados da página
	async function loadPage(page: number = 1) {
		isLoading = true;
		error = null; // Resetando o erro antes de tentar carregar os dados
		try {
			// Faz a requisição de dados com filtros, ordenação e paginação
			const result = await tableFetching(endpoint, sortBy, sortOrder, page, pageSize, filters);
			pageData = result.data;
			hasMore = result.hasMore;
		} catch (err) {
			console.error(`Erro ao carregar dados de ${endpoint}:`, err);
			error = 'Erro ao carregar os dados. Tente novamente.';
		} finally {
			isLoading = false;
		}
	}

	// Reatividade: Carrega a página sempre que os filtros mudarem
	$: if (filters) {
		loadPage();
	}

	// Alternar a ordenação das colunas
	function toggleSort(columnKey: keyof any) {
		if (sortBy === columnKey) {
			sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = String(columnKey);
			sortOrder = 'asc';
		}
		loadPage();
	}

	// Navegar para a página anterior
	function prevPage() {
		if (currentPage > 1) {
			currentPage -= 1;
			loadPage(currentPage);
		}
	}

	// Navegar para a próxima página
	function nextPage() {
		if (hasMore) {
			currentPage += 1;
			loadPage(currentPage);
		}
	}

	// Alterar o número de itens por página
	function handlePageSizeChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		pageSize = parseInt(target.value);
		currentPage = 1;
		loadPage(currentPage);
	}

	// Carrega a primeira página ao montar o componente
	onMount(() => {
		loadPage();
	});
</script>

<div class="z-1 flex max-h-full w-full flex-col justify-between overflow-hidden">
	{#if isLoading}
		<p>Carregando dados...</p>
	{:else if error}
		<p class="text-red-500">{error}</p>
		<!-- Exibe a mensagem de erro -->
	{:else}
		<div class="h-full w-full overflow-auto rounded-xl bg-base-300 ">
			<table class="table table-pin-rows table-pin-cols z-0 rounded-xl ">
				<thead class="h-16 rounded-lg shadow-xl">
					<tr class="bg-neutral text-white">
						{#each columns as column}
							{#if column.isFilterable}
								<SortableHeader
									title={column.header}
									columnKey={column.accessorKey}
									isSorted={sortBy === column.accessorKey ? sortOrder : false}
									onClick={() => toggleSort(column.accessorKey)}
								/>
							{:else}
								<td class="text-lg">{column.accessorKey}</td>
							{/if}
						{/each}
					</tr>
				</thead>

				<tbody>
					{#if pageData.length === 0}
						<tr>
							<td colspan={columns.length}>Nenhum dado encontrado</td>
						</tr>
					{:else}
						{#each pageData as row}
							<tr class="hover flex-grow 2xl:text-xl">
								{#each columns as column}
									<td class={`h-auto ${column.class}`}>
										{#if column.component}
											<svelte:component
												this={column.component}
												{...column.props ? column.props(row) : {}}
											/>
										{:else}
											{row[String(column.accessorKey)]}
										{/if}
									</td>
								{/each}
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>

		<!-- Controles de navegação -->
		<div class="my-5 flex justify-between">
			<div>
				<select class="select w-full max-w-xs bg-neutral" on:change={handlePageSizeChange}>
					<option value="5">5</option>
					<option value="10" selected>10</option>
					<option value="15">15</option>
					<option value="30">30</option>
					<option value="50">50</option>
					<option value="100">100</option>
				</select>
			</div>

			<div class="join border border-neutral">
				<button class="btn join-item btn-neutral" on:click={prevPage} disabled={currentPage === 1}
					>«</button
				>
				<button class=" btn join-item btn-neutral">Página {currentPage}</button>
				<button class="btn join-item btn-neutral" on:click={nextPage} disabled={!hasMore}>»</button>
			</div>
		</div>
	{/if}
</div>

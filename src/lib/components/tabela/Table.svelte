<!-- src/lib/components/Table.svelte -->
<script lang="ts">
	import { filterStore } from '$stores';
	import { tableFetching } from '$api';
	import { onMount } from 'svelte';
	import type { Column } from '$types';
	import SortableHeader from './SortableHeader.svelte';
  
	// Remove the direct import of TableRow
	// import { TableRow } from '$pages';
  
	export let columns: Column<any>[] = [];
	export let endpoint: string;
	export let sortBy: string = 'Inclusao';
	export let sortOrder: 'asc' | 'desc' = 'desc';
	export let pageSize: number = 10;
	export let TableRow: any; // Accept TableRow as a prop
  
	let error: string | null = null;
	let pageData: any[] = [];
	let currentPage: number = 1;
	let hasMore: boolean = true;
	let isLoading = true;
  
	let filters: Record<string, string> = {};
	$: filters = $filterStore;
  
	async function loadPage(page: number = 1) {
	  isLoading = true;
	  error = null;
	  try {
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
  
	$: if (filters) {
	  loadPage();
	}
  
	function toggleSort(columnKey: keyof any) {
	  if (sortBy === columnKey) {
		sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
	  } else {
		sortBy = String(columnKey);
		sortOrder = 'asc';
	  }
	  loadPage();
	}
  
	function prevPage() {
	  if (currentPage > 1) {
		currentPage -= 1;
		loadPage(currentPage);
	  }
	}
  
	function nextPage() {
	  if (hasMore) {
		currentPage += 1;
		loadPage(currentPage);
	  }
	}
  
	function handlePageSizeChange(event: Event) {
	  const target = event.target as HTMLSelectElement;
	  pageSize = parseInt(target.value);
	  currentPage = 1;
	  loadPage(currentPage);
	}
  
	onMount(() => {
	  loadPage();
	});
  </script>
  
  <div class="z-1 flex max-h-full w-full flex-col justify-between overflow-hidden">
	{#if isLoading}
	  <p>Carregando dados...</p>
	{:else if error}
	  <p class="text-red-500">{error}</p>
	{:else}
	  <div class="h-full w-full overflow-auto rounded-xl bg-base-300">
		<table class="table table-pin-rows table-pin-cols z-0 rounded-xl">
		  <thead class="h-16 rounded-lg shadow-xl bg-neutral">
			<tr class="bg-neutral text-white">
			  {#each columns as column}
				{#if column.isFilterable}
				  <SortableHeader
					title={column.header}
					columnKey={column.accessorKey}
					isSorted={sortBy === column.accessorKey ? sortOrder : false}
					on:click={() => toggleSort(column.accessorKey)}
				  />
				{:else}
				  <td class="text-lg">{column.header}</td>
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
				<!-- Use svelte:component to render the passed TableRow component -->
				<svelte:component this={TableRow} {row} {columns} />
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
		  <button class="btn join-item btn-neutral" on:click={prevPage} disabled={currentPage === 1}>
			«
		  </button>
		  <button class="btn join-item btn-neutral">Página {currentPage}</button>
		  <button class="btn join-item btn-neutral" on:click={nextPage} disabled={!hasMore}>
			»
		  </button>
		</div>
	  </div>
	{/if}
  </div>
  
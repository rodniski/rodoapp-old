<!-- src/lib/components/TableRow.svelte -->
<script lang="ts">
	import type { Column } from '$types';
	import NFDetails from './NFDetails.svelte';
	import Form from './form.svelte';

	export let row: any;
	export let columns: Column<any>[];

	let isExpanded = false;

	function toggle() {
		isExpanded = !isExpanded;
	}
</script>

<!-- Linha principal da tabela -->
<tr class="hover cursor-pointer" on:click={toggle}>
	{#each columns as column}
		<td class={`h-auto ${column.class}`}>
			{#if column.cell}
				{@html column.cell(row)}
			{:else if column.component}
				<svelte:component this={column.component} {...column.props ? column.props(row) : {}} />
			{:else}
				{row[String(column.accessorKey)]}
			{/if}
		</td>
	{/each}
</tr>

<!-- Linha adicional para o conteúdo expandido -->
{#if isExpanded}
	<tr>
		<td colspan={columns.length} class="p-0">
			<div class="collapse collapse-open">
				<div
					class="collapse-content flex w-full flex-col items-center justify-center bg-neutral p-4"
				>
					<div class="flex h-full w-full items-start justify-evenly px-10">
						<!-- Envolvendo NFDetails em um bloco {#if} para evitar erros -->
						<div class="h-full w-1/2 px-24">
							{#if NFDetails}
								<NFDetails {row} />
							{:else}
								<p class="text-error">Não foi possível carregar os detalhes.</p>
							{/if}
						</div>
						<div class="h-full w-1/2 px-24">
							{#if Form}
								<div class="flex flex-col">
									<Form {row} />
								</div>
							{:else}
								<p class="text-error">Não foi possível carregar os detalhes.</p>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</td>
	</tr>
{/if}

<!-- src/routes/portaria/PortariaTableRow.svelte -->
<script lang="ts">
	import type { Column } from '$types';
	export let row: any;
	export let columns: Column<any>[];
</script>

<!-- Linha principal da tabela -->
<tr>
	{#each columns as column, index}
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

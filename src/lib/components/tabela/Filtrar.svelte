<script lang="ts">
	import { filterStore, setFilter, resetFilters } from '$stores';
	import { IconFilterFilled } from '@tabler/icons-svelte';
	export let columns: { header: string; accessorKey: string; isFilterable: boolean }[] = [];

	// Reatividade automática à store de filtros
	$: $filterStore;

	function handleInputChange(columnKey: string, event: Event) {
		const target = event.target as HTMLInputElement;
		setFilter(columnKey, target.value); // Atualiza diretamente a store de filtros
	}

	function applyFilters() {
		closeDrawer();
	}

	function resetAllFilters() {
		resetFilters(); // Reseta a store de filtros
		closeDrawer();
	}

	function closeDrawer() {
		const drawerInput = document.getElementById('filter-drawer') as HTMLInputElement;
		if (drawerInput) {
			drawerInput.checked = false;
		}
	}
</script>

<!-- Drawer do DaisyUI -->
<div class="drawer drawer-end">
	<input id="filter-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- Botão que abre o drawer -->
		<label
			for="filter-drawer"
			class="btn drawer-button tooltip tooltip-bottom tooltip-info flex items-center justify-center hover:text-primary"
			data-tip="Filtrar dados"
		>
			<lord-icon
				src="https://cdn.lordicon.com/dicvhxpz.json"
				trigger="hover"
				stroke="bold"
				state="hover-look-around"
				colors="primary:#ffffff,secondary:#ffffff"
				style="width:35px;height:35px"
			>
			</lord-icon>
		</label>
	</div>

	<div class="drawer-side z-[9999]">
		<label for="filter-drawer" class="drawer-overlay"></label>
		<ul class="menu min-h-full w-96 bg-base-200 p-4 text-base-content">
			<!-- Inputs de Filtro para cada coluna filtrável -->
			{#each columns as column}
				{#if column.isFilterable}
					<li class="px-5">
						<input
							type="text"
							placeholder={`Filtrar ${column.header}`}
							class="input input-bordered my-2 w-full"
							on:input={(e) => handleInputChange(column.accessorKey, e)}
						/>
					</li>
				{/if}
			{/each}

			<div class="flex gap-2">
				<button class="btn btn-outline m-5 w-fit" on:click={resetFilters}>Reiniciar Filtros</button>
				<button class="btn btn-primary m-5 w-fit" on:click={applyFilters}>Aplicar Filtros</button>
			</div>
		</ul>
	</div>
</div>

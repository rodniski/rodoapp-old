<script lang="ts">
	import { IconChevronsUp, IconChevronsDown, IconSelector } from '@tabler/icons-svelte';
	import { filterStore, setFilter } from '$stores'; // Importa a store de filtros
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';

	export let title: string;
	export let isSorted: 'asc' | 'desc' | false | undefined = false;
	export let columnKey: string | number ; // A chave para identificar a coluna
	export let onClick: () => void; // Função para ordenação

	let IconComponent = IconSelector;
	let searchQuery = ''; // O valor digitado no campo de busca

	// Altera o ícone conforme a ordenação
	$: {
		if (isSorted === 'asc') {
			IconComponent = IconChevronsUp;
		} else if (isSorted === 'desc') {
			IconComponent = IconChevronsDown;
		} else {
			IconComponent = IconSelector;
		}
	}

	// Função para carregar o filtro da store
	function updateSearchQueryFromStore() {
		const filters = get(filterStore);
		searchQuery = filters[columnKey] || '';
	}

	// Inicializa o campo de busca com o valor da store (se existir)
	onMount(updateSearchQueryFromStore);

	// Função para lidar com a tecla "Enter" no input de busca
	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			setFilter(columnKey, searchQuery); // Aplica o filtro apenas ao pressionar "Enter"
			updateSearchQueryFromStore(); // Atualiza o campo de busca após aplicar o filtro
		}
	}
</script>

<!-- Cabeçalho da coluna -->
<th class="relative bg-neutral border-r border-base-100/20">
	<!-- Container flex para alinhar título, ícone de ordenação e input de busca -->
	<div class="flex items-center justify-start space-x-2">
		<input
			type="text"
			bind:value={searchQuery}
			class="input input-sm  w-full text-lg transition-all shadow-lg"
			placeholder={`${title}`}
			on:keyup={handleKeyPress}
		/>

		<!-- Título e ordenação -->
		<button
			on:click={onClick}
			class="flex items-center justify-center text-center text-content hover:text-gray-400 focus:outline-none "
		>
			<IconComponent class="ml-2 h-6 w-6" />
		</button>
	</div>
</th>

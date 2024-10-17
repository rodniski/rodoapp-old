<script lang="ts">
	import { get } from 'svelte/store';
	import { filialStore } from '$stores'; // Importa a store
	import { fetchFiliais } from '$api'; // Importa a função de fetch do módulo de API
	import { onMount } from 'svelte';
	import { IconTruck } from '@tabler/icons-svelte';

	export let clienteNome: string = '';

	// Pega a lista de filiais da store
	let filiais = get(filialStore);

	// Função para verificar se é uma transferência entre filiais (código 000001)
	const isTransferenciaEntreFiliais = (clienteNome: string) => {
		return clienteNome.startsWith('000001');
	};

	// Função para obter o nome da filial correspondente ao código
	async function getFilialNome(cliente: string): Promise<string | null> {
		if (!isTransferenciaEntreFiliais(cliente)) {
			return null;
		}

		// Se a store estiver vazia, realiza o fetch das filiais
		if (filiais.length === 0) {
			try {
				await fetchFiliais(); // Função que realiza o fetch dos dados e atualiza a store
				filiais = get(filialStore); // Atualiza a variável local com os dados da store
			} catch (error) {
				console.error('Erro ao carregar as filiais:', error);
				return null;
			}
		}

		// Extrai o código da filial do cliente (ex: "12" em "000001 - 12 - RODOPARANA...")
		const [, filialCodigo] = cliente.split(' - ');

		if (filialCodigo) {
			// Monta o número da filial (ex: "0112" para "12")
			const numeroFilial = `01${filialCodigo.trim()}`.padEnd(10);

			// Busca na store de filiais o nome correspondente ao código
			const filial = filiais.find((f) => f.numero.trim() === numeroFilial.trim());

			// Retorna o nome da filial se encontrada
			return filial ? filial.filial.trim() : null;
		}

		return null;
	}

	// Armazena o nome da filial
	let filialNome: string | null = null;

	// Atualiza o nome da filial ao montar o componente
	onMount(async () => {
		filialNome = await getFilialNome(clienteNome);
	});
</script>

<!-- Exibe o nome do cliente com ou sem as badges -->
<div class="flex items-center space-x-2">
	{#if !filialNome}
		<span>{clienteNome}</span>
	{:else}
		<!-- Badge com o nome da filial se identificado -->
		{#if filialNome}
			<span class="px-3">{filialNome}</span> 
			<span class="badge badge-neutral text-primary badge-lg"><IconTruck /></span>
		{/if}
	{/if}
</div>

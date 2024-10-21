<script lang="ts">
	import { tableFetching } from '$api';
	import type { Borracharia, ItemNF } from '$types';
	import toast from 'svelte-french-toast';
	import { onMount } from 'svelte';
	import { saldoSelect } from '$stores'; // Importa a store
  
	export let row: Borracharia;
  
	let itensSelecionados: ItemNF[] = [];
	let errorMessage = '';
	let errorMessageFetch = '';
	let isLoading = false;
  
	onMount(() => {
	  loadProdutos();
	});
  
	let loadProdutos = async () => {
	  try {
		if (!row) {
		  throw new Error('Dados da linha não disponíveis.');
		}
  
		// Extrai NFDocumento e NFSerie
		const nfParts = row.NF ? row.NF.split(' - ') : [];
		const NFDocumento = nfParts[0]?.trim() || '';
		const NFSerie = nfParts[1]?.trim() || '';
  
		// Extrai ClienteCodigo e ClienteLoja
		const clienteParts = row.Cliente ? row.Cliente.split(' - ') : [];
		const ClienteCodigo = clienteParts[0]?.trim() || '';
		const ClienteLoja = clienteParts[1]?.trim() || '';
  
		const additionalHeaders = {
		  'X-Filial': row.Filial?.trim() || '',
		  'X-Documento': NFDocumento,
		  'X-Serie': NFSerie,
		  'X-Cliente': ClienteCodigo,
		  'X-Loja': ClienteLoja
		};
  
		const endpoint = 'api/pneus/borracharia/listanfs';
  
		const { data } = await tableFetching<ItemNF>(
		  endpoint,
		  '',
		  '',
		  1,
		  10,
		  {},
		  additionalHeaders
		);
  
		// Inicializa a propriedade 'quantity' para cada item
		itensSelecionados = data.map((item: any) => ({
		  D2_ITEM: item.D2_ITEM,
		  D2_COD: item.D2_COD,
		  B1_DESC: item.B1_DESC,
		  SALDO: Number(item.SALDO),
		  quantity: 0 // Adiciona a propriedade 'quantity'
		}));
	  } catch (error) {
		errorMessage = `Erro ao carregar os produtos: ${error.message}`;
		errorMessageFetch = errorMessage; // Para exibir no template
		console.error(error);
		toast.error(errorMessage);
	  }
	};
  
	// Função para lidar com a entrada de quantidade
	function handleInput(event: Event, item: ItemNF) {
	  const input = event.target as HTMLInputElement;
	  const value = Number(input.value);
  
	  // Verifica se o valor é válido e não excede o saldo disponível
	  if (value >= 0 && value <= item.SALDO) {
		item.quantity = value;
	  } else {
		// Se o valor for inválido, redefine para zero ou para o máximo permitido
		item.quantity = value < 0 ? 0 : item.SALDO;
		input.value = item.quantity.toString();
	  }
  
	  // Reatribui itensSelecionados para desencadear a reatividade
	  itensSelecionados = [...itensSelecionados];
	}
  
	// Atualiza saldoSelect sempre que itensSelecionados mudar
	$: saldoSelect.set(itensSelecionados.filter(item => item.quantity > 0));
  </script>
  
  <!-- Exibindo a lista de itens -->
  <div class="h-full p-4">
	<h4 class="w-full pb-2 text-center text-xl font-bold text-primary">
	  Selecione os Pneus a serem Entregues:
	</h4>
	{#if itensSelecionados.length > 0}
	  <div class="h-full space-y-4">
		<!-- Contêiner que se torna rolável quando há mais de 2 itens -->
		<div
		  class="list-container h-full"
		  class:overflow-y-auto={itensSelecionados.length > 2}
		  class:max-h-64={itensSelecionados.length > 2}
		>
		  <ul class="space-y-4">
			{#each itensSelecionados as item (item.D2_ITEM)}
			  <li class="card bg-base-200 shadow-md">
				<div class="card-body p-4">
				  <div class="flex items-center justify-between">
					<div class="p-5 text-center">
					  <h2 class="card-title text-base text-base-content">{item.B1_DESC}</h2>
					  <div class="flex w-full justify-between">
						<p class="text-sm text-base-content">
						  <span class="font-bold text-primary">Código: </span>{item.D2_COD}
						</p>
						<p class="text-sm text-base-content">
						  <span class="font-bold text-primary">Saldo: </span>{item.SALDO}
						</p>
					  </div>
					</div>
					<div class="form-control w-24">
					  <input
						type="number"
						min="0"
						max={item.SALDO}
						bind:value={item.quantity}
						on:input={(e) => handleInput(e, item)}
						class="input-neutral input input-bordered bg-base-300 text-center"
						placeholder="0"
						aria-label={`Quantidade do item ${item.D2_ITEM}`}
					  />
					</div>
				  </div>
				</div>
			  </li>
			{/each}
		  </ul>
		</div>
	  </div>
	{:else}
	  <p class="text-neutral-content">Nenhum item encontrado.</p>
	{/if}
  
	{#if errorMessageFetch}
	  <p class="mt-4 text-error">{errorMessageFetch}</p>
	{/if}
  </div>
  
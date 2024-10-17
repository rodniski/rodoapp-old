<script lang="ts">
	import { fly } from 'svelte/transition';
	import { circOut } from 'svelte/easing';
	import {
		IconTruckReturn,
		IconUserDollar,
		IconUser,
		IconCar
	} from '@tabler/icons-svelte';
	import ItensBorracharia from './ItensBorracharia.svelte'; // Componente de Itens
	import { handleConfirm, separarDocumentoESerie, separarClienteLoja } from '$components'; // Funções auxiliares

	export let documentoCompleto: string;
	export let clienteCompleto: string;
	export let filial: string;
	export let observacao: string | null = '';
	export let usuario: string = 'matheus';

	let responsible = '';
	let plate = '';
	let retiradaPor = 'C'; // Valor padrão para o radio (Cliente)
	let isLoading = false;
	let drawerVisible = false;

	let itensSelecionados = []; // Armazena os itens selecionados

	// Função para abrir o drawer
	function openDrawer() {
		drawerVisible = true;
	}

	// Função para fechar o drawer
	function closeDrawer(event: Event) {
		const target = event.target as HTMLElement;
		if (!target.closest('.drawer-content')) {
			drawerVisible = false;
		}
	}

	// Função para confirmar a ação
	async function onConfirm() {
		// Utilizando a função handleConfirm do arquivo separado
		await handleConfirm({
			documentoCompleto,
			clienteCompleto,
			filial,
			itensSelecionados,
			responsible,
			plate,
			observacao,
			usuario,
			retiradaPor,
			setDrawerVisible: (visible) => (drawerVisible = visible),
			setIsLoading: (loading) => (isLoading = loading)
		});
	}
</script>

<!-- Botão que abre o Drawer -->
<button class="btn btn-neutral" on:click={openDrawer}>
	<lord-icon
		src="https://cdn.lordicon.com/sbnjyzil.json"
		trigger="hover"
		stroke="bold"
		state="hover-swirl"
		colors="primary:#ffffff,secondary:#ffffff"
		style="width:32px;height:32px"
	>
	</lord-icon>
</button>

<!-- Drawer -->
{#if drawerVisible}
	<!-- Overlay que fecha o Drawer ao clicar fora -->
	<div class="fixed inset-0 z-40 bg-black bg-opacity-50" on:click={closeDrawer}></div>

	<!-- Conteúdo do Drawer com animação fly -->
	<div class="drawer drawer-content" transition:fly={{ x: 400, easing: circOut }}>
		<div class="h-screen w-full bg-base-100 p-4">
			<h2 class="mb-4 text-3xl font-bold text-primary text-center">Seleção de Produtos</h2>

			<!-- Componente ItensBorracharia que exibe a lista de produtos -->
			<ItensBorracharia {documentoCompleto} {clienteCompleto} {filial} bind:itensSelecionados />

			<!-- Radio Buttons para Cliente e Rodoparaná -->
			<div class="mb-4 flex flex-col space-y-2">
				<label class="flex cursor-pointer items-center">
					<IconUserDollar class="mr-2 text-primary" />
					<input
						type="radio"
						name="retiradaPor"
						value="C"
						bind:group={retiradaPor}
						class="radio-base-content radio ml-2"
					/>
					<span class="label-text ml-2 text-base text-primary">Cliente</span>
				</label>

				<label class="flex cursor-pointer items-center">
					<IconTruckReturn class="mr-2 text-primary" />
					<input
						type="radio"
						name="retiradaPor"
						value="R"
						bind:group={retiradaPor}
						class="radio-base-content radio ml-2"
					/>
					<span class="label-text ml-2 text-base text-primary">Rodoparaná</span>
				</label>
			</div>

			<!-- Inputs para o nome do responsável e a placa -->
			<div class="mb-4 space-y-2">
				<div class="relative">
					<IconUser class="absolute left-3 top-3 text-primary" />
					<input
						type="text"
						placeholder="Nome do responsável"
						bind:value={responsible}
						class="input input-bordered w-full pl-10"
					/>
				</div>
				<div class="relative">
					<IconCar class="absolute left-3 top-3 text-primary" />
					<input
						type="text"
						placeholder="Placa do carro"
						bind:value={plate}
						class="input input-bordered w-full pl-10"
					/>
				</div>
			</div>

			<!-- Campo de Observações -->
			<div class="mb-4">
				<textarea
					class="textarea textarea-bordered w-full"
					placeholder="Observações"
					bind:value={observacao}
				></textarea>
			</div>

			<!-- Botões de Ação -->
			<div class="mt-6 flex justify-between">
				<button class="btn btn-primary" on:click={onConfirm}> Confirmar </button>
				<button class="btn btn-outline" on:click={() => (drawerVisible = false)}>Cancelar</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.drawer {
		position: fixed;
		top: 0;
		right: 0;
		height: 100vh;
		width: 400px;
		display: flex;
		justify-content: space-between;
		z-index: 50;
	}
</style>

<!-- SeuComponente.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { IconClipboard, IconTagsFilled, IconUser } from '@tabler/icons-svelte';
	import ButtonConferir from './buttonConferir.svelte'; // Importe o componente ButtonConferir
	import { tableFetching } from '$api'; // Importe o tableFetching

	export let documento: string;
	export let produto: string;
	export let saldoConferencia: number;
	export let responsavel: string;
	export let filial: string;
	export let cliente: string;

	let saldoMaximo: number | null = null;
	let seqNumero: string | null = null; // Variável para armazenar o Seq
	let isLoading = true;
	let errorMessageFetch = '';
	let isCheckboxChecked = false; // Estado do checkbox

	let showModal = false; // Controla a visibilidade do modal

	// Função para buscar saldo máximo utilizando o tableFetching
	async function fetchSaldoMaximo() {
		console.log('Iniciando fetchSaldoMaximo');

		isLoading = true;
		errorMessageFetch = '';

		const endpoint = 'api/portaria';
		const sortBy = '';
		const sortOrder = '';
		const page = 1;
		const pageSize = 100; // Ajuste conforme necessário
		const filters = {
			Filial: filial.trim(),
			NF: documento.trim(),
			Produto: produto.trim()
		};

		try {
			const result = await tableFetching<any>(endpoint, sortBy, sortOrder, page, pageSize, filters);

			const data = result.data;
			console.log('Dados recebidos da API:', data);

			const itemCorrespondente = data.find(
				(item: any) =>
					item.NF?.trim() === documento.trim() && item.Produto?.trim() === produto.trim()
			);

			if (itemCorrespondente) {
				saldoMaximo = Number(itemCorrespondente.Saldo);
				seqNumero = itemCorrespondente.Seq?.trim() || null; // Armazenar o Seq
				console.log('Seq encontrado:', seqNumero);
			} else {
				saldoMaximo = null;
			}
		} catch (error: any) {
			console.error('Erro ao carregar saldo máximo:', error);
			errorMessageFetch = `Erro ao carregar saldo máximo: ${error.message}`;
			saldoMaximo = null;
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		fetchSaldoMaximo();
	});

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}
</script>

<!-- Botão para abrir o modal -->
<button class="btn btn-primary" on:click={openModal}>Conferir</button>

<!-- Modal -->
{#if showModal}
	<div class="modal modal-open">
		<div class="modal-box">
			<!-- Conteúdo do Modal -->
			<h2 class="mb-6 text-2xl font-bold text-primary">Conferência de Produto</h2>

			<!-- Informações do Documento -->
			<p class="mb-4">
				<span class="inline-flex items-center">
					<IconClipboard class="mr-2 text-primary" />
					<strong class="text-lg text-primary">Documento:</strong>
				</span>
				<br />
				<span class="text-lg text-base-content">{documento}</span>
			</p>

			<!-- Informações do Produto -->
			<p class="mb-4">
				<span class="inline-flex items-center">
					<IconTagsFilled class="mr-2 text-primary" />
					<strong class="text-lg text-primary">Produto:</strong>
				</span>
				<br />
				<span class="text-lg text-base-content">{produto}</span>
			</p>

			<!-- Retirado por -->
			<p class="mb-4">
				<span class="inline-flex items-center">
					<IconUser class="mr-2 text-primary" />
					<strong class="text-lg text-primary">Retirado por:</strong>
				</span>
				<br />
				<span class="text-lg text-base-content">{responsavel}</span>
			</p>

			<!-- Comparação entre saldo original e saldo conferido -->
			<div class="mb-6 rounded-lg border-l-4 border-primary bg-base-300 p-4 shadow-md">
				<div class="mb-4 flex items-center justify-between">
					<div>
						<span class="text-lg font-semibold text-primary">Quantidade na Nota Fiscal</span>
						<p class="text-sm text-warning">Quantidade registrada</p>
					</div>

					<!-- Mostrando o saldo máximo -->
					<span class="text-2xl font-bold text-base-content">
						{#if saldoMaximo !== null}
							{saldoMaximo}
						{:else}
							{isLoading ? 'Buscando saldo...' : 'Saldo não encontrado'}
						{/if}
					</span>
				</div>

				<hr class="my-2" />
				<div class="flex items-center justify-between">
					<div>
						<span class="text-lg font-semibold text-primary">Quantidade Apanhada</span>
						<p class="text-sm text-warning">Quantidade real</p>
					</div>
					<span class="text-2xl font-bold text-base-content">{saldoConferencia}</span>
				</div>
			</div>

			<!-- Checkbox de confirmação -->
			<div class="form-control mb-8">
				<label class="flex cursor-pointer items-center space-x-4">
					<input
						type="checkbox"
						class="checkbox-primary checkbox"
						bind:checked={isCheckboxChecked}
					/>
					<span class="label-text text-base text-warning">Declaro que confirmo o número de pneus enviados.</span>
				</label>
			</div>
			<div class="modal-action justify-between">
				<button class="btn" on:click={closeModal}>Fechar</button>
				<ButtonConferir {seqNumero} disabled={!isCheckboxChecked} />
			</div>
		</div>
	</div>
{/if}

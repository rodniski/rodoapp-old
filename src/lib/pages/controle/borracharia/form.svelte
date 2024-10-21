<!-- src/lib/components/Form.svelte -->
<script lang="ts">
	import { IconUserDollar, IconTruckReturn, IconUser, IconCar } from '@tabler/icons-svelte';
	import { saldoSelect } from '$stores';
	import { POSTBorracharia } from '$api';
	import toast from 'svelte-french-toast';
	import type { Borracharia } from '$types';
	import IMask from 'imask';
	import { authStore } from '$stores';
	import { get } from 'svelte/store';

	let retiradaPor = 'C';
	let responsible = '';
	let plate = '';
	let observacao = '';
	let isLoading = false;
	let drawerVisible = true;
	let selectedItems = [];

	export let row: Borracharia;

	// Bloco reativo para atualizar selectedItems sempre que saldoSelect mudar
	$: selectedItems = $saldoSelect;
	$: console.log('selectedItems:', JSON.stringify(selectedItems, null, 2));

	// Extrair NFDocumento, NFSerie, ClienteCodigo e ClienteLoja
	const nfParts = row.NF ? row.NF.split(' - ') : [];
	const NFDocumento = nfParts[0]?.trim() || '';
	const NFSerie = nfParts[1]?.trim() || '';

	const clienteParts = row.Cliente ? row.Cliente.split(' - ') : [];
	const ClienteCodigo = clienteParts[0]?.trim() || '';
	const ClienteLoja = clienteParts[1]?.trim() || '';

	let plateInput: HTMLInputElement;

	function applyMask(node: HTMLInputElement) {
		const maskOptions = {
			mask: [
				// Formato antigo: ABC-1234
				{
					mask: 'aaa-0000',
					blocks: {
						a: {
							mask: /[A-Za-z]/,
							transform: (char) => char.toUpperCase()
						},
						0: {
							mask: /\d/
						}
					}
				},
				// Formato novo: ABC1D23
				{
					mask: 'aaa0a00',
					blocks: {
						a: {
							mask: /[A-Za-z]/,
							transform: (char) => char.toUpperCase()
						},
						0: {
							mask: /\d/
						}
					}
				}
			],
			dispatch: function (appended, dynamicMasked) {
				const value = (dynamicMasked.value + appended).toUpperCase().replace(/[^A-Z0-9]/g, '');

				// Decide qual máscara usar com base na entrada atual
				if (/^[A-Z]{0,3}$/.test(value) || /^[A-Z]{3}-\d{0,4}$/.test(value)) {
					return dynamicMasked.compiledMasks[0]; // Formato antigo
				} else {
					return dynamicMasked.compiledMasks[1]; // Formato novo
				}
			}
		};

		const mask = IMask(node, maskOptions);

		return {
			destroy() {
				mask.destroy();
			}
		};
	}

	async function handleConfirm() {
		if (selectedItems.length === 0) {
			toast.error('Por favor, selecione pelo menos um item.');
			return;
		}

		// Verificar se a placa é válida
		const plateRegex = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$|^[A-Z]{3}-[0-9]{4}$/i;
		if (!plateRegex.test(plate)) {
			toast.error('Por favor, insira uma placa de carro válida.');
			return;
		}

		// Obter o estado de autenticação
		const { isAuthenticated } = get(authStore);
		if (!isAuthenticated) {
			toast.error('Você precisa estar logado para realizar esta ação.');
			return;
		}

		const formData = {
			retiradaPor,
			responsavel: responsible,
			placa: plate.toUpperCase(),
			observacao: observacao,
			itens: selectedItems,
			filial: row.Filial?.trim() || '',
			documento: NFDocumento,
			serie: NFSerie,
			cliente: ClienteCodigo,
			loja: ClienteLoja
		};

		isLoading = true;

		try {
			await toast.promise(POSTBorracharia(formData), {
				loading: 'Enviando dados...',
				success: 'Dados enviados com sucesso!',
				error: 'Erro ao enviar os dados. Por favor, tente novamente.'
			});

			// Limpar o formulário e a store
			responsible = '';
			plate = '';
			observacao = '';
			saldoSelect.set([]);
			drawerVisible = false;
		} catch (error) {
			console.error('Erro ao enviar os dados:', error);
			// O toast.promise já exibe a mensagem de erro
		} finally {
			isLoading = false;
		}
	}
</script>

<h4 class="w-full pb-2 text-center text-xl font-bold text-primary">
	Preencha os dados do Retirante
</h4>
{#if drawerVisible}
	<fieldset class="mb-4 flex justify-evenly">
		<legend class="sr-only">Retirada Por</legend>

		<!-- Opção Cliente -->
		<label class="mr-4 flex cursor-pointer items-center">
			<input
				type="radio"
				name="retiradaPor"
				value="C"
				bind:group={retiradaPor}
				class="radio-base-content radio mr-2"
			/>
			<IconUserDollar class="text-primary" />
			<span class="label-text ml-2 text-base">Cliente</span>
		</label>

		<!-- Opção Rodoparaná -->
		<label class="flex cursor-pointer items-center">
			<input
				type="radio"
				name="retiradaPor"
				value="R"
				bind:group={retiradaPor}
				class="radio-base-content radio mr-2"
			/>
			<IconTruckReturn class="text-primary" />
			<span class="label-text ml-2 text-base">Rodoparaná</span>
		</label>
	</fieldset>

	<div class="flex w-full flex-col gap-2">
		<div class="flex w-full gap-2">
			<div class="w-full space-y-2">
				<div class="relative">
					<IconUser class="absolute left-3 top-3 text-primary" />
					<input
						type="text"
						placeholder="Nome do responsável"
						bind:value={responsible}
						class="input input-bordered w-full pl-10"
					/>
				</div>
			</div>
			<div class="relative w-full">
				<IconCar class="absolute left-3 top-3 text-primary" />
				<input
					type="text"
					placeholder="Placa do carro"
					bind:value={plate}
					class="input input-bordered w-full pl-10"
					use:applyMask
					bind:this={plateInput}
				/>
			</div>
		</div>
		<div class="flex w-full flex-col gap-3">
			<div class="mb-4">
				<textarea
					class="textarea textarea-bordered w-full"
					placeholder="Observações"
					bind:value={observacao}
				></textarea>
			</div>
		</div>
	</div>

	<!-- Botão Confirmar -->
	<div>
		<button class="btn btn-primary w-full" on:click={handleConfirm} disabled={isLoading}>
			{#if isLoading}
				Enviando...
			{:else}
				Confirmar
			{/if}
		</button>
	</div>
{/if}

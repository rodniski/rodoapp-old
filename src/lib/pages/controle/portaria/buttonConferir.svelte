<!-- src/lib/components/ButtonConferir.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { authStore } from '$stores';
	import { get } from 'svelte/store';

	export let seqNumero: string | null;
	export let disabled: boolean = false;

	const dispatch = createEventDispatcher();

	// Acessa diretamente o username da authStore usando get
	let { username } = get(authStore);

	async function handleConfirm() {
		if (!seqNumero) {
			console.error('SeqNúmero não encontrado.');
			dispatch('error', { message: 'SeqNúmero não encontrado.' });
			return;
		}

		const body = {
			numseq: seqNumero,
			userconf: username
		};

		try {
			const response = await fetch('http://protheus-vm:9010/rest/MovPortaria/ConferenciaSaida', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Erro ao confirmar conferência: ${response.status} ${errorText}`);
			}

			const result = await response.json();
			console.log('Conferência confirmada com sucesso!', result);
			dispatch('success', { message: 'Conferência confirmada com sucesso!' });
		} catch (error: any) {
			console.error('Erro ao confirmar conferência:', error);
			dispatch('error', { message: error.message });
		}
	}
</script>

<button class="btn btn-success" on:click={handleConfirm} {disabled}> Conferir </button>

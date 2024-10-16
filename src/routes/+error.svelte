<script lang="ts">
	import { goto } from '$app/navigation';
	import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';

	export let error: Error;
	export let status: number;

	// Redireciona o usuário para a página inicial após 5 segundos
	if (status === 404) {
		setTimeout(() => {
			goto('/');
		}, 5000);
	}
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center bg-slate-900 text-white">
	<p class="mt-4 text-xl">Página não encontrada</p>
	<DotLottieSvelte src="$assets/404.json" loop autoplay />
</div>

<script lang="ts">
	import { goto } from '$app/navigation';

	export let error: Error;
	export let status: number;

	// Redireciona o usuário para a página inicial após 5 segundos para o erro 404
	if (status === 404) {
		setTimeout(() => {
			goto('/');
		}, 5000);
	}
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	<div>
		<h1 class="text-7xl font-extrabold">Oops!</h1>
		<p class="mt-4 text-2xl opacity-60">Não encontramos a página que está procurando...</p>
	</div>

	<lottie-player
		src="https://lottie.host/a81de94e-0219-4a37-9962-d1a58748d25a/pyqjHxqGv8.json"
		background="transparent"
		speed="1"
		style="width: 700px; height: 700px"
		direction="1"
		mode="normal"
		loop
		autoplay
	></lottie-player>

	<a href="/" class="btn btn-primary">Voltar ao início</a>
</div>

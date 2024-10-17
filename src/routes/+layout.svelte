<script lang="ts">
	import '../app.css';
	import { Nav, ThemeChanger } from '$components';
	import { page } from '$app/stores'; // Para acessar a URL atual
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-french-toast';
	import { getCookie } from '$hooks';

	// Função auxiliar para obter o valor de um cookie


	// Verificar o token e redirecionar para login se necessário
	onMount(() => {
		const token = getCookie('token'); // Obtém o token do cookie

		// Se não existir token ou o usuário estiver na página de login, redireciona para login
		if (!token && $page.url.pathname !== '/') {
			goto('/login');
		}
	});
</script>

<html lang="pt-br" class="h-screen w-screen">
	<header class="z-10">
		<!-- Exibe a navegação se a rota não for "/" (login) nem "/intranet" -->
		{#if $page.url.pathname !== '/'}
			<Nav />
			<ThemeChanger />
		{/if}
	</header>

	<body class="flex max-h-screen min-h-screen w-screen items-center justify-center">
		<Toaster />
		<slot />
	</body>
</html>

<script lang="ts">
	import '../app.css';
	import { Nav, ThemeChanger } from '$components';
	import { page } from '$app/stores'; // Para acessar a URL atual
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-french-toast';
	let token;

	// Função para verificar e redirecionar para login se o token não existir
	onMount(() => {
		token = sessionStorage.getItem('token'); // Obtém o token do sessionStorage

		if (!token && $page.url.pathname !== '/') {
			goto('/login');
		}
	});
</script>

<html lang="pt-br" class="h-screen w-screen">
	<header class="z-10">
		<!-- Exibe a navegação se a rota não for "/" (login) nem "/intranet" -->
		{#if $page.url.pathname !== '/login'}
			<Nav />
		{/if}
		<ThemeChanger />
	</header>

	<body class="flex max-h-screen min-h-screen w-screen items-center justify-center">
		<Toaster />
		<slot />
	</body>
</html>

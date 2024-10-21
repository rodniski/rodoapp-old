<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import { Nav, ThemeChanger } from '$components';
	import { Toaster } from 'svelte-french-toast';
	import { authStore } from '$stores';
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let isAuthenticated = false;

	// Inscreva-se no authStore para obter o estado de autenticação
	const unsubscribe = authStore.subscribe((auth) => {
		isAuthenticated = auth.isAuthenticated;
	});

	// Redireciona o usuário para a página de login se não estiver autenticado
	onMount(() => {
		const publicPaths = ['/', '/login', '/intranet'];
		const currentPath = $page.url.pathname;

		if (!isAuthenticated && !publicPaths.includes(currentPath)) {
			goto('/');
		}
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<html lang="pt-br" class="h-screen w-screen">
	<header class="z-10">
		<!-- Exibe a navegação se o usuário estiver autenticado -->
		{#if isAuthenticated}
			<Nav />
			<ThemeChanger />
		{/if}
	</header>

	<body class="flex max-h-screen min-h-screen w-screen items-center justify-center">
		<Toaster />
		<slot />
	</body>
</html>

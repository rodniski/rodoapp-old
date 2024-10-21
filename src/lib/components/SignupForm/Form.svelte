<script lang="ts">
	import { cn } from '$utils';
	import Input from './Input.svelte';
	import Label from './Label.svelte';
	import { goto } from '$app/navigation';
	import { IconProgressHelp, IconCloudComputing } from '@tabler/icons-svelte';
	import toast from 'svelte-french-toast';
	import { authStore } from '$stores'; // Importe o authStore
	import { get } from 'svelte/store';

	let username = '';
	let password = '';
	let error = '';

	// Função de login
	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		error = '';

		if (!username || !password) {
			toast.error('Por favor, preencha todos os campos.', {
				className: 'bg-warning text-black'
			});
			return;
		}

		try {
			// Usando o `toast.promise` para lidar com o login
			await toast.promise(loginToProtheus(username, password), {
				loading: 'Realizando login...',
				success: 'Login bem-sucedido!',
				error: 'Erro ao fazer o login. Verifique suas credenciais.'
			});

			// Redireciona o usuário para a página inicial
			goto('/app');
		} catch (err) {
			console.error('Erro ao fazer login:', err);
			error = err instanceof Error ? err.message : 'Ocorreu um erro inesperado.';
		}
	};

	// Função que realiza a requisição de login
	async function loginToProtheus(username: string, password: string) {
		const myHeaders = new Headers();
		myHeaders.append('grant_type', 'password');
		myHeaders.append('username', username);
		myHeaders.append('password', password);

		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			redirect: 'follow' as const
		};

		const res = await fetch('http://protheus-app:8400/rest/api/oauth2/v1/token', requestOptions);

		if (!res.ok) {
			const result = await res.text();
			console.error('Erro na resposta do Protheus:', result);
			throw new Error(result || 'Falha no login');
		}

		const data = await res.json();
		console.log('Resposta do Protheus:', data);

		// Atualiza o authStore com os dados de autenticação
		authStore.set({
			isAuthenticated: true,
			token: data.access_token,
			username: username
		});
	}
</script>

<!-- Estrutura HTML com Formulário -->
<div
	class="shadow-3xl z-50 mx-auto w-full max-w-md rounded-none border border-gray-300 bg-white p-4 md:rounded-2xl md:p-8 dark:border-gray-800 dark:bg-black"
>
	<h2 class="text-xl font-bold text-neutral-800 dark:text-neutral-200">Bem vindo ao RodoApp 2.0</h2>
	<p class="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
		Acesse utilizando seu login do Protheus e veja as novidades do novo sistema Rodoparaná!
	</p>

	<!-- Formulário de login -->
	<form class="my-8" on:submit={handleSubmit}>
		<!-- Campo de usuário -->
		<div class={cn('mb-4 flex w-full flex-col space-y-2')}>
			<Label htmlFor="username">Usuário do Protheus</Label>
			<Input bind:value={username} placeholder="Usuário" />
		</div>

		<!-- Campo de senha -->
		<div class={cn('mb-4 flex w-full flex-col space-y-2')}>
			<Label htmlFor="password">Senha</Label>
			<Input bind:value={password} type="password" placeholder="******" />
		</div>

		<!-- Botão de login -->
		<button
			class="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
			type="submit"
		>
			Fazer o Login
			<span
				class="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100"
			/>
			<span
				class="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100"
			/>
		</button>

		<!-- Separador -->
		<div
			class="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700"
		></div>

		<!-- Links adicionais -->
		<div class="flex gap-3">
			<a
				class="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
				href="http://hesk.rodoparana.com.br"
				target="_blank"
				rel="noopener noreferrer"
			>
				<IconProgressHelp class="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
				<span class="text-sm text-neutral-700 dark:text-neutral-300">Central de Ajuda</span>
			</a>

			<a
				class="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
				href="https://sites.google.com/site/baserodoparana/home"
				target="_blank"
				rel="noopener noreferrer"
			>
				<IconCloudComputing class="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
				<span class="text-sm text-neutral-700 dark:text-neutral-300">Intranet</span>
			</a>
		</div>
	</form>
</div>

<script lang="ts">
	import { cn } from '$utils';
	import Input from './Input.svelte';
	import Label from './Label.svelte';
	import { goto } from '$app/navigation';
	import { IconProgressHelp, IconCloudComputing } from '@tabler/icons-svelte';
	import { loginToProtheus } from '$api'; // Faz a requisição diretamente ao Protheus
	import toast from 'svelte-french-toast';

	let username = '';
	let password = '';
	let error = '';

	// Função de login
	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault(); // Previne o comportamento padrão do formulário
		error = ''; // Reseta a mensagem de erro

		// Usando o `toast.promise` para lidar com o login
		toast
			.promise(
				loginToProtheus(username, password), // Passando a função de login como a Promise
				{
					loading: 'Realizando login...', // Mensagem enquanto a Promise está pendente
					success: 'Login bem-sucedido!', // Mensagem quando a Promise é resolvida
					error: 'Erro ao fazer o login. Senha Incorreta' // Mensagem quando a Promise é rejeitada
				}
			)
			.then((data) => {
				// Salva o token no sessionStorage
				sessionStorage.setItem('token', data.access_token);
				sessionStorage.setItem('username', username);

				// Redireciona o usuário para a página inicial
				goto('/');
			})
			.catch((err) => {
				// Captura o erro e exibe no console
				console.error('Erro ao fazer login:', err);

				// Exibe a mensagem de erro no toast
				error = err instanceof Error ? err.message : 'Ocorreu um erro inesperado.';
			});
	};
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
			<button
				class="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
				type="button"
			>
				<IconProgressHelp class="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
				<a href="hesk.rodoparana.com.br" class="text-sm text-neutral-700 dark:text-neutral-300"
					>Central de Ajuda</a
				>
			</button>

			<button
				class="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
				type="button"
			>
				<IconCloudComputing class="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
				<a href="#" class="text-sm text-neutral-700 dark:text-neutral-300">Intranet</a>
			</button>
		</div>
	</form>
</div>

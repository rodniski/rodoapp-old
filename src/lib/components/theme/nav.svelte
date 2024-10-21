<script lang="ts">
	import Logo from './Logo.svelte';
	import { goto } from '$app/navigation';
	import { menuItems, authStore } from '$stores';

	let username = 'Usuário';
	let isLoading = true;

	// Função para capitalizar o nome
	function capitalize(str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	// Carregar os dados do usuário dos cookies
	async function loadUserData() {
		try {
			let storedUsername = '';
			authStore.subscribe((authState) => {
				storedUsername = authState.username;
			});

			if (storedUsername) {
				const [firstName, lastName] = storedUsername.split('.');
				username = `${capitalize(firstName)} ${capitalize(lastName)}`;
			}
		} catch (error) {
			console.error('Erro ao buscar o nome de usuário dos cookies:', error);
		} finally {
			isLoading = false;
		}
	}

	// Função de logout que limpa os cookies e redireciona para a tela de login
	async function handleLogout() {
		try {
			document.cookie = 'username=; Max-Age=0'; // Remove o cookie do username
			document.cookie = 'token=; Max-Age=0'; // Remove o cookie do token
			goto('/'); // Redireciona para a página de login
		} catch (error) {
			console.error('Erro ao fazer logout:', error);
		}
	}

	// Chama a função para carregar os dados do usuário ao montar o componente
	loadUserData();
</script>

<!-- Drawer Layout do DaisyUI -->
<div class="drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />

	<!-- Conteúdo Principal -->
	<div class="drawer-content flex flex-col">
		<label for="my-drawer" class="btn btn-square btn-neutral fixed left-5 top-5 z-10 shadow-xl">
			<lord-icon
				src="https://cdn.lordicon.com/ggnoyhfp.json"
				trigger="hover"
				stroke="bold"
				colors="primary:#ffffff,secondary:#ffffff"
				style="width: 35px; height: 35px;"
			>
			</lord-icon>
		</label>
		<slot />
	</div>

	<!-- Drawer Lateral -->
	<div class="drawer-side z-20 h-screen">
		<label for="my-drawer" class="drawer-overlay"></label>
		<ul class="menu flex h-screen w-80 flex-col overflow-y-auto bg-base-200 p-4 text-base-content">
			<div class="pb-14">
				<Logo size="w-14 h-14" textSize="text-4xl" />
			</div>
			<!-- Accordion para as seções -->
			{#each menuItems as section, index}
				{#if section.items && section.items.length > 0}
					<!-- Renderiza com colapso se tiver sub-itens -->
					<div class="collapse mb-6 bg-base-300 hover:bg-base-100">
						<input type="radio" name="menu-accordion" id="section-{index}" class="peer" />
						<label
							for="section-{index}"
							class="collapse-title flex items-center gap-3 text-lg font-medium"
						>
							<svelte:component this={section.icon} class="h-6 w-6 text-blue-500" />
							{section.title}
						</label>
						<div class="collapse-content">
							{#each section.items as item}
								<li class="mb-2">
									<a
										href={item.link}
										class="flex items-center space-x-3 rounded-lg text-lg transition duration-200 ease-in-out hover:bg-base-300"
										target={item.external ? '_blank' : '_self'}
										tabindex="0"
										role="menuitem"
										aria-label={item.name}
									>
										<lord-icon
											src={item.iconUrl}
											trigger="loop"
											delay="1000"
											state="hover-pinch"
											style="width: 35px; height: 35px; filter: brightness(0) saturate(100%) invert(57%) sepia(8%) saturate(7470%) hue-rotate(175deg) brightness(90%) contrast(87%);"
										>
										</lord-icon>

										<span>{item.name}</span>
									</a>
								</li>
							{/each}
						</div>
					</div>
				{:else}
					<!-- Renderiza como link direto se não houver sub-itens -->
					<div class="mb-6 rounded-xl bg-base-300 hover:bg-base-100">
						<a
							href={section.link}
							class="collapse-title flex items-center gap-3 text-lg font-medium"
						>
							<svelte:component this={section.icon} class="h-6 w-6 text-blue-500" />
							{section.title}
						</a>
					</div>
				{/if}
			{/each}

			<!-- Logout no fim da página -->
			<div class="mb-4 mt-auto">
				<button
					class="group btn btn-neutral relative flex h-full w-full items-center justify-center hover:bg-[#b91c1c]"
					on:click={handleLogout}
				>
					<span class="username transition-opacity duration-300 ease-in-out group-hover:opacity-0"
						>{username}</span
					>
					<span
						class="duration-400 absolute flex items-center justify-center gap-3 font-bold text-white opacity-0 transition-opacity ease-in-out group-hover:opacity-100"
					>
						FAZER LOGOUT
						<lord-icon
							src="https://cdn.lordicon.com/eoacwhtz.json"
							trigger="loop"
							delay="1000"
							colors="primary:#450a0a,secondary:#ffffff,tertiary:#ffffff,quaternary:#ffffff,quinary:#ffffff,senary:#ffffff,septenary:#b91c1c"
							style="width:35px;height:35px"
						>
						</lord-icon>
					</span>
				</button>
			</div>
		</ul>
	</div>
</div>

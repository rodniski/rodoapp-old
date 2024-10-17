<script lang="ts">
	import { HoverCard } from 'radix-svelte';

	// Propriedades recebidas
	export let username: string | undefined;

	// Função para extrair o nome, dependendo do formato
	const extractName = (username?: string) => {
		if (!username) return 'Nome Desconhecido';

		// Verifica se é no formato "000034 - Nome Sobrenome"
		if (username.includes(' - ')) {
			// Divide por " - " e pega a última parte (o nome completo)
			const nameParts = username.split(' - ').pop();
			return nameParts ? nameParts.trim() : 'Nome Desconhecido';
		}
		
		// Verifica se é no formato "nome.sobrenome"
		if (username.includes('.')) {
			const [firstName, lastName] = username.split('.');
			return `${capitalize(firstName)} ${capitalize(lastName)}`;
		}

		// Caso contrário, retorna o nome como está
		return username;
	};

	// Função para pegar as iniciais a partir do username
	const getInitials = (username?: string) => {
		const name = extractName(username);
		const nameParts = name.split(' ').filter(part => part); // Remove espaços extras
		const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || ''; // Primeira letra do nome
		const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0).toUpperCase() : ''; // Primeira letra do sobrenome
		return `${firstInitial}${lastInitial}`;
	};

	// Função para capitalizar a primeira letra de cada palavra
	const capitalize = (name: string) => {
		return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
	};

	// Função para formatar o nome completo para o hover
	const getFullName = (username?: string) => {
		const name = extractName(username);
		return name.split(' ').map(capitalize).join(' ');
	};
</script>

<!-- Componente Radix-Svelte HoverCard -->
<HoverCard.Root openDelay={30} closeDelay={30}>
	<HoverCard.Trigger asChild>
		<!-- Avatar com as iniciais -->
		<div class="flex items-center justify-center">
			<div
				class="flex items-center justify-center bg-neutral text-white font-medium rounded-full h-9 w-9 2xl:h-12 2xl:w-12 text-xs 2xl:text-lg"
			>
				{getInitials(username)}
			</div>
		</div>
	</HoverCard.Trigger>

	<!-- Conteúdo do HoverCard exibindo o nome completo -->
	<HoverCard.Portal>
		<HoverCard.Content sideOffset={5} align={"start"} class="p-4 bg-primary-content text-primary shadow rounded">
			<HoverCard.Arrow width={15} height={10} class="fill-primary-content" />
			<p class="text-base font-medium">{getFullName(username)}</p>
		</HoverCard.Content>
	</HoverCard.Portal>
</HoverCard.Root>

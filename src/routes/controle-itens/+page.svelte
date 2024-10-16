<script lang="ts">
	import { EvervaultCard, Icon } from '$components';
	import { IconArrowBigRightLines } from '@tabler/icons-svelte';
	import { ControleCards } from '$stores'; // Se estiver usando a store
	let cards = ControleCards; // Ou defina o array diretamente aqui se não usar a store
</script>

<div class="flex gap-14">
	{#each cards as card}
		<div
			class="bg-base-300 relative mx-auto flex h-[35rem] max-w-sm flex-col items-start border border-black/[0.2] p-4 dark:border-white/[0.2]"
		>
			<!-- Ícones nas bordas -->
			<Icon class="absolute -left-3 -top-3 h-6 w-6 text-black dark:text-white" />
			<Icon class="absolute -bottom-3 -left-3 h-6 w-6 text-black dark:text-white" />
			<Icon class="absolute -right-3 -top-3 h-6 w-6 text-black dark:text-white" />
			<Icon class="absolute -bottom-3 -right-3 h-6 w-6 text-black dark:text-white" />

			<!-- Componente EvervaultCard -->
			<EvervaultCard text={card.text} />

			<!-- Descrição -->
			<h2 class="mt-4 text-center font-mono text-sm leading-relaxed text-black dark:text-white">
				{card.description} <br /><br />
			</h2>

			<!-- Botão de acesso com animação no ícone -->
			<a href={card.link} class="btn btn-neutral group flex w-full items-center justify-between">
				<span>Acessar</span>
				<IconArrowBigRightLines
					class="ml-2 transform transition-transform duration-300 group-hover:translate-x-2"
				/>
			</a>
		</div>
	{/each}
</div>

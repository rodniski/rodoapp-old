<script lang="ts">
	import { BentoGrid, BentoGridItem, WavyBackground } from '$components';
	import { BentoItems } from '$stores';
</script>

<WavyBackground className="mx-auto flex flex-col gap-24">
	<div>
		<p class="inter-var text-center text-2xl font-bold text-white md:text-4xl lg:text-7xl">
			Bem-vindo ao RodoApp!
		</p>
		<p class="inter-var mt-4 text-center text-base font-normal text-white md:text-lg">
			Acesse nossos aplicativos e descubra ferramentas práticas para o seu dia a dia.
		</p>
	</div>
	<BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
		{#each BentoItems as item, i (i)}
			<BentoGridItem
				title={item.title}
				description={item.description}
				href={item.href}
				lottie={item.lottie}
				className={item.className}
			>
				<div
					slot="header"
					class="bg-dot-black/[0.2] dark:bg-dot-white/[0.2] flex h-full min-h-[6rem] w-full flex-1 rounded-xl border border-transparent bg-neutral-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:border-white/[0.2] dark:bg-black"
				></div>
				<svelte:component this={item.icon} slot="icon" class="h-4 w-4 text-neutral-500" />
			</BentoGridItem>
		{/each}
	</BentoGrid>
</WavyBackground>

<!-- src/lib/components/NFInfo.svelte -->
<script lang="ts">
	import type { Borracharia } from '$types'; // Ajuste o caminho conforme necessário
	export let row: Borracharia;

	// Desestruturando as propriedades necessárias
	const { Filial, NF, Vendedor, Cliente, Emissao } = row;
</script>

<div class="p-4">
	<h3 class="mb-4 text-xl font-bold text-primary">Detalhes da Nota Fiscal</h3>
	<div class="space-y-2">
		<div class="flex justify-between">
			<span class="font-semibold">Filial:</span>
			<span>{Filial}</span>
		</div>
		<div class="flex justify-between">
			<span class="font-semibold">NF:</span>
			<span>{NF}</span>
		</div>
		<div class="flex justify-between">
			<span class="font-semibold">Vendedor:</span>
			<span>{Vendedor}</span>
		</div>
		<div class="flex justify-between">
			<span class="font-semibold">Cliente:</span>
			<span>{Cliente}</span>
		</div>


		<div class="flex justify-between">
			<span class="font-semibold">Emissão:</span>
			<span>{Emissao}</span>
		</div>
	</div>
</div>

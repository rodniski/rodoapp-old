<script lang="ts">
	export let value: number;

	// Converte o valor numérico para formato de moeda brasileira
	const formatted = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL'
	}).format(value);
</script>

<span>{formatted}</span>

import { IconTableDown, IconTruck, IconSignature, IconCloud } from '@tabler/icons-svelte';

export const BentoItems = [
	{
		title: 'Lançamento de Pré Notas',
		description: 'Verifique ou lance pré documentos de entrada.',
		lottie: 'https://cdn.lordicon.com/fjvfsqea.json',
		href: '/soon',
		className: 'md:col-span-2',
		icon: IconTableDown
	},
	{
		title: 'Conferência de Saída de Pneus.',
		description: 'Precisa entregar pneus, lance aqui!',
		href: '/controle-itens',
		lottie: 'https://cdn.lordicon.com/zzjjvkam.json',
		className: 'md:col-span-1',
		icon: IconTruck
	},
	{
		title: 'Gerador de Assinatura de email',
		description: 'Acabou de entrar na empresa e precisa de uma assinatura? Crie já a sua.',
		href: '/assinatura',
		lottie: 'https://cdn.lordicon.com/fikcyfpp.json',
		className: 'md:col-span-1',
		icon: IconSignature
	},
	{
		title: 'Intranet',
		description: 'Quer conhecer mais sobre nossos processos? Acesse a nossa nova documentação.',
		href: 'https://sites.google.com/site/baserodoparana/home',
		lottie: 'https://cdn.lordicon.com/fqbvgezn.json',
		className: 'md:col-span-2',
		icon: IconCloud
	}
];

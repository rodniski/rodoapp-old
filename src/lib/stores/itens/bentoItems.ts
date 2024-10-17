import {
	IconAffiliateFilled,
	IconMessageReportFilled,
	IconBasketFilled,
	IconBarrierBlockFilled,
	IconMailFilled
} from '@tabler/icons-svelte';

export const BentoItems = [
	{
		title: 'Lançamento de Pré Notas',
		description: 'Verifique ou lance pré documentos de entrada.',
		lottie: 'https://cdn.lordicon.com/jprtoagx.json',
		state: 'morph-fill',
		href: '/soon',
		className: 'md:col-span-2',
		icon: IconBasketFilled
	},
	{
		title: 'Conferência de Saída de Pneus.',
		description: 'Precisa entregar pneus, lance aqui!',
		href: '/controle-itens',
		lottie: "https://cdn.lordicon.com/orgpczfu.json",
		state: 'loop-ride',
		className: 'md:col-span-1',
		icon: IconBarrierBlockFilled
	},
	{
		title: 'Gerador de Assinatura de email',
		description: 'Acabou de entrar na empresa e precisa de uma assinatura? Crie já a sua.',
		href: '/assinatura',
		lottie: 'https://cdn.lordicon.com/ozlkyfxg.json',
		state: 'in-unfold',
		className: 'md:col-span-1',
		icon: IconMailFilled
	},
	{
		title: 'Intranet',
		description: 'Quer conhecer mais sobre nossos processos? Acesse a nossa nova documentação.',
		href: 'https://sites.google.com/site/baserodoparana/home',
		lottie: 'https://cdn.lordicon.com/fqbvgezn.json',
		state: 'hover-roll',
		className: 'md:col-span-1',
		icon: IconAffiliateFilled
	},
	{
		title: 'Central de Ajuda',
		description: 'Para quem precisa abrir um chamado solicitando ajuda.',
		href: 'http://hesk.rodoparana.com.br',
		lottie: 'https://cdn.lordicon.com/uppnozfl.json',
		state: 'pinch',
		className: 'md:col-span-1',
		icon: IconMessageReportFilled
	}
];

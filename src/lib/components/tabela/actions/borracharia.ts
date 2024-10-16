import { toast } from 'svelte-french-toast';
import { incluirItemPortaria } from '$api';
import { separarClienteLoja, separarDocumentoESerie } from './functions';

// Função para manipular envio dos itens via POST
export async function handleConfirm({
	documentoCompleto,
	clienteCompleto,
	filial,
	itensSelecionados,
	responsible,
	plate,
	observacao,
	usuario,
	retiradaPor,
	setDrawerVisible,
	setIsLoading
}: {
	documentoCompleto: string;
	clienteCompleto: string;
	filial: string;
	itensSelecionados: any[];
	responsible: string;
	plate: string;
	observacao: string | null;
	usuario: string;
	retiradaPor: string;
	setDrawerVisible: (visible: boolean) => void;
	setIsLoading: (loading: boolean) => void;
}) {
	// Validações antes de enviar
	if (!responsible || !plate) {
		toast.error('🚨 Preencha todos os campos obrigatórios!', {
			className: 'bg-error text-white'
		});
		return;
	}

	const { documento, serie } = separarDocumentoESerie(documentoCompleto);
	const { cliente, loja } = separarClienteLoja(clienteCompleto);

	const itensParaIncluir = itensSelecionados.filter((item) => item.quantity > 0);
	if (itensParaIncluir.length === 0) {
		toast.error('❗ Nenhum item selecionado para inclusão!', {
			className: 'bg-warning text-white'
		});
		return;
	}

	setIsLoading(true);

	// Utilizando toast.promise para o processo de inclusão de itens
	await toast
		.promise(
			Promise.all(
				itensParaIncluir.map(async (item) => {
					const body = {
						filial: filial.trim(),
						documento: documento.trim(),
						serie: serie.trim(),
						cliente: cliente.trim(),
						loja: loja.trim(),
						produto: item.D2_COD.trim(),
						item: item.D2_ITEM.trim(),
						quantidade: item.quantity,
						retiradopor: retiradaPor,
						responsavel: responsible.trim(),
						placa: plate.trim(),
						observacoes: observacao?.trim() || '',
						usuario: usuario.trim(),
						origem: 'S'
					};

					console.log('Enviando POST com o seguinte corpo:', JSON.stringify(body, null, 2));

					// Faz o POST usando a função na API
					return incluirItemPortaria(body);
				})
			),
			{
				loading: '🔄 Processando os itens...',
				success: '🎉 Todos os itens foram incluídos com sucesso!',
				error: '❌ Erro ao incluir itens.'
			}
		)
		.finally(() => {
			setIsLoading(false);
			setDrawerVisible(false);
		});
}



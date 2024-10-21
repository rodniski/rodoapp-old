// src/api/POST/POSTBorracharia.ts
import { get } from 'svelte/store';
import { authStore } from '$stores'; // Certifique-se de importar do local correto
import type { ItemNF } from '$lib/types'; // Ajuste o caminho se necessário

interface BorrachariaPostData {
	retiradaPor: string;
	responsavel: string;
	placa: string;
	observacao: string;
	itens: ItemNF[];
	filial: string;
	documento: string;
	serie: string;
	cliente: string;
	loja: string;
}

export async function POSTBorracharia(data: BorrachariaPostData): Promise<void> {
	const {
		retiradaPor,
		responsavel,
		placa,
		observacao,
		itens,
		filial,
		documento,
		serie,
		cliente,
		loja
	} = data;

	// Obter o token e o usuário do authStore
	const { token, username } = get(authStore);

	if (!username || !token) {
		throw new Error('Usuário não está autenticado.');
	}

	const url = 'http://protheus-vm:9010/rest/MovPortaria/IncluirItem';

	const headers = new Headers({
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
	});

	// Loop sobre os itens selecionados
	for (const item of itens) {
		const body = {
			filial: filial,
			documento: documento,
			serie: serie,
			cliente: cliente,
			loja: loja,
			produto: item.D2_COD,
			item: item.D2_ITEM,
			quantidade: item.quantity,
			retiradopor: retiradaPor,
			responsavel: responsavel,
			placa: placa,
			observacoes: observacao,
			usuario: username,
			origem: 'S'
		};

		// Log do body para verificar os dados enviados
		console.log('Enviando body:', JSON.stringify(body));

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(body)
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error(`Erro na resposta do servidor para o item ${item.D2_COD}:`, errorText);
				throw new Error(
					`Erro ao enviar o item ${item.D2_COD}: ${response.statusText} - ${errorText}`
				);
			}

			const result = await response.json();
			console.log(`Item ${item.D2_COD} enviado com sucesso:`, result);
		} catch (error) {
			console.error(`Erro ao enviar o item ${item.D2_COD}:`, error);
			throw error; // Interrompe o loop em caso de erro
		}
	}
}

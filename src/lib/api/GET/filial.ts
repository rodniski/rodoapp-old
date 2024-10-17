// src/lib/api/filial.ts
import { filialStore } from '$stores/svelteStores'; // Importa a store criada
import type { Filial } from '$types';

const endpoint = 'http://protheus-app:8400/rest/reidoapsdu/consultar/filiais/';

// Função para fazer o fetch das filiais e atualizar a store
export async function fetchFiliais() {
	try {
		const response = await fetch(endpoint, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`Erro ao buscar filiais: ${response.status}`);
		}

		const data: Filial[] = await response.json();

		// Normaliza os dados se necessário (exemplo: remover espaços extras)
		const filiaisNormalizadas = data.map((filial) => ({
			numero: filial.numero.trim(),
			filial: filial.filial.trim(),
			cnpjFilial: filial.cnpjFilial.trim()
		}));

		// Atualiza a store com as filiais normalizadas
		filialStore.set(filiaisNormalizadas);
		console.log('Filiais atualizadas na store:', filiaisNormalizadas);
	} catch (error) {
		console.error('Erro ao buscar filiais:', error);
	}
}

// src/stores.ts
import { writable } from 'svelte/store';

// Define uma store para armazenar os filtros da tabela
export const filterStore = writable<Record<string, string>>({});

// Função para atualizar um filtro na store
export const setFilter = (columnKey: string, value: string) => {
	filterStore.update((filters) => {
		if (value) {
			filters[columnKey] = value; // Adiciona/Atualiza o filtro
		} else {
			delete filters[columnKey]; // Remove o filtro se estiver vazio
		}
		return filters;
	});
};

// Função para limpar todos os filtros
export const resetFilters = () => {
	filterStore.set({});
};

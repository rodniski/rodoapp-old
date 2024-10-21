// src/lib/stores/svelteStores.ts
import { writable } from 'svelte/store';
import type { AuthState, Filial, ItemNF } from '$types';
// Store para armazenar a lista de filiais
export const filialStore = writable<Filial[]>([]); // Inicia com um array vazio

export const activeRowStore = writable<{
	isActive: boolean;
	notaFiscal: string | null;
}>({
	isActive: false,
	notaFiscal: null
});

export const saldoSelect = writable<ItemNF[]>([]);

export const authStore = writable<AuthState>({
  isAuthenticated: false,
  token: '',
  username: '',
});

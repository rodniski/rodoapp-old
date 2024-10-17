// src/lib/stores/svelteStores.ts
import { writable } from 'svelte/store';
import type { Filial } from '$types';

// Store para armazenar a lista de filiais
export const filialStore = writable<Filial[]>([]); // Inicia com um array vazio

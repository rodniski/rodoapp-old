// src/lib/types/filial.ts
export interface Filial {
	numero: string;
	filial: string;
	cnpjFilial: string;
}
export interface AuthState {
	isAuthenticated: boolean;
	token: string;
	username: string;
}

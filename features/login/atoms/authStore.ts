import { atomWithStorage } from "jotai/utils";

// Usa o localStorage para persistir o username
export const usernameAtom = atomWithStorage<string | null>(
  "username", // Chave no localStorage
  null // Valor inicial
);

import { useMutation } from "@tanstack/react-query";
import { authService } from "%/services/authService";

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      return await authService.login(username, password); // Ajustado para usar o método login
    },
    onSuccess: (data) => {
      console.log("Login bem-sucedido!");
    },
    onError: (error) => {
      console.error("Erro ao fazer login:", error);
    },
  });
};

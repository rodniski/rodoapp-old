const API_URL = process.env.NEXT_PUBLIC_API_PRODUCTION_URL;

if (!API_URL) {
  throw new Error(
    "A variável NEXT_PUBLIC_API_PRODUCTION_URL não está definida."
  );
}

export const authService = {
  async login(username: string, password: string) {
    try {
      const response = await fetch(`${API_URL}api/oauth2/v1/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          username,
          password,
          grant_type: "password",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error_description || "Credenciais inválidas");
      }

      const data = await response.json();

      // Salva tokens nos cookies
      document.cookie = `access_token=${data.access_token}; Path=/; Secure;`;
      document.cookie = `refresh_token=${data.refresh_token}; Path=/; Secure;`;

      return data;
    } catch (error: any) {
      throw new Error(error.message || "Erro desconhecido ao fazer login");
    }
  },

  async refreshToken() {
    try {
      const refreshToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("refresh_token="))
        ?.split("=")[1];

      if (!refreshToken) {
        throw new Error("Refresh token não encontrado.");
      }

      const response = await fetch(`${API_URL}api/oauth2/v1/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error_description || "Erro ao renovar o token."
        );
      }

      const data = await response.json();

      // Atualiza tokens nos cookies
      document.cookie = `access_token=${data.access_token}; Path=/; Secure;`;
      document.cookie = `refresh_token=${data.refresh_token}; Path=/; Secure;`;

      return data.access_token;
    } catch (error) {
      console.error("Erro ao renovar o token:", error);
      throw error;
    }
  },
};

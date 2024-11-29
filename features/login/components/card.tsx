"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "ui";
import { useLogin } from "%/hooks/useLogin";
import { useRouter } from "next/navigation"; // Importando o router para redirecionar

type LoginError = {
  message: string;
};

const LoginCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync: login } = useLogin();
  const router = useRouter(); // Inicializando o router

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await toast.promise(login({ username, password }), {
      loading: "Fazendo login...",
      success: "Login bem-sucedido! Bem-vindo ao RodoAPP.",
      error: (error: LoginError) =>
        `Erro ao fazer login: ${error.message || "Tente novamente."}`,
    });

    // Redirecionar após login bem-sucedido
    router.push("/central");
  };

  return (
    <div className="z-50 flex justify-center items-center">
      <Card className="bg-slate-800/20 text-white backdrop-blur max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-white">
            Bem-vindo ao RodoApp 2.0
          </CardTitle>
          <CardDescription className="text-center text-white/70">
            Acesse utilizando seu login do Protheus e veja as novidades do novo
            sistema Rodoparaná!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">
                Usuário do Protheus
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="nome.sobrenome"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="*****"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-white"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!username || !password}
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginCard;

import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const token = req.cookies.get("access_token");

  // Permitir acesso apenas à página de login (/)
  if (req.nextUrl.pathname === "/" && !token) {
    return NextResponse.next(); // Permite acesso à página de login
  }

  // Redirecionar para / caso não esteja autenticado
  if (!token) {
    const loginUrl = new URL("/", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next(); // Permite acesso às demais rotas protegidas
}

export const config = {
  matcher: ["/((?!api).*)"], // Protege todas as rotas exceto APIs públicas
};

import { Inter } from "next/font/google";
import { QueryProvider } from "lib"; // Ajuste o caminho se necessário
import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "components/theme/theme-provider";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}

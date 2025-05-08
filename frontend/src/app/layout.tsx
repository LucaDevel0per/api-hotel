import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sistema de Reservas de Hotel",
  description: "Sistema de gerenciamento de reservas de hotel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="min-h-screen">
          <main className="container mx-auto py-4">{children}</main>
        </div>
      </body>
    </html>
  );
}

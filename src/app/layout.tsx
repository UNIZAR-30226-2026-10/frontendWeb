import "./globals.css";

import BarraSuperior from "@/components/layout/BarraSuperior";
import BarraAmigos from "@/components/layout/BarraAmigos";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="flex h-screen bg-blue-700 text-white font-sans overflow-hidden">
        {/*Zona de abajo de la pantalla, dividida en una columna para los amigos y otra para el propio contenido de la página*/}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/*Barra superior con los distintos menús (importado desde /components/layout/BarraSuperior)*/ }
          <header className="h-20 bg-background border-b-4 border-yellow-400 flex-none max-w-400">
            {/* Aquí cargamos el archivo TopNavbar.tsx */}
            <BarraSuperior></BarraSuperior>
          </header>

          
          {/* Contenido principal de la página */}
          {/* flex-1 hace que ocupe todo el espacio sobrante */}
          <main className="flex-1 bg-blue-600 p-8 overflow-y-auto shadow-inner">
            {/* Aquí Next.js inyecta mágicamente tus page.tsx */}
            {children}
          </main>
        </div>

          {/* Barra de amigos (importado desde /components/layout/BarraAmigos)*/}
        <aside className="w-80 bg-blue-800 border-l-4 border-yellow-400 flex flex-col">
          <BarraAmigos></BarraAmigos>
        </aside>


      </body>
    </html>
  );
}
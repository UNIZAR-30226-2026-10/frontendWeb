import BarraSuperior from "@/components/layout/BarraSuperior";
import BarraAmigos from "@/components/layout/BarraAmigos";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <div className="flex h-screen w-screen bg-blue-700 text-white font-sans overflow-hidden">
      
      {/* Zona izquierda (Header + Contenido) */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Barra superior */}
        <header className="h-20 bg-background border-b-4 border-yellow-400 shrink-0">
          <BarraSuperior />
        </header>
        {/* CONTENIDO PRINCIPAL DE LA PÁGINA */}
        <main className="flex-1 min-h-0 flex flex-col bg-blue-600 shadow-inner overflow-hidden">
          {children}
        </main>
      </div>
      {/* Barra de amigos */}
      <aside className="w-80 bg-blue-800 border-l-4 border-yellow-400 flex flex-col shrink-0">
        <BarraAmigos />
      </aside>
      
    </div>
  );
}
import { RegresarJuego } from "@/components/layout/RegresarJuego";

export default function PartidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen w-screen bg-blue-700 font-sans overflow-hidden">
      
      <header className="w-full h-12 flex-none bg-blue-800 border-b border-yellow-500 shadow-md z-50">
        <RegresarJuego /> 
      </header>

      <main className="flex-1 w-full relative overflow-hidden">
        {children}
      </main>
      
    </div>
  );
}
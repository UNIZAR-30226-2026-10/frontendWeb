import { RegresarJuego } from "@/components/layout/RegresarJuego";

export default function PartidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-blue-700 text-white font-sans overflow-hidden">
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="">
          <RegresarJuego />
        </header>
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
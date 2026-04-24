import CuadroRegistro from "@/components/interfaz/CuadroRegistro";

export default function RegistroPage() {
  return (
    <main className="min-h-screen bg-[#0a0f2c] flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0f2c] to-[#0a0f2c] pointer-events-none" />
      <CuadroRegistro />
    </main>
  );
}
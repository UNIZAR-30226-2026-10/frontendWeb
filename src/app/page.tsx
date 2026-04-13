import CuadroInicioSesion from "@/components/interfaz/CuadroInicioSesion";

export default function InicioSesion() {
  return (
    <main className="min-h-screen --background flex items-center justify-center p-4">
      {/* El fondo lo puedes dejar aquí o pasarlo al layout global */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0f2c] to-[#0a0f2c] pointer-events-none" />
      <CuadroInicioSesion />
    </main>
  );
}


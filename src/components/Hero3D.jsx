import EyeCanvas3D from './EyeCanvas3D';

export default function Hero3D() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden bg-neutral-950 text-white border-t border-white/10">
      {/* Objeto 3D de fondo */}
      <div className="absolute inset-0 z-0">
        <EyeCanvas3D />
      </div>

      {/* Capa de interfaz e información */}
      <div className="relative z-10 pointer-events-none h-full min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-4rem)] flex flex-col justify-between">
        
        {/* Header de la sección 3D */}
        <div className="flex justify-between items-start gap-4">
          <span className="text-[10px] sm:text-xs font-mono uppercase text-cyan-400 bg-black/70 px-3 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-md">
            OJO INTERACTIVO 3D
          </span>
          <span className="hidden sm:inline-block text-xs font-mono text-neutral-400 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
            INTERACTUÁ CON EL CURSOR O TÁCTIL
          </span>
        </div>

        {/* Título Principal y Tarjeta de Enfoque */}
        <div className="max-w-xl my-auto sm:my-0 bg-black/60 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-5 sm:p-0 rounded-2xl border border-white/10 sm:border-none shadow-2xl sm:shadow-none">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1 sm:hidden">
            EXPLORACIÓN TRIDIMENSIONAL
          </span>
          <h2 className="text-2xl sm:text-5xl font-black uppercase tracking-tight leading-tight">
            LA MIRADA QUE <br />
            <span className="text-cyan-400">CREA REALIDADES</span>
          </h2>
        </div>

        {/* Footer técnico de la sección */}
        <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-neutral-400 bg-black/40 sm:bg-transparent px-3 py-1.5 sm:p-0 rounded-lg backdrop-blur-sm sm:backdrop-blur-none">
          <span>ENTORNO WEBGL</span>
          <span>EXPERIENCIA 3D</span>
        </div>
      </div>
    </section>
  );
}
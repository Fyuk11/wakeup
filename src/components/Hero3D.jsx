import EyeCanvas3D from './EyeCanvas3D';

export default function Hero3D() {
  return (
    <section className="relative h-screen w-full flex flex-col justify-between p-8 md:p-12 overflow-hidden bg-neutral-950 text-white border-t border-white/10">
      <div className="absolute inset-0 z-0">
        <EyeCanvas3D />
      </div>

      <div className="relative z-10 pointer-events-none h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-xs font-mono uppercase text-cyan-400 bg-black/60 px-3 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-md">
            // FASE 02: OJO INTERACTIVO 3D
          </span>
          <span className="text-xs font-mono text-neutral-500">
            [ MUEVE EL CURSOR PARA INTERACTUAR ]
          </span>
        </div>

        <div className="max-w-xl">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            LA MIRADA QUE <br />
            <span className="text-cyan-400">Crea Realidades</span>
          </h2>
        </div>

        <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500">
          <span>REACT THREE FIBER</span>
          <span>60 FPS OPTIMIZED</span>
        </div>
      </div>
    </section>
  );
}
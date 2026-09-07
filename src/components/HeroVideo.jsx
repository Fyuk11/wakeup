export default function HeroVideo({ videoSrc }) {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden bg-black text-white">
      {/* Fondo de Video / Gradiente */}
      <div className="absolute inset-0 z-0">
        {videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            src={videoSrc}
            className="w-full h-full object-cover scale-105 filter brightness-75 contrast-125 saturate-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyan-950 via-black to-blue-950" />
        )}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Header Responsivo */}
      <header className="relative z-20 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 pt-2 sm:pt-0">
        <div className="flex items-center gap-2.5">
          <span className="text-lg sm:text-xl font-black tracking-widest text-white uppercase">
            WAKE-UP
          </span>
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 px-2.5 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-950/50 backdrop-blur-md">
            STUDIO
          </span>
        </div>

        <div className="self-end sm:self-auto relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-md opacity-30 animate-pulse" />
          <div className="relative px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-black/80 border border-white/20 backdrop-blur-2xl shadow-2xl flex items-center gap-3">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-cyan-500"></span>
            </span>
            <div className="flex flex-col text-left">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-cyan-300 font-bold">
                EXPERIENCIAS 2026
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono text-neutral-400 tracking-wider">
                TRADUCCIÓN CREATIVA
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Main Card */}
      <main className="relative z-10 my-auto max-w-4xl mx-auto text-center flex flex-col items-center w-full px-2 py-8">
        <div className="w-full p-6 sm:p-12 rounded-3xl bg-black/50 border border-white/10 backdrop-blur-xl shadow-2xl">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 mb-3 block">
            DESPERTANDO LA PERCEPCIÓN DIGITAL
          </span>
          <h1 className="text-3xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase leading-tight sm:leading-none">
            TRADUCCIÓN <br />
            <span className="text-cyan-400">CREATIVA</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto font-mono leading-relaxed">
            Transformamos visiones conceptuales en arquitecturas web interactivas y fluidas.
          </p>
        </div>
      </main>

      {/* Hero Footer */}
      <footer className="relative z-10 flex flex-col sm:flex-row justify-between items-center w-full text-[10px] sm:text-[11px] font-mono text-neutral-400 gap-3">
        <span className="hidden sm:inline">VISIÓN AMBIENTAL</span>
        <div className="flex items-center gap-2 bg-black/70 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
          <span className="text-cyan-400 uppercase tracking-wider text-[10px] sm:text-xs">
            DESPLAZÁ PARA INTERACTUAR ↓
          </span>
        </div>
        <span className="hidden sm:inline">ESTUDIO CREATIVO</span>
      </footer>
    </section>
  );
}
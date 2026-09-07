import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(() => onComplete(), 800);
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden select-none"
        >
          {/* Luz ambiental de fondo */}
          <div className="absolute w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-cyan-500/20 via-sky-400/10 to-transparent rounded-full blur-3xl pointer-events-none -top-20 -left-20 animate-pulse" />

          {/* Header del Loader */}
          <div className="w-full flex justify-between items-center text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-slate-400 z-10">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              WAKEUP
            </span>
            <span>INICIALIZANDO</span>
          </div>

          {/* Contenido Central */}
          <div className="flex flex-col items-center justify-center z-10 my-auto text-center px-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 mb-6 flex items-center justify-center"
            >
              <div className="absolute inset-0 border border-cyan-500/30 rounded-full animate-[spin_8s_linear_infinite]" />
              <div className="absolute inset-2 border border-dashed border-cyan-400/50 rounded-full animate-[spin_12s_linear_infinite_reverse]" />
              <div className="w-3.5 h-3.5 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
            </motion.div>

            <h1 className="text-2xl sm:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">
              DESPERTANDO LA MIRADA
            </h1>
            <p className="mt-2 text-[10px] sm:text-xs font-mono text-cyan-400/80 uppercase tracking-[0.3em]">
              TRADUCCIÓN CREATIVA & EXPERIENCIA 3D
            </p>
          </div>

          {/* Footer del Loader: Barra de Progreso */}
          <div className="w-full max-w-xs sm:max-w-md flex flex-col gap-2.5 z-10">
            <div className="flex justify-between items-center font-mono text-[10px] sm:text-xs text-slate-400 tracking-widest">
              <span>CARGANDO ENTORNO</span>
              <span className="text-cyan-400 font-bold">{progress}%</span>
            </div>
            
            <div className="w-full h-[2px] bg-slate-800 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-sky-300 to-white shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
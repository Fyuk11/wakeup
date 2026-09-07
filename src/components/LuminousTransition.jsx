import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function LuminousTransition() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.85, 1],
    ['#000000', '#ffffff', '#ffffff', '#f1f5f9']
  );

  const textColor = useTransform(
    scrollYProgress,
    [0.1, 0.25],
    ['#ffffff', '#000000']
  );

  const eyeImageOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5], [0.15, 0.35, 0]);
  const eyeScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1.2]);

  const headerGuideOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const headerGuideY = useTransform(scrollYProgress, [0, 0.25], [0, -20]);

  const ctaOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.3, 0.75, 0.88, 1],
    [0, 1, 1, 0.4, 0]
  );

  const ctaScale = useTransform(
    scrollYProgress,
    [0.15, 0.3, 0.75, 0.95],
    [0.9, 1, 1, 0.82]
  );

  const ctaBlur = useTransform(
    scrollYProgress,
    [0.75, 0.95],
    ['blur(0px)', 'blur(10px)']
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative w-full h-[280vh] sm:h-[320vh] transition-colors duration-150 ease-out"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
        
        {/* Indicador de Desplazamiento */}
        <motion.div
          style={{ opacity: headerGuideOpacity, y: headerGuideY }}
          className="absolute top-8 sm:top-12 z-30 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 font-bold drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">
            DESLIZÁ PARA DESPERTAR
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"
          />
        </motion.div>

        {/* Imagen de Fondo Ojo */}
        <motion.div
          style={{ opacity: eyeImageOpacity, scale: eyeScale }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 mix-blend-multiply"
        >
          <img
            src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop"
            alt="Wake Up Vision"
            className="w-full h-full object-cover filter contrast-125 grayscale"
          />
        </motion.div>

        {/* Círculo de Luz Responsivo */}
        <motion.div
          style={{
            scale: useTransform(scrollYProgress, [0, 0.4, 0.8], [0.4, 2.5, 3]),
            opacity: useTransform(scrollYProgress, [0, 0.2, 0.75, 0.95], [0.2, 1, 1, 0])
          }}
          className="absolute w-[320px] sm:w-[750px] h-[320px] sm:h-[750px] rounded-full bg-gradient-to-tr from-cyan-300 via-white to-emerald-200 blur-2xl sm:blur-3xl pointer-events-none z-0"
        />

        {/* Bloque CTA Central */}
        <motion.div
          style={{
            scale: ctaScale,
            opacity: ctaOpacity,
            filter: ctaBlur,
            color: textColor
          }}
          className="relative z-10 max-w-4xl text-center flex flex-col items-center gap-4 sm:gap-6 px-2"
        >
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-black/10 bg-black/5 backdrop-blur-md">
            WAKE UP EXPERIENCE
          </span>

          <h2 className="text-2xl sm:text-6xl font-black uppercase tracking-tight leading-tight sm:leading-[1.05]">
            ¿Listo para despertar el potencial de tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600">visión digital</span>?
          </h2>

          <p className="text-xs sm:text-lg font-mono opacity-80 max-w-xl leading-relaxed">
            Fusionamos estética futurista, 3D en tiempo real y código de alta precisión para marcas que no temen destacar.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 sm:mt-4 px-8 py-3.5 sm:px-10 sm:py-5 rounded-full bg-black text-white font-mono font-bold text-[11px] sm:text-xs tracking-widest uppercase hover:bg-neutral-800 transition-all shadow-2xl flex items-center gap-3 group cursor-pointer"
          >
            <span>INICIAR PROYECTO</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </motion.button>
        </motion.div>

      </div>
    </motion.div>
  );
}
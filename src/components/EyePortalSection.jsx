import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function EyePortalSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Transición de fondo continuo para empalmar perfecto con la sección anterior
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.45, 0.85, 1],
    ['#f1f5f9', '#0f172a', '#030712', '#030712']
  );

  // Transición del Orbe Lumínico
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 2.5, 3.2]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.6, 0.9, 0.4, 0]);

  // Colores de texto adaptables
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.35, 0.75],
    ['#000000', '#ffffff', '#ffffff']
  );

  const subtextColor = useTransform(
    scrollYProgress,
    [0, 0.35, 0.75],
    ['#475569', '#94a3b8', '#64748b']
  );

  // Escala del Ojo agrandada: Inicio más presente (0.65) -> Extensión amplia al final (1.55)
  const eyeScale = useTransform(scrollYProgress, [0.05, 0.4, 0.9], [0.65, 1.1, 1.55]);

  // Secuencia de cambio de imágenes
  const img1Opacity = useTransform(scrollYProgress, [0.05, 0.28, 0.42], [1, 1, 0]);
  const img2Opacity = useTransform(scrollYProgress, [0.38, 0.52, 0.68], [0, 1, 0]);
  const img3Opacity = useTransform(scrollYProgress, [0.64, 0.78, 1], [0, 1, 1]);

  return (
    <motion.div 
      ref={containerRef} 
      style={{ backgroundColor }}
      className="relative w-full h-[300vh] transition-colors duration-150 ease-out"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
        
        {/* CÍRCULO INMERSIVO DE LUZ (REPLICA LuminousTransition) */}
        <motion.div
          style={{
            scale: orbScale,
            opacity: orbOpacity
          }}
          className="absolute w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-cyan-400 via-emerald-200 to-sky-300 blur-3xl pointer-events-none z-0"
        />

        {/* Capa de textura ambiental en blend */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.4, 0.8], [0.2, 0.4, 0.1])
          }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 mix-blend-overlay"
        >
          <img
            src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop"
            alt="Texture Overlay"
            className="w-full h-full object-cover filter contrast-125 grayscale"
          />
        </motion.div>

        {/* Título (sin el pretítulo) */}
        <motion.div 
          style={{ 
            color: textColor,
            opacity: useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [1, 1, 1, 0.4])
          }}
          className="absolute top-14 text-center z-20 max-w-2xl px-4"
        >
          <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            Una experiencia diseñada para sentirse
          </h3>
        </motion.div>

        {/* Portal del Ojo con mayor presencia */}
        <motion.div 
          style={{ 
            scale: eyeScale,
            clipPath: 'ellipse(50% 40% at 50% 50%)',
          }}
          className="relative w-[90vw] max-w-[900px] h-[48vw] max-h-[460px] z-10 shadow-2xl overflow-hidden"
        >
          {/* Anillo de neón continuo */}
          <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-[50%] z-30 pointer-events-none blur-[1px]" />

          <motion.img
            style={{ opacity: img1Opacity }}
            src="/eye-ocean.png"
            alt="Eye Ocean"
            className="absolute inset-0 w-full h-full object-cover scale-105"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000'; }}
          />

          <motion.img
            style={{ opacity: img2Opacity }}
            src="/eye-island.png"
            alt="Eye Island"
            className="absolute inset-0 w-full h-full object-cover scale-105"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000'; }}
          />

          <motion.img
            style={{ opacity: img3Opacity }}
            src="/eye-water.png"
            alt="Eye Water"
            className="absolute inset-0 w-full h-full object-cover scale-105"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1000'; }}
          />
        </motion.div>

        {/* Subtexto inferior */}
        <motion.div 
          style={{ color: subtextColor }}
          className="absolute bottom-10 z-20 text-center font-mono text-xs uppercase tracking-[0.3em]"
        >
          <p>[ NAVEGÁ A TRAVÉS DE LA MIRADA ]</p>
        </motion.div>

      </div>
    </motion.div>
  );
}
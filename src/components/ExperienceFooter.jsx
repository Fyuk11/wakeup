import { useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    num: '01',
    question: '¿CÓMO ESTÁ CONSTRUIDA ESTA EXPERIENCIA?',
    answer: 'Desarrollada con React, Vite, Tailwind CSS v4 y Framer Motion para orquestar animaciones con aceleración por hardware a 60fps.'
  },
  {
    num: '02',
    question: '¿ES ADAPTABLE A PROYECTOS DE MARCA REALES?',
    answer: 'Absolutamente. Estructuramos código modular listo para escalar a e-commerce, sitios corporativos de alto impacto o plataformas 3D.'
  },
  {
    num: '03',
    question: '¿CÓMO TRABAJAMOS EL DISEÑO INTERACTIVO?',
    answer: 'Combinamos dirección de arte futurista con usabilidad estricta. Cada microinteracción responde al ritmo de navegación del usuario.'
  }
];

export default function ExperienceFooter() {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <footer className="w-full bg-[#030712] text-white pt-24 pb-12 border-t border-white/10 relative overflow-hidden">
      
      {/* IMAGEN CELESTE DE FONDO (`ojo-water.jpeg`) CON BLEND MODE */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-luminosity">
        <img
          src="/ojo-water.jpeg"
          alt="Water Eye Background"
          className="w-full h-full object-cover filter contrast-150"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ENCABEZADO DE CERRADO */}
        <div className="max-w-3xl mb-20">
          <span className="text-xs font-mono uppercase tracking-[0.4em] text-cyan-400 font-bold">// MANIFIESTO & DESPEJE</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-3 leading-tight">
            Despertar es solo el primer paso.
          </h2>
          <p className="text-neutral-400 font-mono text-sm md:text-base mt-4 leading-relaxed">
            Explorá los detalles técnicos e interactivos detrás de la arquitectura web de WAKE UP.
          </p>
        </div>

        {/* FAQS ESTILO INDEX */}
        <div className="mb-32 flex flex-col border-t border-white/15">
          {faqs.map((faq, index) => (
            <div
              key={faq.num}
              onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              className="group border-b border-white/15 py-8 cursor-pointer transition-colors hover:bg-white/[0.02] px-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className="text-sm font-mono text-cyan-400 font-bold">{faq.num}</span>
                  <h4 className="text-lg md:text-2xl font-mono uppercase font-bold tracking-wider group-hover:text-cyan-300 transition-colors">
                    {faq.question}
                  </h4>
                </div>
                <span className="text-2xl font-mono opacity-50 group-hover:opacity-100 transition-opacity">
                  {activeFaq === index ? '−' : '+'}
                </span>
              </div>

              {activeFaq === index && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 ml-12 text-neutral-400 font-mono text-sm md:text-base leading-relaxed max-w-3xl"
                >
                  {faq.answer}
                </motion.p>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER BOTTOM & FIRMA TRADUCCIÓN CREATIVA */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between font-mono text-xs text-neutral-500 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-neutral-300 font-bold">WAKE UP CREATIVE STUDIO // 2026</span>
          </div>

          <div className="flex items-center gap-2 text-neutral-400 font-semibold tracking-wider">
            <span>by</span>
            <span className="text-cyan-400 font-bold uppercase tracking-widest hover:underline cursor-pointer">
              Traducción Creativa
            </span>
          </div>

          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
            <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
            <a href="#" className="hover:text-white transition-colors">TWITTER</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
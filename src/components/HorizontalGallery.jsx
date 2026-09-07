import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: '01',
    title: 'CYBERNETIC VISION',
    category: 'UI/UX & SHADERS 3D',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    tags: ['THREE.JS', 'REACT', 'GLSL'],
    description: 'Exploración sobre la interacción entre shaders procedurales y la experiencia de usuario. Diseñado para simular interfaces biomecánicas en tiempo real.',
    prompt: 'Bio-luminescent cybernetic interface, glowing emerald nodes, dark background, cinematic lighting --ar 16:9 --v 6.0'
  },
  {
    id: '02',
    title: 'NEURAL INTERACTION',
    category: 'BRAND EXPERIENCE',
    img: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop',
    tags: ['GSAP', 'WEBGL', 'DESIGN'],
    description: 'Estructura visual que mapea pulsos neuronales mediante sistemas de partículas en WebGL con respuesta cinética al movimiento del cursor.',
    prompt: 'Abstract pink and purple neural pathways, glass refractions, high density particles, octane render --ar 16:9'
  },
  {
    id: '03',
    title: 'HYPERDIMENSIONAL',
    category: '3D SHOWCASE',
    img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop',
    tags: ['SPLINE', 'R3F', 'CSS3D'],
    description: 'Estudio geométrico tridimensional enfocado en materiales cristalinos con refracción esmeralda y física espacial simétrica.',
    prompt: 'Floating green crystal geometry, refraction, dark space background, emerald glow, raytracing --ar 16:9'
  },
  {
    id: '04',
    title: 'SYNTHETIC REALITY',
    category: 'CREATIVE DEVELOPMENT',
    img: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=1000&auto=format&fit=crop',
    tags: ['MOTION', 'AUDIO API', 'TAILWIND'],
    description: 'Entorno inmersivo con renderizado reactivo a frecuencias de audio para instalaciones digitales y experiencias artísticas de marca.',
    prompt: 'Synthetic wave distortion, chromatic aberration, deep neon green trails, cinematic camera angle --ar 16:9'
  }
];

export default function HorizontalGallery() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Cálculo dinámico contemplando padding lateral
    const getScrollAmount = () => -(el.scrollWidth - window.innerWidth + (window.innerWidth < 768 ? 32 : 100));

    const pin = gsap.to(el, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: () => `+=${el.scrollWidth}`,
        scrub: 0.6, // Scrub un poco más directo para mejor respuesta táctil
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });

    return () => pin.kill();
  }, { scope: triggerRef });

  return (
    <section ref={triggerRef} className="overflow-hidden bg-black text-white relative">
      <div className="h-screen w-full flex items-center justify-start relative">
        
        {/* Titular Fijo Superior */}
        <div className="absolute top-6 left-6 md:top-10 md:left-16 z-20 pointer-events-none">
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 block mb-0.5 md:mb-1">
            ARCHIVO VISUAL
          </span>
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight">
            GALERÍA DE EXPERIENCIAS
          </h2>
        </div>

        {/* Carrusel Desplazable Horizontalmente */}
        <div 
          ref={sectionRef} 
          className="flex gap-4 md:gap-12 pl-6 md:pl-16 pr-12 md:pr-32 w-max items-center pt-12 md:pt-0"
        >
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative w-[280px] sm:w-[420px] md:w-[460px] h-[420px] sm:h-[500px] md:h-[560px] bg-neutral-900/60 rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between p-6 md:p-8 hover:border-cyan-500/50 transition-all duration-500 shrink-0 shadow-2xl cursor-pointer backdrop-blur-md"
            >
              {/* Imagen de fondo con hover zoom */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-85 transition-all duration-700 ease-out filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              {/* Tag Superior */}
              <div className="relative z-10 flex justify-between items-center">
                <span className="text-xl md:text-2xl font-mono font-black text-cyan-400">
                  {project.id}
                </span>
                <span className="text-[9px] md:text-[10px] font-mono tracking-widest px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 uppercase">
                  {project.category}
                </span>
              </div>

              {/* Info Inferior */}
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight mb-3 md:mb-4 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                
                <div className="flex gap-1.5 md:gap-2 flex-wrap mb-3 md:mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[8px] md:text-[9px] font-mono px-2 md:px-2.5 py-0.5 md:py-1 bg-white/10 backdrop-blur-md rounded-md text-neutral-300">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[11px] md:text-xs font-mono text-cyan-400 opacity-90 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>DESPLEGAR CONCEPTO</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal Glassmorphic para Inspeccionar la Card */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-neutral-950/90 border border-white/20 rounded-3xl overflow-hidden z-10 shadow-2xl backdrop-blur-2xl max-h-[90vh] flex flex-col md:flex-row"
            >
              {/* Botón Cierre */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors font-mono text-sm"
              >
                ✕
              </button>

              {/* Imagen Grande */}
              <div className="md:w-1/2 relative h-[200px] md:h-auto">
                <img
                  src={selectedProject.img}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent md:hidden" />
              </div>

              {/* Detalles */}
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between gap-4 md:gap-6">
                <div>
                  <span className="text-[10px] md:text-xs font-mono text-cyan-400 tracking-widest uppercase block mb-1">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 md:mb-4">
                    {selectedProject.title}
                  </h2>
                  <p className="text-neutral-300 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 font-mono">
                    {selectedProject.description}
                  </p>

                  <div className="bg-black/60 border border-white/10 rounded-xl p-3 md:p-4 mb-2 md:mb-4">
                    <span className="text-[9px] md:text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                      PROMPT GENERATIVO:
                    </span>
                    <p className="text-[11px] md:text-xs font-mono text-cyan-300/90 italic">
                      "{selectedProject.prompt}"
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 text-black font-black font-mono text-xs hover:opacity-90 transition-opacity uppercase"
                >
                  CERRAR
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
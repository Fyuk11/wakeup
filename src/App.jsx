import { useEffect } from 'react';
import Lenis from 'lenis';

import HeroVideo from './components/HeroVideo';
import Hero3D from './components/Hero3D';
import HorizontalGallery from './components/HorizontalGallery';
import LuminousTransition from './components/LuminousTransition';
import EyePortalSection from './components/EyePortalSection';
import ExperienceFooter from './components/ExperienceFooter';

// Importá tu video si ya lo pusiste en src/assets/
import eyeVideo from './assets/eye-video.mp4';

export default function App() {
  useEffect(() => {
    // 1. Desactivar el scroll guardado del navegador y forzar inicio arriba
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // 2. Inicializar Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Asegurar que Lenis también arranque arriba de todo
    lenis.scrollTo(0, { immediate: true });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-black text-white selection:bg-cyan-500 selection:text-black">

      {/* 1. Hero Cinemático con Video */}
      <HeroVideo videoSrc={eyeVideo} />

      {/* 2. Laboratorio Ojo 3D */}
      <Hero3D />

      {/* 3. Galería Horizontal Interactiva GSAP */}
      <HorizontalGallery />

      {/* Transición al Blanco + CTA */}
      <LuminousTransition />

      {/* Secciones con la estética real de tus fotos */}
      <EyePortalSection />
      <ExperienceFooter />

    </div>
  );
}
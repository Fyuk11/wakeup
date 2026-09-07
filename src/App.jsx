import { useState, useEffect } from 'react';
import Lenis from 'lenis';

import Preloader from './components/Preloader';
import HeroVideo from './components/HeroVideo';
import Hero3D from './components/Hero3D';
import HorizontalGallery from './components/HorizontalGallery';
import LuminousTransition from './components/LuminousTransition';
import EyePortalSection from './components/EyePortalSection';
import ExperienceFooter from './components/ExperienceFooter';

// Importá tu video si ya lo pusiste en src/assets/
import eyeVideo from './assets/eye-video.mp4';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Desactivar el scroll guardado del navegador y forzar inicio arriba
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Si está cargando, bloqueamos el scroll
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'unset';

    // 2. Inicializar Lenis Smooth Scroll una vez que termina el loader
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.scrollTo(0, { immediate: true });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [isLoading]);

  return (
    <>
      {/* Loader de Bienvenida Cinemático */}
      <Preloader onComplete={() => setIsLoading(false)} />

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
    </>
  );
}
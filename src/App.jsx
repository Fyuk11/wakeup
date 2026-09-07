import HeroVideo from './components/HeroVideo';
import Hero3D from './components/Hero3D';
import HorizontalGallery from './components/HorizontalGallery';
import LuminousTransition from './components/LuminousTransition';
import EyePortalSection from './components/EyePortalSection';
import ExperienceFooter from './components/ExperienceFooter';


// Importá tu video si ya lo pusiste en src/assets/
import eyeVideo from './assets/eye-video.mp4';

export default function App() {
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
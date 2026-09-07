import { useRef, Suspense, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, Sparkles, Center, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Anillo orbital con aspecto translúcido sutil
function EnergyRing({ mode, isMobile }) {
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (mode === 'xray' ? 1.8 : 1.2);
      ringRef.current.rotation.x += delta * 0.4;
    }
  });

  if (mode === 'normal') return null;

  const color = mode === 'cyber' ? '#ff00aa' : '#00f5a0';
  const ringPosition = isMobile ? [0, 0.4, -0.5] : [1.2, 0, -0.5];

  return (
    <mesh ref={ringRef} position={ringPosition}>
      <torusGeometry args={[isMobile ? 1.8 : 2.2, 0.02, 16, 100]} />
      {/* Opacidad reducida para eliminar el bloque sólido */}
      <meshBasicMaterial color={color} transparent opacity={0.35} wireframe />
    </mesh>
  );
}

function ModelEye({ mode, isMobile }) {
  const eyeRef = useRef();
  const pointLightRef = useRef();
  const targetRef = useRef(new THREE.Vector3(0, 0, 10)); 
  const { scene } = useGLTF('/models/eye.glb');
  
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((state) => {
    const pointerX = state.pointer?.x ?? 0;
    const pointerY = state.pointer?.y ?? 0;
    const time = state.clock.getElapsedTime();

    let rawTargetX = pointerX * (isMobile ? 2.2 : 3);
    let rawTargetY = pointerY * (isMobile ? 2.2 : 3);

    const targetX = Math.max(-2.5, Math.min(2.5, rawTargetX));
    const targetY = Math.max(-2.0, Math.min(2.0, rawTargetY));
    const targetZ = 8; 

    targetRef.current.x = THREE.MathUtils.lerp(targetRef.current.x, targetX, 0.08);
    targetRef.current.y = THREE.MathUtils.lerp(targetRef.current.y, targetY, 0.08);
    targetRef.current.z = THREE.MathUtils.lerp(targetRef.current.z, targetZ, 0.08);

    if (eyeRef.current) {
      eyeRef.current.lookAt(targetRef.current);
    }

    if (pointLightRef.current) {
      if (mode === 'cyber') {
        pointLightRef.current.intensity = 6 + Math.sin(time * 8) * 3;
      } else if (mode === 'xray') {
        // Reducido el destello agresivo para no iluminar en exceso la masa trasera
        pointLightRef.current.intensity = 3.5 + Math.cos(time * 6) * 1.5;
      } else {
        pointLightRef.current.intensity = 2;
      }
    }
  });

  const lightColors = {
    normal: { main: '#ffffff', accent: '#00e5ff' },
    cyber: { main: '#ff00aa', accent: '#a855f7' },
    xray: { main: '#00f5a0', accent: '#00b894' }
  };

  const currentColors = lightColors[mode] || lightColors.normal;

  const groupPosition = isMobile ? [0, 0.4, 0] : [1.2, 0, 0];
  const modelScale = isMobile ? 0.036 : 0.045; 

  return (
    <group position={groupPosition}>
      <Float speed={mode === 'cyber' ? 2.5 : 1.8} rotationIntensity={0.08} floatIntensity={0.3}>
        <group ref={eyeRef}>
          <Center>
            <primitive object={clonedScene} scale={modelScale} />
          </Center>
        </group>

        {/* Iluminación atenuada en modo xray para evitar quemar el contorno */}
        <ambientLight intensity={mode === 'xray' ? 0.2 : 2} />
        <directionalLight position={[0, 5, 10]} intensity={mode === 'xray' ? 1.2 : 3.8} color={currentColors.main} />
        
        <pointLight 
          ref={pointLightRef}
          position={[-3, 2, 3]} 
          intensity={mode === 'xray' ? 3.5 : 6} 
          color={currentColors.accent} 
          distance={15}
        />
        
        <pointLight position={[0, 0, 6]} intensity={mode === 'normal' ? 2 : 3} color={currentColors.main} />
      </Float>
    </group>
  );
}

useGLTF.preload('/models/eye.glb');

export default function EyeCanvas3D() {
  const [visionMode, setVisionMode] = useState('normal');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const galaxyConfig = {
    normal: { sparkleColor: '#00e5ff', count: 140, speed: 0.6 },
    cyber: { sparkleColor: '#ff00aa', count: 450, speed: 2.0 },
    xray: { sparkleColor: '#00f5a0', count: 300, speed: 1.8 }
  };

  const activeGalaxy = galaxyConfig[visionMode];

  return (
    <div className="w-full h-full relative overflow-hidden bg-black select-none">
      
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1) translate(0px, 0px); opacity: 0.8; }
          50% { transform: scale(1.15) translate(-20px, 15px); opacity: 1; }
        }
        @keyframes emeraldGlass {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.5; }
          50% { transform: scale(1.08) rotate(6deg); opacity: 0.75; }
        }
        .animate-cyber-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }
        .animate-emerald-glass {
          animation: emeraldGlass 5s ease-in-out infinite;
        }
      `}</style>

      {/* --- FONDO DE AMBIENTE ESMERALDA GLASSMORPHIC --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.pexels.com/photos/18833053/pexels-photo-18833053.jpeg?auto=compress&cs=tinysrgb&w=1920" 
          alt="Galaxy Background" 
          className={`w-full h-full object-cover transition-all duration-700 ${
            visionMode === 'cyber' ? 'hue-rotate-[295deg] saturate-[250%] brightness-110 opacity-70' :
            visionMode === 'xray' ? 'hue-rotate-[135deg] saturate-[140%] brightness-95 opacity-50' :
            'opacity-60 mix-blend-screen'
          }`}
        />

        <div className={`absolute inset-0 transition-opacity duration-700 ${visionMode === 'cyber' ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,_rgba(255,0,170,0.45)_0%,_rgba(168,85,247,0.3)_40%,_transparent_70%)] blur-[90px] animate-cyber-glow" />
        </div>

        {/* Gradiente de fondo en modo Matrix atenuado para no saturar el borde posterior del 3D */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${visionMode === 'xray' ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(0,245,160,0.25)_0%,_rgba(0,184,148,0.12)_40%,_transparent_70%)] blur-[80px] backdrop-blur-3xl animate-emerald-glass" />
          <div className="absolute top-1/3 right-[18%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,_rgba(0,210,255,0.18)_0%,_transparent_65%)] blur-[60px]" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent z-1" />
      </div>

      {/* --- BOTONES DE INTERFAZ --- */}
      <div className="absolute top-20 right-5 sm:right-10 z-30 flex flex-col gap-2 items-end">
        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-1">
          // MODOS DE ENFOQUE
        </span>
        <div className="flex gap-2 bg-black/70 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
          {[
            { id: 'normal', label: 'NEBULA', color: 'hover:text-cyan-400', active: 'bg-cyan-500 text-black shadow-cyan-500/50' },
            { id: 'cyber', label: 'CYBER', color: 'hover:text-fuchsia-400', active: 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-fuchsia-500/60 shadow-lg' },
            { id: 'xray', label: 'MATRIX', color: 'hover:text-emerald-300', active: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-black font-extrabold shadow-emerald-400/50 shadow-lg' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setVisionMode(item.id)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold transition-all duration-300 ${
                visionMode === item.id
                  ? `${item.active} scale-105`
                  : `text-neutral-400 ${item.color} hover:bg-white/10`
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- CANVAS 3D --- */}
      <div className="relative z-10 w-full h-full">
        <Canvas camera={{ position: [0, 0, isMobile ? 9.2 : 8], fov: 45 }}>
          <Stars 
            radius={50} 
            depth={50} 
            count={visionMode === 'normal' ? 2500 : 4000} 
            factor={4} 
            saturation={1} 
            fade 
            speed={activeGalaxy.speed} 
          />

          <Sparkles 
            count={activeGalaxy.count} 
            scale={14} 
            size={visionMode === 'normal' ? 3 : 5.5} 
            speed={activeGalaxy.speed} 
            color={activeGalaxy.sparkleColor} 
          />
          
          <EnergyRing mode={visionMode} isMobile={isMobile} />

          <Suspense fallback={null}>
            <ModelEye mode={visionMode} isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>

    </div>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function ThreeWelcomeSplash() {
  const mountRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if user already saw splash in this session
    const hasSeenSplash = sessionStorage.getItem("hasSeen3DSplash");
    if (hasSeenSplash) {
      setIsVisible(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 🪐 3D Torus Metallic Rings
    const torusGeo = new THREE.TorusGeometry(55, 2.5, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const torusRing1 = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torusRing1);

    const torusGeo2 = new THREE.TorusGeometry(75, 1.8, 16, 100);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const torusRing2 = new THREE.Mesh(torusGeo2, torusMat2);
    scene.add(torusRing2);

    // ✨ 3D Starfield Particle Cloud
    const particleCount = 1000;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 450;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 450;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 450;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 2.5,
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      torusRing1.rotation.x += 0.008;
      torusRing1.rotation.y += 0.012;

      torusRing2.rotation.x -= 0.006;
      torusRing2.rotation.y -= 0.009;

      particles.rotation.y += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    sessionStorage.setItem("hasSeen3DSplash", "true");
    setTimeout(() => {
      setIsVisible(false);
    }, 600);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ${
        isClosing ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* 3D WebGL Canvas Backdrop */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/20 via-indigo-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main 3D Text & Branding Content */}
      <div className="relative z-10 text-center px-4 max-w-xl mx-auto flex flex-col items-center justify-center space-y-6">
        
        {/* Glowing Logo Badge Icon */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center text-white font-black text-3xl sm:text-4xl shadow-2xl shadow-amber-500/30 animate-bounce duration-1000 border border-white/20">
          A
        </div>

        {/* 3D Typography Title */}
        <div>
          <div className="inline-flex items-center gap-1.5 bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs font-black px-3.5 py-1 rounded-full shadow-lg mb-3">
            <Sparkles size={14} className="animate-spin text-amber-400" />
            <span>Official PWA Experience</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-white drop-shadow-2xl">
            WELCOME TO <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">APNABIZ</span>
          </h1>

          {/* 🌟 Signature "by Nishat" 3D Metallic Badge */}
          <div className="mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-indigo-500/20 to-amber-500/20 border border-amber-400/50 px-4 py-1.5 rounded-2xl shadow-xl backdrop-blur-md">
            <Zap size={14} className="text-amber-400 fill-amber-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-black text-amber-300 tracking-wider uppercase font-mono">
              Created by Nishat
            </span>
            <ShieldCheck size={14} className="text-emerald-400" />
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-3 max-w-md mx-auto">
            Odisha & India's #1 Local Search, Hyperlocal Discovery & AI Matchmaker Engine
          </p>
        </div>

        {/* 🚀 Interactive "ENTER APNABIZ" Button */}
        <button
          onClick={handleClose}
          className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black px-8 py-3.5 rounded-2xl text-sm sm:text-base flex items-center gap-2 shadow-2xl shadow-orange-500/30 hover:scale-105 transition-all duration-300 group cursor-pointer animate-pulse"
        >
          <span>ENTER APNABIZ NOW</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

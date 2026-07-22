"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MapPin, Sparkles, Building2, CheckCircle2, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const CITY_PINS = [
  { name: "Bhubaneswar", lat: 20.2961, lon: 85.8245, listings: "14.2k+", category: "Capital Hub", color: "#F59E0B" },
  { name: "Cuttack", lat: 20.4625, lon: 85.8828, listings: "8.5k+", category: "Silver City", color: "#6366F1" },
  { name: "Puri", lat: 19.8135, lon: 85.8312, listings: "6.3k+", category: "Tourism & Stays", color: "#10B981" },
  { name: "Rourkela", lat: 22.2604, lon: 84.8536, listings: "5.1k+", category: "Steel City", color: "#EC4899" },
  { name: "Sambalpur", lat: 21.4669, lon: 83.9812, listings: "4.2k+", category: "Textile & Trade", color: "#3B82F6" },
  { name: "Berhampur", lat: 19.3150, lon: 84.7941, listings: "3.8k+", category: "Commercial Hub", color: "#8B5CF6" },
];

export default function ThreeCityGlobe() {
  const mountRef = useRef(null);
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState(CITY_PINS[0]);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 220;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 🌐 Outer Glowing Sphere Mesh
    const sphereRadius = 75;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const globeSphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(globeSphere);

    // ✨ 3D Particle Cloud
    const particleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = sphereRadius + (Math.random() * 8 - 4);

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 2.2,
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 📍 3D Floating Location Pin Markers
    const pinGroup = new THREE.Group();
    CITY_PINS.forEach((pin, index) => {
      // Map lat/lon to 3D sphere coordinate
      const phi = (90 - pin.lat) * (Math.PI / 180);
      const theta = (pin.lon + 180) * (Math.PI / 180);

      const x = -(sphereRadius + 4) * Math.sin(phi) * Math.cos(theta);
      const y = (sphereRadius + 4) * Math.cos(phi);
      const z = (sphereRadius + 4) * Math.sin(phi) * Math.sin(theta);

      const pinGeo = new THREE.SphereGeometry(3.5, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(pin.color),
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.set(x, y, z);
      pinMesh.userData = pin;
      pinGroup.add(pinMesh);
    });

    scene.add(pinGroup);

    // 💫 Rotation Control variables
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      previousMousePosition = {
        x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
        y: e.clientY || (e.touches && e.touches[0].clientY) || 0,
      };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      globeSphere.rotation.y += deltaX * 0.006;
      particles.rotation.y += deltaX * 0.006;
      pinGroup.rotation.y += deltaX * 0.006;

      globeSphere.rotation.x += deltaY * 0.006;
      particles.rotation.x += deltaY * 0.006;
      pinGroup.rotation.x += deltaY * 0.006;

      previousMousePosition = { x: clientX, y: clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    const el = renderer.domElement;
    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    el.addEventListener("touchstart", onMouseDown, { passive: true });
    window.addEventListener("touchmove", onMouseMove, { passive: true });
    window.addEventListener("touchend", onMouseUp, { passive: true });

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        globeSphere.rotation.y += 0.003;
        particles.rotation.y += 0.003;
        pinGroup.rotation.y += 0.003;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      el.removeEventListener("touchstart", onMouseDown);
      window.removeEventListener("touchmove", onMouseMove);
      window.removeEventListener("touchend", onMouseUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] glass-card rounded-3xl p-4 border border-slate-800 flex flex-col justify-between overflow-hidden shadow-2xl">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0" />

      {/* Top Overlay Badge */}
      <div className="relative z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-800">
          <Sparkles size={14} className="text-amber-400 animate-pulse" />
          <span className="text-xs font-black text-white">Interactive 3D City Radar</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
          Touch & Rotate 3D
        </span>
      </div>

      {/* Bottom Floating City Selector & Card */}
      <div className="relative z-10 space-y-3 pointer-events-auto">
        {/* City Select Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {CITY_PINS.map((city) => (
            <button
              key={city.name}
              onClick={() => setSelectedCity(city)}
              className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border transition-all shrink-0 flex items-center gap-1 ${
                selectedCity.name === city.name
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg scale-105"
                  : "bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700"
              }`}
            >
              <MapPin size={12} style={{ color: selectedCity.name === city.name ? "#090d16" : city.color }} />
              <span>{city.name}</span>
            </button>
          ))}
        </div>

        {/* Selected City Quick Stats Card */}
        <div className="bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-black">
              <Building2 size={20} />
            </div>
            <div>
              <h4 className="text-xs font-black text-white flex items-center gap-1">
                <span>{selectedCity.name}</span>
                <span className="text-[10px] text-slate-400 font-medium">({selectedCity.category})</span>
              </h4>
              <p className="text-[11px] text-emerald-400 font-extrabold mt-0.5 flex items-center gap-1">
                <CheckCircle2 size={12} />
                <span>{selectedCity.listings} Verified Businesses</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push(`/category/restaurants`)}
            className="bg-slate-900 hover:bg-slate-800 text-amber-400 p-2 rounded-xl border border-slate-800 transition-colors shrink-0"
            aria-label="View City Listings"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

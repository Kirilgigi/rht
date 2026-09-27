import React, { useRef, useEffect, useCallback, useState } from 'react';
import { planets, Planet } from '../data/planets';

interface SolarSystemCanvasProps {
  isPlaying: boolean;
  speed: number;
  selectedPlanet: Planet | null;
  onSelectPlanet: (planet: Planet | null) => void;
}

export const SolarSystemCanvas: React.FC<SolarSystemCanvasProps> = ({
  isPlaying,
  speed,
  selectedPlanet,
  onSelectPlanet,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const anglesRef = useRef<number[]>(planets.map(() => Math.random() * Math.PI * 2));
  const animationRef = useRef<number>(0);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 800 });

  const getCenter = useCallback(() => {
    return { x: canvasSize.width / 2, y: canvasSize.height / 2 };
  }, [canvasSize]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const container = canvasRef.current?.parentElement;
      if (container) {
        const size = Math.min(container.clientWidth, container.clientHeight);
        setCanvasSize({ width: size, height: size });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scale orbit radii to fit canvas
  const getScaleFactor = useCallback(() => {
    const maxOrbit = planets[planets.length - 1].orbitRadius;
    const availableRadius = Math.min(canvasSize.width, canvasSize.height) / 2 - 30;
    return availableRadius / maxOrbit;
  }, [canvasSize]);

  // Draw function
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvasSize;
    const center = getCenter();
    const scale = getScaleFactor();

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw star background
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, width, height);

    // Draw stars
    const starSeed = 42;
    for (let i = 0; i < 200; i++) {
      const x = ((starSeed * (i + 1) * 7919) % width);
      const y = ((starSeed * (i + 1) * 6271) % height);
      const size = ((i * 3) % 3) * 0.5 + 0.5;
      const opacity = 0.3 + ((i * 7) % 7) / 10;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
    }

    // Draw orbits
    planets.forEach((planet) => {
      const orbitR = planet.orbitRadius * scale;
      ctx.beginPath();
      ctx.arc(center.x, center.y, orbitR, 0, Math.PI * 2);
      ctx.strokeStyle = selectedPlanet?.name === planet.name
        ? 'rgba(255, 255, 255, 0.4)'
        : 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = selectedPlanet?.name === planet.name ? 1.5 : 0.5;
      ctx.stroke();
    });

    // Draw Sun
    const sunGradient = ctx.createRadialGradient(
      center.x, center.y, 0,
      center.x, center.y, 25 * scale
    );
    sunGradient.addColorStop(0, '#fff7a0');
    sunGradient.addColorStop(0.3, '#ffcc00');
    sunGradient.addColorStop(0.7, '#ff8800');
    sunGradient.addColorStop(1, 'rgba(255, 100, 0, 0)');

    ctx.beginPath();
    ctx.arc(center.x, center.y, 25 * scale, 0, Math.PI * 2);
    ctx.fillStyle = sunGradient;
    ctx.fill();

    // Sun glow
    const glowGradient = ctx.createRadialGradient(
      center.x, center.y, 15 * scale,
      center.x, center.y, 45 * scale
    );
    glowGradient.addColorStop(0, 'rgba(255, 200, 50, 0.3)');
    glowGradient.addColorStop(1, 'rgba(255, 200, 50, 0)');
    ctx.beginPath();
    ctx.arc(center.x, center.y, 45 * scale, 0, Math.PI * 2);
    ctx.fillStyle = glowGradient;
    ctx.fill();

    // Draw planets
    planets.forEach((planet, index) => {
      const angle = anglesRef.current[index];
      const orbitR = planet.orbitRadius * scale;
      const px = center.x + Math.cos(angle) * orbitR;
      const py = center.y + Math.sin(angle) * orbitR;
      const planetRadius = Math.max(planet.radius * scale * 0.8, 3);

      const isHovered = hoveredPlanet === planet.name;
      const isSelected = selectedPlanet?.name === planet.name;

      // Planet glow when selected/hovered
      if (isHovered || isSelected) {
        const glowGrad = ctx.createRadialGradient(px, py, planetRadius, px, py, planetRadius * 3);
        glowGrad.addColorStop(0, planet.color + '60');
        glowGrad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(px, py, planetRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();
      }

      // Planet body
      const planetGrad = ctx.createRadialGradient(
        px - planetRadius * 0.3, py - planetRadius * 0.3, 0,
        px, py, planetRadius
      );
      planetGrad.addColorStop(0, lightenColor(planet.color, 30));
      planetGrad.addColorStop(1, planet.color);

      ctx.beginPath();
      ctx.arc(px, py, planetRadius, 0, Math.PI * 2);
      ctx.fillStyle = planetGrad;
      ctx.fill();

      // Saturn's ring
      if (planet.ringColor) {
        ctx.beginPath();
        ctx.ellipse(px, py, planetRadius * 2, planetRadius * 0.5, -0.3, 0, Math.PI * 2);
        ctx.strokeStyle = planet.ringColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Planet label
      if (isHovered || isSelected) {
        ctx.font = `${Math.max(10, 12 * scale)}px sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(planet.nameRu, px, py - planetRadius - 8);
      }
    });
  }, [canvasSize, getCenter, getScaleFactor, hoveredPlanet, selectedPlanet]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      if (isPlaying) {
        planets.forEach((planet, index) => {
          anglesRef.current[index] += planet.speed * speed;
        });
      }
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, speed, draw]);

  // Mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const center = getCenter();
    const scale = getScaleFactor();

    let found = false;
    planets.forEach((planet, index) => {
      const angle = anglesRef.current[index];
      const orbitR = planet.orbitRadius * scale;
      const px = center.x + Math.cos(angle) * orbitR;
      const py = center.y + Math.sin(angle) * orbitR;
      const planetRadius = Math.max(planet.radius * scale * 0.8, 3);

      const dist = Math.sqrt((mouseX - px) ** 2 + (mouseY - py) ** 2);
      if (dist <= planetRadius + 5) {
        setHoveredPlanet(planet.name);
        canvas.style.cursor = 'pointer';
        found = true;
      }
    });

    if (!found) {
      setHoveredPlanet(null);
      canvas.style.cursor = 'default';
    }
  }, [getCenter, getScaleFactor]);

  // Click handler
  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const center = getCenter();
    const scale = getScaleFactor();

    let clicked: Planet | null = null;
    planets.forEach((planet, index) => {
      const angle = anglesRef.current[index];
      const orbitR = planet.orbitRadius * scale;
      const px = center.x + Math.cos(angle) * orbitR;
      const py = center.y + Math.sin(angle) * orbitR;
      const planetRadius = Math.max(planet.radius * scale * 0.8, 3);

      const dist = Math.sqrt((mouseX - px) ** 2 + (mouseY - py) ** 2);
      if (dist <= planetRadius + 5) {
        clicked = planet;
      }
    });

    onSelectPlanet(clicked);
  }, [getCenter, getScaleFactor, onSelectPlanet]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="rounded-xl shadow-2xl"
    />
  );
};

function lightenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}

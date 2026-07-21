import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

export const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  useEffect(() => {
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const colors = ['#F7A8B8', '#CDB4FF', '#FFE28A', '#A8D8A0', '#FFFFFF'];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Add a couple sparkle particles on movement
      if (Math.random() < 0.6) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          size: Math.random() * 5 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: Math.random() * 20 + 20
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const alpha = 1 - p.life / p.maxLife;
        if (alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;

        // Draw pixel star / diamond sparkle
        ctx.beginPath();
        ctx.rect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 custom-cursor-canvas"
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
      />
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-200 custom-cursor-emoji"
        style={{
          position: 'fixed',
          top: -12,
          left: -12,
          pointerEvents: 'none',
          zIndex: 10000,
          fontSize: '24px'
        }}
      >
        🌸
      </div>
    </>
  );
};

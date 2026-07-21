import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  opacity: number;
}

interface Butterfly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  wingFlap: number;
  color: string;
}

interface Bee {
  x: number;
  y: number;
  angle: number;
  speed: number;
}

interface Props {
  isNight?: boolean;
}

export const ParticleBackground: React.FC<Props> = ({ isNight = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    const isMobile = window.innerWidth < 640;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 1. Sakura Petals
    const petals: Petal[] = Array.from({ length: isMobile ? 12 : 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speedY: Math.random() * 1 + 0.5,
      speedX: Math.random() * 0.6 - 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      size: Math.random() * 8 + 6,
      opacity: Math.random() * 0.5 + 0.5
    }));

    // 2. Butterflies
    const bColors = ['#F7A8B8', '#CDB4FF', '#FFE28A'];
    const butterflies: Butterfly[] = Array.from({ length: isMobile ? 2 : 5 }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.6),
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 0.8,
      wingFlap: Math.random() * Math.PI,
      color: bColors[Math.floor(Math.random() * bColors.length)]
    }));

    // 3. Bees
    const bees: Bee[] = Array.from({ length: isMobile ? 1 : 3 }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.7),
      angle: Math.random() * Math.PI * 2,
      speed: 1.5
    }));

    // 4. Fireflies (for night mode)
    const fireflies = Array.from({ length: isMobile ? 15 : 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      alpha: Math.random(),
      speedAlpha: (Math.random() - 0.5) * 0.03
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render Fireflies in Night mode
      if (isNight) {
        fireflies.forEach(f => {
          f.alpha += f.speedAlpha;
          if (f.alpha <= 0.1 || f.alpha >= 0.9) f.speedAlpha *= -1;

          ctx.save();
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius + 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 235, 120, ${f.alpha * 0.8})`;
          ctx.fill();
          ctx.restore();
        });
      }

      // Render Petals
      petals.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = isNight ? '#CDB4FF' : '#F7A8B8';
        ctx.globalAlpha = p.opacity * 0.75;

        // Pixel Petal Shape
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Render Butterflies (Day mode)
      if (!isNight) {
        butterflies.forEach(b => {
          b.x += b.vx + Math.sin(b.y * 0.02);
          b.y += b.vy;
          b.wingFlap += 0.25;

          if (b.x < -20) b.x = canvas.width + 20;
          if (b.x > canvas.width + 20) b.x = -20;
          if (b.y < 0) b.y = canvas.height * 0.6;
          if (b.y > canvas.height * 0.7) b.y = 50;

          const wingScale = Math.sin(b.wingFlap) * 0.8;

          ctx.save();
          ctx.translate(b.x, b.y);
          ctx.fillStyle = b.color;
          ctx.strokeStyle = '#2F2A2A';
          ctx.lineWidth = 1.5;

          // Left Wing
          ctx.beginPath();
          ctx.ellipse(-4 * Math.abs(wingScale), 0, 8 * Math.abs(wingScale), 5, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Right Wing
          ctx.beginPath();
          ctx.ellipse(4 * Math.abs(wingScale), 0, 8 * Math.abs(wingScale), 5, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Body
          ctx.fillStyle = '#2F2A2A';
          ctx.fillRect(-1.5, -4, 3, 8);
          ctx.restore();
        });

        // Render Bees
        bees.forEach(b => {
          b.angle += (Math.random() - 0.5) * 0.3;
          b.x += Math.cos(b.angle) * b.speed;
          b.y += Math.sin(b.angle) * b.speed;

          if (b.x < 50 || b.x > canvas.width - 50) b.angle += Math.PI;
          if (b.y < 50 || b.y > canvas.height - 100) b.angle += Math.PI;

          ctx.save();
          ctx.translate(b.x, b.y);
          // Yellow Body
          ctx.fillStyle = '#FFE28A';
          ctx.beginPath();
          ctx.ellipse(0, 0, 6, 4, 0, 0, Math.PI * 2);
          ctx.fill();

          // Black Stripes
          ctx.fillStyle = '#2F2A2A';
          ctx.fillRect(-2, -4, 2, 8);
          ctx.fillRect(2, -4, 2, 8);

          // Wings
          ctx.fillStyle = 'rgba(255,255,255,0.7)';
          ctx.beginPath();
          ctx.ellipse(-1, -6, 3, 4, -0.3, 0, Math.PI * 2);
          ctx.ellipse(3, -6, 3, 4, 0.3, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isNight]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
    />
  );
};

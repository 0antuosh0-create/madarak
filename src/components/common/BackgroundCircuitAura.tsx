import React, { useEffect, useRef } from 'react';

interface BackgroundCircuitAuraProps {
  theme?: 'dark' | 'light';
}

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
}

interface PacketSignal {
  sourceIdx: number;
  targetIdx: number;
  progress: number;
  speed: number;
  colorType: 'amber' | 'cyan';
}

export const BackgroundCircuitAura: React.FC<BackgroundCircuitAuraProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 640;
    const nodeCount = isMobile ? 18 : 38;
    const maxDist = isMobile ? 95 : 140;
    const maxDistSq = maxDist * maxDist;
    const maxHopSq = maxDist * 1.6 * (maxDist * 1.6);

    // Generate constellation nodes
    const nodes: NodePoint[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.4),
        vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.4),
        radius: Math.random() * 1.6 + 1.8,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Generate electrical current packets
    const packetCount = isMobile ? 4 : 8;
    const packets: PacketSignal[] = [];
    for (let i = 0; i < packetCount; i++) {
      const src = Math.floor(Math.random() * nodeCount);
      let dst = Math.floor(Math.random() * nodeCount);
      while (dst === src) dst = Math.floor(Math.random() * nodeCount);

      packets.push({
        sourceIdx: src,
        targetIdx: dst,
        progress: Math.random(),
        speed: Math.random() * 0.006 + 0.004,
        colorType: i % 2 === 0 ? 'amber' : 'cyan',
      });
    }

    // Mouse spring interaction
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    let isVisible = !document.hidden;
    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        animId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animId);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    // Color definitions matching shabk with circuit customization (amber & cyan)
    const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');
    const amberPacketColor = isDark ? '#fbbf24' : '#d97706';
    const cyanPacketColor = isDark ? '#38bdf8' : '#0284c7';
    const nodeRingColor = isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(217, 119, 6, 0.15)';

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      // 1. Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // Bounce at boundaries
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Subtle mouse gravitational attraction
        const dx = mouseX - n.x;
        const dy = mouseY - n.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 22500 && distSq > 25) {
          const dist = Math.sqrt(distSq);
          const force = (150 - dist) / 150;
          n.x += (dx / dist) * force * 0.45;
          n.y += (dy / dist) * force * 0.45;
        }

        n.pulsePhase += 0.025;
        const pulse = Math.sin(n.pulsePhase) * 0.5 + 1;

        // Draw node dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(100, 116, 139, 0.22)';
        ctx.fill();

        // Subtle copper annular ring on larger nodes (circuit solder pad)
        if (n.radius > 2.5) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = nodeRingColor;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // 2. Draw connecting topology lines between close nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDist) * (isDark ? 0.12 : 0.08);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${alpha})`
              : `rgba(148, 163, 184, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // 3. Draw Traveling Electrical Current Packets
      for (let i = 0; i < packets.length; i++) {
        const p = packets[i];
        const src = nodes[p.sourceIdx];
        const dst = nodes[p.targetIdx];

        if (src && dst) {
          const dx = dst.x - src.x;
          const dy = dst.y - src.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxHopSq) {
            p.progress += p.speed;
            if (p.progress >= 1) {
              p.progress = 0;
              p.sourceIdx = p.targetIdx;
              p.targetIdx = Math.floor(Math.random() * nodeCount);
            }

            const px = src.x + dx * p.progress;
            const py = src.y + dy * p.progress;

            ctx.beginPath();
            ctx.arc(px, py, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = p.colorType === 'amber' ? amberPacketColor : cyanPacketColor;
            ctx.shadowBlur = 6;
            ctx.shadowColor = p.colorType === 'amber' ? amberPacketColor : cyanPacketColor;
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            p.targetIdx = Math.floor(Math.random() * nodeCount);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20 dark:opacity-15 transition-opacity duration-500"
      style={{
        maskImage: 'radial-gradient(ellipse 70% 65% at 50% 45%, transparent 20%, black 85%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at 50% 45%, transparent 20%, black 85%)'
      }}
      aria-hidden="true"
    />
  );
};

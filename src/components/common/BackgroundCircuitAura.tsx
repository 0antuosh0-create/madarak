import React, { useEffect, useRef } from 'react';

interface BackgroundCircuitAuraProps {
  theme?: 'dark' | 'light';
}

interface ViaPoint {
  x: number;
  y: number;
  radius: number;
  connections: number[];
  isPad: boolean;
  pulsePhase: number;
}

interface CircuitTrace {
  points: { x: number; y: number }[];
  currentOffset: number;
  speed: number;
  colorType: 'amber' | 'cyan';
}

interface SchematicGlyph {
  x: number;
  y: number;
  type: 'resistor' | 'capacitor' | 'inductor' | 'ground' | 'opamp' | 'source';
  scale: number;
  opacity: number;
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
    let isDark = theme === 'dark' || document.documentElement.classList.contains('dark');

    // 1. Generate Orthogonal PCB Bus Traces
    const traces: CircuitTrace[] = [];
    const vias: ViaPoint[] = [];

    const traceCount = isMobile ? 8 : 16;
    for (let i = 0; i < traceCount; i++) {
      // Start near border
      let startX = i % 2 === 0 ? (i / traceCount) * width : (Math.random() < 0.5 ? 20 : width - 20);
      let startY = i % 2 === 1 ? (i / traceCount) * height : (Math.random() < 0.5 ? 20 : height - 20);

      const pts: { x: number; y: number }[] = [{ x: startX, y: startY }];
      let cx = startX;
      let cy = startY;

      const segments = Math.floor(Math.random() * 3) + 3;
      for (let s = 0; s < segments; s++) {
        // Orthogonal 90 deg or 45 deg step
        const dir = Math.random() < 0.5 ? 'h' : 'v';
        const dist = (Math.random() * 80 + 40) * (Math.random() < 0.5 ? 1 : -1);

        if (dir === 'h') {
          cx = Math.max(10, Math.min(width - 10, cx + dist));
          pts.push({ x: cx, y: cy });
          // optional 45 deg chamfer bend
          if (Math.random() < 0.4) {
            const chamfer = 15;
            cx = Math.max(10, Math.min(width - 10, cx + (dist > 0 ? chamfer : -chamfer)));
            cy = Math.max(10, Math.min(height - 10, cy + (Math.random() < 0.5 ? chamfer : -chamfer)));
            pts.push({ x: cx, y: cy });
          }
        } else {
          cy = Math.max(10, Math.min(height - 10, cy + dist));
          pts.push({ x: cx, y: cy });
        }
      }

      traces.push({
        points: pts,
        currentOffset: Math.random(),
        speed: Math.random() * 0.003 + 0.002,
        colorType: i % 2 === 0 ? 'amber' : 'cyan',
      });

      // Add vias at start, bends, and ends
      pts.forEach((p, pIdx) => {
        vias.push({
          x: p.x,
          y: p.y,
          radius: pIdx === 0 || pIdx === pts.length - 1 ? 3.5 : 2.2,
          connections: [],
          isPad: pIdx === 0 || pIdx === pts.length - 1,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      });
    }

    // 2. Generate Watermarked Schematic Glyphs in Periphery
    const glyphs: SchematicGlyph[] = [
      { x: 70, y: 120, type: 'opamp', scale: 1.1, opacity: 0.12 },
      { x: width - 80, y: 140, type: 'inductor', scale: 1.0, opacity: 0.14 },
      { x: 90, y: height - 140, type: 'capacitor', scale: 1.0, opacity: 0.12 },
      { x: width - 90, y: height - 160, type: 'ground', scale: 1.2, opacity: 0.15 },
      { x: width * 0.2, y: 40, type: 'resistor', scale: 1.0, opacity: 0.10 },
      { x: width * 0.8, y: 50, type: 'source', scale: 1.0, opacity: 0.11 },
    ];

    // Mouse Interaction
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
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      isDark = document.documentElement.classList.contains('dark');
    };

    let isVisible = !document.hidden;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    let wavePhase = 0;

    // Drawing helper for schematic symbols
    const drawGlyph = (g: SchematicGlyph) => {
      ctx.save();
      ctx.translate(g.x, g.y);
      ctx.scale(g.scale, g.scale);
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = isDark
        ? `rgba(251, 191, 36, ${g.opacity})`
        : `rgba(180, 83, 9, ${g.opacity * 0.9})`;

      if (g.type === 'ground') {
        ctx.beginPath();
        ctx.moveTo(0, -14);
        ctx.lineTo(0, 0);
        ctx.moveTo(-16, 0);
        ctx.lineTo(16, 0);
        ctx.moveTo(-10, 6);
        ctx.lineTo(10, 6);
        ctx.moveTo(-4, 12);
        ctx.lineTo(4, 12);
        ctx.stroke();
      } else if (g.type === 'resistor') {
        ctx.beginPath();
        ctx.moveTo(-25, 0);
        ctx.lineTo(-15, 0);
        ctx.lineTo(-10, -8);
        ctx.lineTo(-2, 8);
        ctx.lineTo(6, -8);
        ctx.lineTo(14, 8);
        ctx.lineTo(18, 0);
        ctx.lineTo(28, 0);
        ctx.stroke();
      } else if (g.type === 'capacitor') {
        ctx.beginPath();
        ctx.moveTo(-22, 0);
        ctx.lineTo(-6, 0);
        ctx.moveTo(-6, -14);
        ctx.lineTo(-6, 14);
        ctx.moveTo(6, -14);
        ctx.lineTo(6, 14);
        ctx.moveTo(6, 0);
        ctx.lineTo(22, 0);
        ctx.stroke();
      } else if (g.type === 'inductor') {
        ctx.beginPath();
        ctx.moveTo(-24, 0);
        ctx.lineTo(-16, 0);
        ctx.arc(-10, 0, 6, Math.PI, 0, false);
        ctx.arc(2, 0, 6, Math.PI, 0, false);
        ctx.arc(14, 0, 6, Math.PI, 0, false);
        ctx.lineTo(22, 0);
        ctx.stroke();
      } else if (g.type === 'opamp') {
        ctx.beginPath();
        ctx.moveTo(-16, -16);
        ctx.lineTo(16, 0);
        ctx.lineTo(-16, 16);
        ctx.closePath();
        ctx.stroke();
        // + and - signs
        ctx.fillStyle = ctx.strokeStyle;
        ctx.font = '10px monospace';
        ctx.fillText('-', -12, -4);
        ctx.fillText('+', -12, 10);
      } else if (g.type === 'source') {
        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.stroke();
        // sine wave inside
        ctx.beginPath();
        ctx.moveTo(-8, 0);
        ctx.bezierCurveTo(-4, -6, 0, -6, 0, 0);
        ctx.bezierCurveTo(0, 6, 4, 6, 8, 0);
        ctx.stroke();
      }

      ctx.restore();
    };

    // Render loop
    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      wavePhase += 0.015;

      // 1. Draw Subtle Oscilloscope Sine Wave at Top & Bottom Margins
      const waveAlpha = isDark ? 0.045 : 0.035;
      ctx.beginPath();
      for (let x = 0; x < width; x += 15) {
        const y = 30 + Math.sin(x * 0.008 + wavePhase) * 16 + Math.cos(x * 0.003 - wavePhase * 0.5) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = isDark ? `rgba(56, 189, 248, ${waveAlpha})` : `rgba(2, 132, 199, ${waveAlpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      for (let x = 0; x < width; x += 15) {
        const y = height - 30 + Math.sin(x * 0.009 - wavePhase * 0.8) * 14;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = isDark ? `rgba(251, 191, 36, ${waveAlpha})` : `rgba(217, 119, 6, ${waveAlpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 2. Draw Schematic Glyphs
      glyphs.forEach((g) => drawGlyph(g));

      // 3. Draw Orthogonal PCB Traces
      traces.forEach((t) => {
        if (t.points.length < 2) return;

        // Trace line
        ctx.beginPath();
        ctx.moveTo(t.points[0].x, t.points[0].y);
        for (let p = 1; p < t.points.length; p++) {
          ctx.lineTo(t.points[p].x, t.points[p].y);
        }

        const traceBaseAlpha = isDark ? 0.06 : 0.05;
        ctx.strokeStyle = isDark
          ? t.colorType === 'amber'
            ? `rgba(251, 191, 36, ${traceBaseAlpha})`
            : `rgba(56, 189, 248, ${traceBaseAlpha})`
          : t.colorType === 'amber'
          ? `rgba(217, 119, 6, ${traceBaseAlpha})`
          : `rgba(14, 165, 233, ${traceBaseAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // 4. Draw Gliding Current Packets along Trace Segments
        t.currentOffset += t.speed;
        if (t.currentOffset > 1) t.currentOffset = 0;

        // Calculate position along multi-segment polyline
        const totalSegs = t.points.length - 1;
        const targetSeg = Math.min(totalSegs - 1, Math.floor(t.currentOffset * totalSegs));
        const segProgress = (t.currentOffset * totalSegs) - targetSeg;

        const p1 = t.points[targetSeg];
        const p2 = t.points[targetSeg + 1];
        if (p1 && p2) {
          const px = p1.x + (p2.x - p1.x) * segProgress;
          const py = p1.y + (p2.y - p1.y) * segProgress;

          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          const packetColor = isDark
            ? t.colorType === 'amber' ? '#fbbf24' : '#38bdf8'
            : t.colorType === 'amber' ? '#d97706' : '#0284c7';
          ctx.fillStyle = packetColor;
          ctx.shadowBlur = isDark ? 8 : 4;
          ctx.shadowColor = packetColor;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 5. Draw Vias and Solder Pads with Concentric Rings
      vias.forEach((v) => {
        v.pulsePhase += 0.02;
        const pulse = Math.sin(v.pulsePhase) * 0.3 + 1;

        // Mouse hover interaction: highlight nearby vias
        const dx = mouseX - v.x;
        const dy = mouseY - v.y;
        const distSq = dx * dx + dy * dy;
        const isNearMouse = distSq < 15000;

        ctx.beginPath();
        ctx.arc(v.x, v.y, (v.isPad ? 3.5 : 2.0) * (isNearMouse ? 1.4 : pulse), 0, Math.PI * 2);
        ctx.fillStyle = isNearMouse
          ? (isDark ? '#fbbf24' : '#d97706')
          : (isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(100, 116, 139, 0.18)');
        ctx.fill();

        // Copper annular ring on pads
        if (v.isPad) {
          ctx.beginPath();
          ctx.arc(v.x, v.y, 6.0, 0, Math.PI * 2);
          ctx.strokeStyle = isDark ? 'rgba(251, 191, 36, 0.18)' : 'rgba(217, 119, 6, 0.14)';
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      });

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
      className="fixed inset-0 pointer-events-none z-0 opacity-70 dark:opacity-60 transition-opacity duration-500"
      style={{
        maskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 20%, black 85%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 20%, black 85%)',
      }}
      aria-hidden="true"
    />
  );
};

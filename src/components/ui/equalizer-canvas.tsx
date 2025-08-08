import { useEffect, useRef } from 'react';

// Equalizer Canvas Component
export function EqualizerCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const barsRef = useRef<
    { height: number; targetHeight: number; speed: number }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const barCount = 40;
    let barWidth = 0;

    // Set canvas size based on container
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';

      // Recalculate bar dimensions
      barWidth = rect.width / barCount;

      // Reinitialize bars if they don't exist or count changed
      if (barsRef.current.length === 0) {
        barsRef.current = Array.from({ length: barCount }, () => ({
          height: Math.random() * 28 + 8,
          targetHeight: Math.random() * 28 + 8,
          speed: Math.random() * 0.3 + 0.1,
        }));
      }
    };

    resizeCanvas();

    // Animation function
    const animate = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      barsRef.current.forEach((bar, index) => {
        // Update height towards target
        const diff = bar.targetHeight - bar.height;
        bar.height += diff * bar.speed;

        // Set new target when close enough
        if (Math.abs(diff) < 0.5) {
          bar.targetHeight = Math.random() * 32 + 6;
          bar.speed = Math.random() * 0.3 + 0.1;
        }

        // Draw bar
        const x = index * barWidth;
        const barHeight = Math.max(bar.height, 3);
        const y = rect.height - barHeight;

        // Create gradient with new color and transparency
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, 'hsla(162, 95.8%, 50%, 0.3)'); // 70% opacity
        gradient.addColorStop(0.7, 'hsla(162, 85%, 45%, 0.2)'); // 60% opacity
        gradient.addColorStop(1, 'hsla(162, 75%, 40%, 0.1)'); // 50% opacity

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth * 0.8, barHeight);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize with ResizeObserver for better performance
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    resizeObserver.observe(container);

    // Fallback resize listener
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className='absolute bottom-0 left-0 w-full h-8 pointer-events-none'
    >
      <canvas
        ref={canvasRef}
        className='w-full h-full'
        style={{ borderRadius: '0 0 8px 8px' }}
      />
    </div>
  );
}

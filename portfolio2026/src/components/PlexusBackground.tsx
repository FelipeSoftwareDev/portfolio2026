import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
}

const PlexusBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles - reduce count on mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 10 : 100;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }
    particlesRef.current = particles;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mouse interaction - attract particles
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          particle.vx += (dx / distance) * force * 0.05;
          particle.vy += (dy / distance) * force * 0.05;
        } else {
          // Return to original position when mouse is far
          const dxOrigin = particle.originX - particle.x;
          const dyOrigin = particle.originY - particle.y;
          const distanceToOrigin = Math.sqrt(dxOrigin * dxOrigin + dyOrigin * dyOrigin);

          if (distanceToOrigin > 1) {
            const returnForce = 0.02;
            particle.vx += (dxOrigin / distanceToOrigin) * returnForce;
            particle.vy += (dyOrigin / distanceToOrigin) * returnForce;
          }
        }

        // Apply friction
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Draw particle
        const distanceToMouse = Math.sqrt(
          Math.pow(mouse.x - particle.x, 2) + Math.pow(mouse.y - particle.y, 2)
        );
        const glowIntensity = Math.max(0, 1 - distanceToMouse / 300);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);

        // Create gradient for glow effect
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 3
        );
        gradient.addColorStop(0, `rgba(255, 165, 0, ${0.8 + glowIntensity * 0.2})`);
        gradient.addColorStop(0.5, `rgba(255, 140, 0, ${0.4 + glowIntensity * 0.4})`);
        gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw lines to nearby particles
        particles.forEach((otherParticle, j) => {
          if (i === j) return;

          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxLineDistance = 150;

          if (distance < maxLineDistance) {
            const opacity = (1 - distance / maxLineDistance) * 0.5;

            // Check if either particle is near mouse
            const particle1ToMouse = Math.sqrt(
              Math.pow(mouse.x - particle.x, 2) + Math.pow(mouse.y - particle.y, 2)
            );
            const particle2ToMouse = Math.sqrt(
              Math.pow(mouse.x - otherParticle.x, 2) + Math.pow(mouse.y - otherParticle.y, 2)
            );
            const nearMouse = Math.min(particle1ToMouse, particle2ToMouse) < 200;

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);

            if (nearMouse) {
              const mouseProximity = 1 - Math.min(particle1ToMouse, particle2ToMouse) / 200;
              ctx.strokeStyle = `rgba(255, ${140 + mouseProximity * 50}, 0, ${opacity + mouseProximity * 0.3})`;
              ctx.lineWidth = 0.5 + mouseProximity * 0.5;
            } else {
              ctx.strokeStyle = `rgba(255, 140, 0, ${opacity})`;
              ctx.lineWidth = 0.3;
            }

            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          background: '#000',
        }}
      />
      {/* Fade-out gradient at bottom */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '200px',
          background: 'linear-gradient(to bottom, transparent, #000)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
    </>
  );
};

export default PlexusBackground;

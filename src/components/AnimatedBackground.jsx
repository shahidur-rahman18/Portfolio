import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Enhanced particles array with connection system
    const particles = [];
    const particleCount = 80; // Reduced for better performance with connections
    const connectionDistance = 120; // Distance for particle connections
    const maxConnections = 3; // Maximum connections per particle

    // Check if dark mode is active
    const isDarkMode = document.documentElement.classList.contains('dark');

    // Create particles with better properties
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.4,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        color: isDarkMode ? 'rgba(255, 255, 255, ' : 'rgba(14, 165, 233, ',
        connections: []
      });
    }

    // Function to calculate distance between two particles
    const getDistance = (p1, p2) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    // Function to draw connections between particles
    const drawConnections = () => {
      // Clear previous connections
      particles.forEach(particle => {
        particle.connections = [];
      });

      // Find connections for each particle
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        
        for (let j = i + 1; j < particles.length; j++) {
          const otherParticle = particles[j];
          const distance = getDistance(particle, otherParticle);
          
          if (distance < connectionDistance && 
              particle.connections.length < maxConnections && 
              otherParticle.connections.length < maxConnections) {
            
            particle.connections.push(otherParticle);
            otherParticle.connections.push(particle);
            
            // Draw connection line
            const opacity = (1 - distance / connectionDistance) * 0.3;
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(14, 165, 233, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      // Clear canvas completely
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        // Update position with smoother movement
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Update pulse
        particle.pulse += particle.pulseSpeed;

        // Smooth edge wrapping
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

        // Calculate pulsing opacity
        const pulsingOpacity = particle.opacity + Math.sin(particle.pulse) * 0.2;

        // Draw particle with enhanced visibility
        ctx.save();
        
        // Outer glow for better visibility
        ctx.globalAlpha = pulsingOpacity * 0.8;
        ctx.shadowColor = particle.color + '0.6)';
        ctx.shadowBlur = 8;
        ctx.fillStyle = particle.color + pulsingOpacity + ')';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 1.2, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner bright core
        ctx.shadowBlur = 0;
        ctx.globalAlpha = pulsingOpacity;
        ctx.fillStyle = particle.color + (pulsingOpacity * 1.2) + ')';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });

      // Draw connections between particles
      drawConnections();

      animationId = requestAnimationFrame(animate);
    };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize
    resizeCanvas();
    animate();

    // Handle resize
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particles-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        background: 'transparent'
      }}
    />
  );
};

export default AnimatedBackground;
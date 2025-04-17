import { useRef, useState, ReactNode, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glareEnabled?: boolean;
  glareMaxOpacity?: number;
  glareColor?: string;
  scale?: number;
  perspective?: number;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  trackOnWindow?: boolean;
  gyroscope?: boolean;
}

export function TiltCard({
  children,
  className,
  glareEnabled = true,
  glareMaxOpacity = 0.2,
  glareColor = "rgba(255, 255, 255, 0.4)",
  scale = 1.05,
  perspective = 1000,
  tiltMaxAngleX = 15,
  tiltMaxAngleY = 15,
  trackOnWindow = false,
  gyroscope = false,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-300, 300], [tiltMaxAngleX, -tiltMaxAngleX]);
  const rotateY = useTransform(x, [-300, 300], [-tiltMaxAngleY, tiltMaxAngleY]);

  // Smooth springs for rotation
  const springConfig = { damping: 20, stiffness: 200 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  // Glare effect position
  const glareX = useTransform(x, [-300, 300], [80, 0]);
  const glareY = useTransform(y, [-300, 300], [80, 0]);
  const glareOpacity = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !hover) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Get mouse position relative to card
    const mouseX = trackOnWindow 
      ? e.clientX 
      : e.clientX - rect.left - rect.width / 2;
      
    const mouseY = trackOnWindow
      ? e.clientY
      : e.clientY - rect.top - rect.height / 2;

    x.set(mouseX);
    y.set(mouseY);
    
    if (glareEnabled) {
      glareOpacity.set(glareMaxOpacity);
    }
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
    x.set(0);
    y.set(0);
    if (glareEnabled) {
      glareOpacity.set(0);
    }
  };

  // Handle device orientation for mobile devices
  useEffect(() => {
    if (!gyroscope || typeof window === "undefined" || !window.DeviceOrientationEvent) {
      return;
    }

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (!hover || !event.gamma || !event.beta) return;
      
      const gamma = event.gamma; // Left/right tilt [-90, 90]
      const beta = event.beta;   // Front/back tilt [0, 180]
      
      // Normalize to our range
      const normalizedGamma = (gamma / 45) * tiltMaxAngleY;
      const normalizedBeta = ((beta - 90) / 45) * tiltMaxAngleX;
      
      x.set(normalizedGamma * 10);
      y.set(normalizedBeta * 10);
    };

    window.addEventListener("deviceorientation", handleOrientation);
    
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [gyroscope, hover, tiltMaxAngleX, tiltMaxAngleY, x, y]);

  return (
    <motion.div 
      ref={cardRef}
      className={cn("relative overflow-hidden", className)}
      style={{
        transformStyle: "preserve-3d",
        transformPerspective: perspective,
        rotateX: hover ? rotateXSpring : 0,
        rotateY: hover ? rotateYSpring : 0,
      }}
      whileHover={{ scale }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {glareEnabled && (
        <motion.div 
          className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-br from-transparent via-white to-transparent"
          style={{
            opacity: glareOpacity,
            backgroundPosition: `${glareX}% ${glareY}%`,
            mixBlendMode: "overlay"
          }}
        />
      )}
    </motion.div>
  );
} 
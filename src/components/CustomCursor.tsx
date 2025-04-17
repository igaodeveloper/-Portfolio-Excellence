import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState('default');
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setCursorVariant('hover');
    const handleMouseLeave = () => setCursorVariant('default');
    const handleMouseDown = () => setCursorVariant('click');
    const handleMouseUp = () => setCursorVariant('default');

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, select, textarea'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Add custom-cursor class to body
    document.body.classList.add('custom-cursor');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });

      // Remove custom-cursor class from body
      document.body.classList.remove('custom-cursor');
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="cursor-outer fixed pointer-events-none z-50"
        animate={cursorVariant}
        variants={{
          default: {
            height: 32,
            width: 32,
            backgroundColor: 'rgba(0, 210, 223, 0.2)',
            border: '1px solid rgba(0, 210, 223, 0.4)',
            scale: 1,
          },
          hover: {
            height: 48,
            width: 48,
            backgroundColor: 'rgba(0, 210, 223, 0.3)',
            border: '2px solid rgba(0, 210, 223, 0.6)',
            scale: 1.2,
          },
          click: {
            height: 24,
            width: 24,
            backgroundColor: 'rgba(0, 210, 223, 0.5)',
            border: '2px solid rgba(0, 210, 223, 0.8)',
            scale: 0.8,
          },
        }}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          top: -16,
          left: -16,
          borderRadius: '50%',
          mixBlendMode: 'difference',
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
        }}
      />
      <motion.div
        className="cursor-inner fixed pointer-events-none z-50"
        style={{
          x: cursorX,
          y: cursorY,
          top: -3,
          left: -3,
          width: 6,
          height: 6,
          backgroundColor: 'rgba(0, 210, 223, 1)',
          borderRadius: '50%',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
} 
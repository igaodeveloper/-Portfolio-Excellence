import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);
  const magneticElementRef = useRef<Element | null>(null);
  
  // Usando useMotionValue para melhor performance
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Adicionar springs para movimento mais suave
  const springConfig = { damping: 25, stiffness: 300, mass: 0.2 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  // Função otimizada para atualizar a posição do mouse
  const updateMousePosition = useCallback((e: MouseEvent) => {
    // Se estiver em modo magnético, aplicar a atração
    if (isMagnetic && magneticElementRef.current) {
      const element = magneticElementRef.current;
      const rect = element.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;
      
      // Calcular a distância entre o cursor e o centro do elemento
      const distanceX = elementCenterX - e.clientX;
      const distanceY = elementCenterY - e.clientY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Efeito magnético apenas se estiver próximo o suficiente
      if (distance < 100) {
        // A força magnética diminui com a distância
        const strength = 0.45; // Ajustar conforme necessário
        const magneticForceX = distanceX * strength;
        const magneticForceY = distanceY * strength;
        
        // Aplicar a força magnética
        cursorX.set(e.clientX + magneticForceX);
        cursorY.set(e.clientY + magneticForceY);
        return;
      }
    }
    
    // Comportamento padrão quando não estiver em modo magnético
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY, isMagnetic]);

  // Funções otimizadas com useCallback
  const handleMouseDown = useCallback(() => setCursorVariant("click"), []);
  const handleMouseUp = useCallback(() => setCursorVariant("default"), []);
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    // Verificar se estamos no navegador
    if (typeof window === "undefined") return;
    
    // Verificar se é dispositivo móvel
    if (window.matchMedia("(max-width: 768px)").matches) return;
    
    // Esconder o cursor nativo
    document.body.style.cursor = "none";
    
    // Tornar visível após um pequeno delay para evitar flashes
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Alterar cursor ao passar sobre links e botões
    const addCursorHoverEvents = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"]), .interactive'
      );
      
      interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => {
          setCursorVariant("hover");
          setIsMagnetic(true);
          magneticElementRef.current = el;
        });
        
        el.addEventListener("mouseleave", () => {
          setCursorVariant("default");
          setIsMagnetic(false);
          magneticElementRef.current = null;
        });
      });
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    // Adiciona eventos após algum tempo para garantir que todos os elementos estejam carregados
    addCursorHoverEvents();
    const elementsTimeout = setTimeout(addCursorHoverEvents, 1000);
    
    // Observer para monitorar mudanças no DOM e atualizar eventos
    const observer = new MutationObserver((mutations) => {
      // Verifica se as mutações incluem adição de nós que precisamos monitorar
      const shouldUpdate = mutations.some(mutation => 
        Array.from(mutation.addedNodes).some(node => 
          node.nodeType === 1 && 
          (node as Element).matches?.('a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"]), .interactive')
        )
      );
      
      if (shouldUpdate) {
        addCursorHoverEvents();
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timeout);
      clearTimeout(elementsTimeout);
      observer.disconnect();
    };
  }, [updateMousePosition, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave]);

  // Não renderizar em dispositivos móveis ou se não estiver visível
  if (!isVisible) {
    return null;
  }

  return (
    <>
      <motion.div
        className="cursor-main fixed top-0 left-0 z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          width: cursorVariant === "default" ? 24 : cursorVariant === "hover" ? 40 : 20,
          height: cursorVariant === "default" ? 24 : cursorVariant === "hover" ? 40 : 20,
          opacity: cursorVariant === "default" ? 0.8 : 1,
          backgroundColor: cursorVariant === "default" 
            ? "rgba(0, 210, 223, 0.2)" 
            : cursorVariant === "hover" 
              ? "rgba(0, 210, 223, 0.4)" 
              : "rgba(255, 255, 255, 0.8)",
          mixBlendMode: "difference",
          borderRadius: "50%",
          border: cursorVariant === "default" 
            ? "1px solid rgba(255, 255, 255, 0.6)" 
            : cursorVariant === "hover" 
              ? "1px solid rgba(255, 255, 255, 0.8)" 
              : "1px solid rgba(0, 210, 223, 0.9)",
          boxShadow: cursorVariant === "default" 
            ? "0 0 10px rgba(0, 210, 223, 0.1)" 
            : cursorVariant === "hover" 
              ? "0 0 15px rgba(0, 210, 223, 0.2)" 
              : "0 0 8px rgba(0, 210, 223, 0.4)",
          scale: cursorVariant === "click" ? 0.9 : 1,
        }}
        transition={{
          type: "spring",
          damping: 22,
          stiffness: 350,
          mass: 0.2,
          restDelta: 0.001,
        }}
      />
      <motion.div
        className="cursor-dot fixed top-0 left-0 z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          width: 4,
          height: 4,
          opacity: cursorVariant === "hover" ? 0 : 0.9,
          backgroundColor: "rgba(0, 210, 223, 0.9)",
          borderRadius: "50%",
          boxShadow: cursorVariant === "default" 
            ? "0 0 5px rgba(0, 210, 223, 0.3)" 
            : "0 0 8px rgba(0, 210, 223, 0.5)",
          scale: cursorVariant === "hover" ? 0 : cursorVariant === "click" ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 400,
          mass: 0.15,
          restDelta: 0.001,
        }}
      />
    </>
  );
} 
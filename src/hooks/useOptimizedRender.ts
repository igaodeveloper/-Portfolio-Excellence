import { useEffect, useRef, DependencyList, useState } from 'react';

/**
 * Hook para otimizar a renderização de componentes usando requestAnimationFrame e throttling
 *
 * @param callback A função a ser executada de forma otimizada
 * @param deps Lista de dependências que disparam a execução da callback
 * @param throttleMs Tempo mínimo entre execuções (em ms)
 * @returns Um objeto com o estado de renderização
 */
export function useOptimizedRender<T>(
  callback: () => T,
  deps: DependencyList = [],
  throttleMs: number = 16, // ~60fps
) {
  const [result, setResult] = useState<T | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const lastRun = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Função que executa a callback dentro de um requestAnimationFrame
    const executeCallback = () => {
      const now = Date.now();

      // Verificar se passou tempo suficiente desde a última execução (throttling)
      if (now - lastRun.current >= throttleMs) {
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }

        // Executar a callback dentro de um requestAnimationFrame para sincronizar com o próximo frame
        rafIdRef.current = requestAnimationFrame(() => {
          try {
            setIsRunning(true);
            const value = callback();
            setResult(value);
            lastRun.current = Date.now();
          } catch (err) {
            console.error('Error in optimized render callback:', err);
          } finally {
            setIsRunning(false);
            rafIdRef.current = null;
          }
        });
      } else if (!timeoutIdRef.current) {
        // Se não passou tempo suficiente, agendar para executar mais tarde
        const delay = throttleMs - (now - lastRun.current);
        timeoutIdRef.current = setTimeout(() => {
          timeoutIdRef.current = null;
          executeCallback();
        }, delay);
      }
    };

    // Executar callback quando as dependências mudarem
    executeCallback();

    // Limpeza quando o componente for desmontado
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return { result, isRunning };
}

/**
 * Hook para limitar a frequência de execução de uma função
 *
 * @param callback A função a ser executada com throttling
 * @param delay O delay em ms entre execuções
 * @returns A função com throttling aplicado
 */
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const lastCall = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastArgsRef = useRef<Parameters<T> | null>(null);

  // Limpar timeout na desmontagem
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (...args: Parameters<T>) => {
    const now = Date.now();
    lastArgsRef.current = args;

    // Se a última chamada foi há mais tempo que o delay, executar imediatamente
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    } else if (!timeoutRef.current) {
      // Caso contrário, agendar para executar após o delay
      const remaining = delay - (now - lastCall.current);
      timeoutRef.current = setTimeout(() => {
        if (lastArgsRef.current) {
          lastCall.current = Date.now();
          callback(...lastArgsRef.current);
        }
        timeoutRef.current = null;
      }, remaining);
    }
  };
}

/**
 * Hook para detectar quando um elemento está visível na viewport
 * Otimizado com Intersection Observer API
 *
 * @param options Opções de configuração para o Intersection Observer
 * @returns Um objeto com ref e um boolean indicando visibilidade
 */
export function useVisibilityObserver(
  options: {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
  } = {},
) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<Element | null>(null);
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = false } = options;

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Atualizar estado quando a visibilidade mudar
        const visible = entry.isIntersecting;
        setIsVisible(visible);

        // Se triggerOnce=true e o elemento já está visível, parar de observar
        if (triggerOnce && visible && currentRef) {
          observer.unobserve(currentRef);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

/**
 * Hook para medir o desempenho de renderização de um componente
 *
 * @param componentName Nome do componente a ser medido
 * @param enabled Ativar/desativar medição
 */
export function useRenderPerformance(
  componentName: string,
  enabled: boolean = true,
) {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(performance.now());

  useEffect(() => {
    if (!enabled) return;

    renderCount.current += 1;
    const now = performance.now();
    const timeSinceLastRender = now - lastRenderTime.current;

    console.log(
      `%c[${componentName}] Render #${renderCount.current} (+${timeSinceLastRender.toFixed(2)}ms)`,
      'color: #3498db;',
    );

    lastRenderTime.current = now;
  });
}

export default useOptimizedRender;

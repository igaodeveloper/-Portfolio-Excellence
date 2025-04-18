import { useState, useEffect, useRef, ImgHTMLAttributes } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  width?: number;
  height?: number;
  className?: string;
  loadingClassName?: string;
  loadedClassName?: string;
  threshold?: number;
  instantLoad?: boolean;
  blurhash?: string;
}

const LazyImage = ({
  src,
  alt,
  placeholderSrc,
  width,
  height,
  className = '',
  loadingClassName = 'image-loading',
  loadedClassName = 'image-loaded',
  threshold = 0.1,
  instantLoad = false,
  blurhash,
  ...rest
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc || '');
  const imageRef = useRef<HTMLImageElement>(null);

  // Configurar IntersectionObserver com o hook
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  // Combinar refs
  const setRefs = (element: HTMLImageElement | null) => {
    ref(element);
    imageRef.current = element;
  };

  // Carregar a imagem quando estiver em view ou se instantLoad for true
  useEffect(() => {
    if (instantLoad || inView) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoaded(true);
      };

      // Aplicar dicas ao navegador para otimizar o carregamento
      if (imageRef.current) {
        if ('fetchPriority' in imageRef.current) {
          (imageRef.current as any).fetchPriority = instantLoad
            ? 'high'
            : 'auto';
        }
        if ('loading' in imageRef.current) {
          imageRef.current.loading = instantLoad ? 'eager' : 'lazy';
        }
        if ('decoding' in imageRef.current) {
          imageRef.current.decoding = 'async';
        }
      }
    }
  }, [src, inView, instantLoad]);

  // Definir classes dinâmicas
  const imageClasses = `${className} ${isLoaded ? loadedClassName : loadingClassName}`;

  // Aplicar dimensões corretas para evitar layout shift
  const aspectRatio =
    width && height ? { aspectRatio: `${width} / ${height}` } : {};

  // Renderizar o blurhash como fallback se fornecido
  let blurStyle = {};
  if (blurhash && !isLoaded) {
    blurStyle = {
      backgroundImage: `url(${blurhash})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(20px)',
    };
  }

  return (
    <img
      ref={setRefs}
      src={currentSrc || placeholderSrc}
      alt={alt}
      width={width}
      height={height}
      style={{
        ...aspectRatio,
        ...blurStyle,
      }}
      className={imageClasses}
      {...rest}
    />
  );
};

export default LazyImage;

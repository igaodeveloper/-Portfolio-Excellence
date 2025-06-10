import { useEffect } from 'react';
import LazyImage from './LazyImage';

interface AdsenseBannerProps {
  dataAdClient: string;
  dataAdSlot: string;
  style?: React.CSSProperties;
  format?: string;
}

export function AdsenseBanner({ dataAdClient, dataAdSlot, style, format = 'auto' }: AdsenseBannerProps) {
  useEffect(() => {
    if (window) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);

  return (
    <ins
      className="adsbygoogle max-w-full w-full h-auto block"
      style={style || { display: 'block' }}
      data-ad-client={dataAdClient}
      data-ad-slot={dataAdSlot}
      data-ad-format={format}
      data-full-width-responsive="true"
    ></ins>
  );
}

export function CustomPartnerBanner({ imageUrl, link, alt }: { imageUrl: string; link: string; alt?: string }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <LazyImage src={imageUrl} alt={alt || 'Parceiro'} style={{ minWidth: 320, minHeight: 100, borderRadius: 8 }} />
    </a>
  );
} 
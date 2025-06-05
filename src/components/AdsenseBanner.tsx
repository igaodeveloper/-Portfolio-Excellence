import { useEffect } from 'react';

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
      className="adsbygoogle"
      style={style || { display: 'block' }}
      data-ad-client={dataAdClient}
      data-ad-slot={dataAdSlot}
      data-ad-format={format}
      data-full-width-responsive="true"
    ></ins>
  );
} 
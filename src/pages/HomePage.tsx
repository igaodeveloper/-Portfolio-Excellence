import React from 'react';
import ServicesSection from '../components/ServicesSection';
import { Badges } from '../components/Badges';
import DigitalProductsSection from '../components/DigitalProductsSection';
import { AdsenseBanner, CustomPartnerBanner } from '../components/AdsenseBanner';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 px-2 sm:px-4 md:px-8">
      {/* Serviços */}
      <ServicesSection />

      {/* Produtos Digitais */}
      <DigitalProductsSection />

      {/* Afiliados/Parcerias */}
      <section className="container-section px-0 sm:px-2 md:px-4">
        <h2 className="mb-6 section-title text-modern-white">Afiliados & Parcerias</h2>
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
          {/* Banner Google AdSense */}
          <AdsenseBanner dataAdClient="ca-pub-xxxxxxxxxxxxxxxx" dataAdSlot="1234567890" style={{ minWidth: 320, minHeight: 100 }} />
          {/* Banner Customizado de Parceiro */}
          <CustomPartnerBanner imageUrl="https://www.hostinger.com/cdn-cgi/image/width=600,height=200,quality=90,format=auto/uploads/images/affiliates/hostinger-affiliate-banner.png" link="https://www.hostinger.com/affiliates" alt="Hostinger Afiliado" />
        </div>
        {/* Recomendações de Ferramentas */}
        <div className="p-6 mt-8 border rounded-lg bg-modern-darker border-modern-accent/10">
          <h3 className="mb-4 text-lg font-bold text-modern-accent">Ferramentas Recomendadas</h3>
          <ul className="flex flex-col gap-2">
            <li><a href="https://www.hostinger.com/affiliates" target="_blank" rel="noopener noreferrer" className="underline text-modern-accent">Hospedagem Hostinger (Afiliado)</a></li>
            <li><a href="https://www.canva.com/affiliates/" target="_blank" rel="noopener noreferrer" className="underline text-modern-accent">Design com Canva (Afiliado)</a></li>
            <li><a href="https://associados.amazon.com.br/" target="_blank" rel="noopener noreferrer" className="underline text-modern-accent">Produtos Amazon (Afiliado)</a></li>
            <li><a href="https://affiliate.notion.so/" target="_blank" rel="noopener noreferrer" className="underline text-modern-accent">Organização com Notion (Afiliado)</a></li>
            <li><a href="https://elementor.com/affiliates/" target="_blank" rel="noopener noreferrer" className="underline text-modern-accent">Sites com Elementor (Afiliado)</a></li>
          </ul>
        </div>
      </section>

      {/* Gamificação */}
      <section className="container-section px-0 sm:px-2 md:px-4">
        <h2 className="mb-6 section-title text-modern-white">Conquistas & Badges</h2>
        <Badges />
      </section>
    </div>
  );
};

export default HomePage;

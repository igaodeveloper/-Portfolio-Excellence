import React from 'react';
import ServicesSection from '../components/ServicesSection';
import { Badges } from '../components/Badges';
import DigitalProductsSection from '../components/DigitalProductsSection';
import { AdsenseBanner, CustomPartnerBanner } from '../components/AdsenseBanner';
import { AnimatedCharacters, AnimatedWords } from '../components/ui/animated-text';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12 px-2 sm:gap-16 sm:px-4 md:px-8">
      {/* Seção de Apresentação Animada */}
      <section className="flex flex-col items-center justify-between gap-8 py-12 md:flex-row md:py-20">
        <div className="flex flex-col items-start flex-1 gap-6">
          <AnimatedCharacters
            text="Olá, eu sou [Seu Nome]!"
            className="mb-2 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl"
            type="heading"
            staggerChildren={0.06}
            delayOffset={0.2}
          />
          <AnimatedWords
            text="Desenvolvedor Full Stack, apaixonado por criar experiências digitais incríveis. Veja meus projetos, artigos e conquistas!"
            className="max-w-xl mb-4 text-lg sm:text-xl text-modern-gray"
            delayOffset={0.5}
          />
          <a
            href="/projects"
            className="inline-block px-6 py-3 mt-2 font-semibold text-white transition-colors rounded-lg shadow-lg bg-modern-accent hover:bg-modern-accent/90"
          >
            Ver Projetos
          </a>
        </div>
        {/* Espaço para imagem/avatar ilustrativa */}
        <div className="flex items-center justify-center flex-1">
          <img
            src="/assets/avatars/avatar-hero.png"
            alt="Avatar de apresentação"
            className="object-cover w-48 h-48 border-4 rounded-full shadow-2xl md:w-64 md:h-64 border-modern-accent"
            style={{ background: '#222' }}
          />
        </div>
      </section>
      {/* Serviços */}
      <ServicesSection />

      {/* Produtos Digitais */}
      <DigitalProductsSection />

      {/* Afiliados/Parcerias */}
      <section className="px-0 container-section sm:px-2 md:px-4">
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
      <section className="px-0 container-section sm:px-2 md:px-4">
        <h2 className="mb-6 section-title text-modern-white">Conquistas & Badges</h2>
        <Badges />
      </section>
    </div>
  );
};

export default HomePage;

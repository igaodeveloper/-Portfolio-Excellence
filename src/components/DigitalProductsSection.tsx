import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedTitle } from '@/components/ui/animated-text';
import { fadeIn, staggerContainer } from '@/lib/animations';

const products = [
  {
    id: 1,
    title: 'Template Portfólio Moderno',
    description: 'Template responsivo para portfólio, pronto para personalizar e usar.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    link: 'https://seuproduto.com/template',
    type: 'Template',
  },
  {
    id: 2,
    title: 'E-book: Carreira em Front-end',
    description: 'Guia completo para iniciar e evoluir na carreira de front-end.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80',
    link: 'https://seuproduto.com/ebook',
    type: 'E-book',
  },
  {
    id: 3,
    title: 'Curso: React do Zero ao Avançado',
    description: 'Curso online completo de React, com projetos práticos e certificado.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    link: 'https://seuproduto.com/curso',
    type: 'Curso',
  },
];

const DigitalProductsSection = () => (
  <section className="py-20 px-6 bg-modern-dark relative overflow-hidden">
    <div className="container-section relative z-10">
      <AnimatedTitle text="Produtos Digitais" className="section-title text-modern-white mb-12" />
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            variants={fadeIn('up', index * 0.1)}
            className="card-hover bg-modern-darker rounded-lg p-6 border border-modern-accent/10 group relative overflow-hidden"
          >
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded mb-4" />
            <h3 className="text-xl font-bold text-modern-white mb-2">{product.title}</h3>
            <p className="text-modern-gray mb-4">{product.description}</p>
            <span className="inline-block mb-2 px-3 py-1 bg-modern-accent text-white rounded-full text-xs">{product.type}</span>
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-modern-accent text-white rounded hover:bg-modern-accent2 transition"
            >
              Comprar / Baixar
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default DigitalProductsSection; 
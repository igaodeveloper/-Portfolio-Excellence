import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from "@/components/ui/resizable";
import { 
  ChevronDown, 
  LayoutPanelLeft, 
  Code2, 
  FileCode, 
  FileType, 
  FileCog, 
  Play, 
  RotateCcw, 
  Maximize, 
  Save,
  Settings,
  Search,
  MoreHorizontal,
  Terminal,
  Download,
  Upload,
  Copy,
  Share2,
  AlertTriangle,
  Trash2
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const defaultHTMLCode = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Startup Moderna</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
  <header class="hero">
    <nav class="navbar">
      <div class="container">
        <div class="logo">
          <span class="logo-icon"><i class="fas fa-rocket"></i></span>
          <span class="logo-text">Startup</span>
        </div>
        <div class="nav-toggle" id="navToggle">
          <span></span><span></span><span></span>
        </div>
        <ul class="nav-links">
          <li><a href="#recursos">Recursos</a></li>
          <li><a href="#como-funciona">Como Funciona</a></li>
          <li><a href="#precos">Preços</a></li>
          <li><a href="#depoimentos">Depoimentos</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
        <div class="nav-buttons">
          <a href="#login" class="login-btn">Login</a>
          <a href="#trial" class="cta-button">Teste Grátis</a>
        </div>
      </div>
    </nav>
    
    <div class="hero-content container">
      <div class="hero-text">
        <h1>Transforme Suas Ideias em Realidade</h1>
        <p class="hero-description">Plataforma completa para startups e empreendedores que querem escalar seus negócios de forma rápida e eficiente com as melhores ferramentas do mercado.</p>
        <div class="hero-cta">
          <a href="#demo" class="primary-button">Demonstração <i class="fas fa-arrow-right"></i></a>
          <a href="#saiba-mais" class="secondary-button">Saiba Mais</a>
        </div>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-number">30k+</span>
            <span class="stat-label">Usuários Ativos</span>
          </div>
          <div class="stat">
            <span class="stat-number">95%</span>
            <span class="stat-label">Satisfação</span>
          </div>
          <div class="stat">
            <span class="stat-number">24/7</span>
            <span class="stat-label">Suporte</span>
          </div>
        </div>
      </div>
      <div class="hero-image">
        <img src="https://via.placeholder.com/600x400/3490dc/ffffff?text=Dashboard" alt="Dashboard da Plataforma">
        <div class="hero-badge">Novo <span>v2.0</span></div>
      </div>
    </div>
    
    <div class="hero-clients container">
      <p>Empresas que confiam em nós:</p>
      <div class="client-logos">
        <div class="client-logo">
          <i class="fab fa-google"></i>
          <span>Google</span>
        </div>
        <div class="client-logo">
          <i class="fab fa-microsoft"></i>
          <span>Microsoft</span>
        </div>
        <div class="client-logo">
          <i class="fab fa-amazon"></i>
          <span>Amazon</span>
        </div>
        <div class="client-logo">
          <i class="fab fa-spotify"></i>
          <span>Spotify</span>
        </div>
        <div class="client-logo">
          <i class="fab fa-slack"></i>
          <span>Slack</span>
        </div>
      </div>
    </div>
  </header>

  <main>
    <!-- Seção Recursos -->
    <section id="recursos" class="section-recursos">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Recursos</span>
          <h2>Tudo que você precisa para crescer</h2>
          <p>Ferramentas projetadas para impulsionar o crescimento do seu negócio e otimizar seus processos internos.</p>
        </div>
        
        <div class="features">
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <h3>Analytics Avançado</h3>
            <p>Insights detalhados e análises em tempo real para tomar decisões baseadas em dados.</p>
            <a href="#" class="feature-link">Saiba mais <i class="fas fa-chevron-right"></i></a>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-users"></i>
            </div>
            <h3>CRM Integrado</h3>
            <p>Gerencie seus clientes e vendas em uma única plataforma centralizada.</p>
            <a href="#" class="feature-link">Saiba mais <i class="fas fa-chevron-right"></i></a>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-robot"></i>
            </div>
            <h3>Automação Inteligente</h3>
            <p>Automatize tarefas repetitivas e foque no que realmente importa para o seu negócio.</p>
            <a href="#" class="feature-link">Saiba mais <i class="fas fa-chevron-right"></i></a>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h3>Segurança de Dados</h3>
            <p>Proteção de nível empresarial para todos os seus dados e informações sensíveis.</p>
            <a href="#" class="feature-link">Saiba mais <i class="fas fa-chevron-right"></i></a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Seção Como Funciona -->
    <section id="como-funciona" class="section-how">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Como Funciona</span>
          <h2>Três passos simples para começar</h2>
          <p>Comece a usar nosso produto em minutos e veja resultados imediatos para o seu negócio.</p>
        </div>
        
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3>Crie sua conta</h3>
            <p>Cadastre-se gratuitamente e configure seu perfil em menos de 2 minutos.</p>
          </div>
          
          <div class="step">
            <div class="step-number">2</div>
            <h3>Personalize a plataforma</h3>
            <p>Adapte as ferramentas às necessidades específicas do seu negócio.</p>
          </div>
          
          <div class="step">
            <div class="step-number">3</div>
            <h3>Escale seus resultados</h3>
            <p>Utilize nossos recursos avançados para crescer e expandir seu alcance.</p>
          </div>
        </div>
        
        <div class="how-image">
          <img src="https://via.placeholder.com/1200x600/38b2ac/ffffff?text=Plataforma+em+Ação" alt="Demonstração da plataforma">
        </div>
      </div>
    </section>

    <!-- Seção Preços -->
    <section id="precos" class="section-pricing">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Preços</span>
          <h2>Planos para empresas de todos os tamanhos</h2>
          <p>Escolha o plano ideal para suas necessidades atuais e escale conforme seu crescimento.</p>
        </div>
        
        <div class="pricing-toggle">
          <span>Mensalmente</span>
          <label class="switch">
            <input type="checkbox" id="pricingToggle">
            <span class="slider"></span>
          </label>
          <span>Anualmente <span class="save-badge">Economize 20%</span></span>
        </div>
        
        <div class="pricing-cards">
          <div class="pricing-card">
            <div class="pricing-header">
              <h3>Starter</h3>
              <div class="pricing">
                <span class="price">R$49</span>
                <span class="period">/mês</span>
              </div>
              <p>Perfeito para freelancers e profissionais autônomos</p>
            </div>
            <div class="pricing-features">
              <ul>
                <li><i class="fas fa-check"></i> Até 3 projetos</li>
                <li><i class="fas fa-check"></i> 10GB de armazenamento</li>
                <li><i class="fas fa-check"></i> Analytics básico</li>
                <li><i class="fas fa-check"></i> Suporte por email</li>
                <li class="disabled"><i class="fas fa-times"></i> API access</li>
                <li class="disabled"><i class="fas fa-times"></i> Customização avançada</li>
              </ul>
            </div>
            <div class="pricing-action">
              <a href="#" class="btn-secondary">Começar Trial</a>
            </div>
          </div>
          
          <div class="pricing-card popular">
            <div class="popular-badge">Mais Popular</div>
            <div class="pricing-header">
              <h3>Professional</h3>
              <div class="pricing">
                <span class="price">R$99</span>
                <span class="period">/mês</span>
              </div>
              <p>Ideal para pequenas empresas e equipes</p>
            </div>
            <div class="pricing-features">
              <ul>
                <li><i class="fas fa-check"></i> Até 10 projetos</li>
                <li><i class="fas fa-check"></i> 50GB de armazenamento</li>
                <li><i class="fas fa-check"></i> Analytics avançado</li>
                <li><i class="fas fa-check"></i> Suporte prioritário</li>
                <li><i class="fas fa-check"></i> API access</li>
                <li class="disabled"><i class="fas fa-times"></i> Customização avançada</li>
              </ul>
            </div>
            <div class="pricing-action">
              <a href="#" class="btn-primary">Começar Agora</a>
            </div>
          </div>
          
          <div class="pricing-card">
            <div class="pricing-header">
              <h3>Enterprise</h3>
              <div class="pricing">
                <span class="price">R$249</span>
                <span class="period">/mês</span>
              </div>
              <p>Para empresas de médio e grande porte</p>
            </div>
            <div class="pricing-features">
              <ul>
                <li><i class="fas fa-check"></i> Projetos ilimitados</li>
                <li><i class="fas fa-check"></i> 500GB de armazenamento</li>
                <li><i class="fas fa-check"></i> Analytics premium</li>
                <li><i class="fas fa-check"></i> Suporte 24/7</li>
                <li><i class="fas fa-check"></i> API access</li>
                <li><i class="fas fa-check"></i> Customização avançada</li>
              </ul>
            </div>
            <div class="pricing-action">
              <a href="#" class="btn-secondary">Fale com Vendas</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Seção Depoimentos -->
    <section id="depoimentos" class="section-testimonials">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Depoimentos</span>
          <h2>O que nossos clientes dizem</h2>
          <p>Histórias reais de empresas que transformaram seus negócios com nossa plataforma.</p>
        </div>
        
        <div class="testimonials">
          <div class="testimonial-card">
            <div class="testimonial-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <p class="testimonial-text">"Implementamos a plataforma há 6 meses e já vimos um aumento de 45% em nossa produtividade. A automação de processos nos permitiu focar no crescimento estratégico."</p>
            <div class="testimonial-author">
              <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="Ana Silveira">
              <div>
                <h4>Ana Silveira</h4>
                <p>CEO, TechSolutions</p>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card">
            <div class="testimonial-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <p class="testimonial-text">"A facilidade de uso e a qualidade do suporte técnico nos surpreenderam. Conseguimos integrar com nossos sistemas existentes sem problemas. Recomendo fortemente."</p>
            <div class="testimonial-author">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Carlos Mendes">
              <div>
                <h4>Carlos Mendes</h4>
                <p>CTO, Inovação Digital</p>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card">
            <div class="testimonial-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
            </div>
            <p class="testimonial-text">"As ferramentas de analytics nos deram insights valiosos sobre nosso público, o que nos permitiu ajustar nossa estratégia e aumentar as conversões em 37%."</p>
            <div class="testimonial-author">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Mariana Costa">
              <div>
                <h4>Mariana Costa</h4>
                <p>CMO, Growth Marketing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Seção FAQ -->
    <section id="faq" class="section-faq">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">FAQ</span>
          <h2>Perguntas Frequentes</h2>
          <p>Encontre respostas para as dúvidas mais comuns sobre nossa plataforma.</p>
        </div>
        
        <div class="faq-list">
          <div class="faq-item">
            <div class="faq-question">
              <h3>Quanto tempo leva para implementar a plataforma?</h3>
              <span class="faq-icon"><i class="fas fa-plus"></i></span>
            </div>
            <div class="faq-answer">
              <p>A implementação básica pode ser feita em menos de um dia. Para integrações mais complexas com sistemas existentes, nosso time de suporte oferece assistência especializada, e o processo completo geralmente leva de 3 a 5 dias úteis.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question">
              <h3>Posso cancelar minha assinatura a qualquer momento?</h3>
              <span class="faq-icon"><i class="fas fa-plus"></i></span>
            </div>
            <div class="faq-answer">
              <p>Sim, não exigimos contratos de longo prazo. Você pode cancelar sua assinatura a qualquer momento sem taxas ou penalidades.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question">
              <h3>A plataforma oferece suporte em português?</h3>
              <span class="faq-icon"><i class="fas fa-plus"></i></span>
            </div>
            <div class="faq-answer">
              <p>Sim, nossa plataforma e suporte técnico estão disponíveis em português, inglês e espanhol, com planos de expansão para outros idiomas em breve.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question">
              <h3>Como funciona o período de teste gratuito?</h3>
              <span class="faq-icon"><i class="fas fa-plus"></i></span>
            </div>
            <div class="faq-answer">
              <p>Oferecemos um período de teste gratuito de 14 dias com acesso a todos os recursos do plano Professional. Não é necessário cartão de crédito para começar, e você receberá um lembrete antes do término do período de teste.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Seção Call to Action -->
    <section class="section-cta">
      <div class="container">
        <div class="cta-content">
          <h2>Pronto para transformar seu negócio?</h2>
          <p>Junte-se a milhares de empresas que já estão crescendo com nossa plataforma.</p>
          <div class="cta-buttons">
            <a href="#" class="btn-primary">Começar Agora</a>
            <a href="#" class="btn-outline">Agendar Demo <i class="fas fa-calendar-alt"></i></a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="logo">
            <span class="logo-icon"><i class="fas fa-rocket"></i></span>
            <span class="logo-text">Startup</span>
          </div>
          <p>Transformando ideias em negócios de sucesso com tecnologia de ponta e soluções inovadoras.</p>
          <div class="social-links">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
        
        <div class="footer-links">
          <div class="footer-links-column">
            <h3>Produto</h3>
            <ul>
              <li><a href="#">Recursos</a></li>
              <li><a href="#">Preços</a></li>
              <li><a href="#">Casos de Uso</a></li>
              <li><a href="#">Integrações</a></li>
              <li><a href="#">API</a></li>
            </ul>
          </div>
          
          <div class="footer-links-column">
            <h3>Empresa</h3>
            <ul>
              <li><a href="#">Sobre Nós</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Carreiras</a></li>
              <li><a href="#">Parceiros</a></li>
              <li><a href="#">Imprensa</a></li>
            </ul>
          </div>
          
          <div class="footer-links-column">
            <h3>Recursos</h3>
            <ul>
              <li><a href="#">Documentação</a></li>
              <li><a href="#">Tutoriais</a></li>
              <li><a href="#">Suporte</a></li>
              <li><a href="#">Webinars</a></li>
              <li><a href="#">E-books</a></li>
            </ul>
          </div>
          
          <div class="footer-links-column">
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Termos de Serviço</a></li>
              <li><a href="#">Privacidade</a></li>
              <li><a href="#">Cookies</a></li>
              <li><a href="#">Compliance</a></li>
              <li><a href="#">Segurança</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2023 Startup. Todos os direitos reservados.</p>
        <div class="footer-legal">
          <a href="#">Termos</a>
          <a href="#">Privacidade</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>`;

const defaultCSSCode = `/* Variáveis e Configurações Globais */
:root {
  --primary-color: #4361ee;
  --primary-dark: #3a56d4;
  --secondary-color: #7209b7;
  --accent-color: #4cc9f0;
  --success-color: #34d399;
  --warning-color: #fbbf24;
  --danger-color: #ef4444;
  --background-color: #ffffff;
  --dark-background: #f8fafc;
  --text-color: #1e293b;
  --text-light: #64748b;
  --border-color: #e2e8f0;
  --heading-font: 'Inter', 'Segoe UI', Roboto, sans-serif;
  --body-font: 'Inter', 'Segoe UI', Roboto, sans-serif;
  --border-radius: 8px;
  --transition: all 0.3s ease;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --max-width: 1200px;
}

/* Reset e Regras Globais */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: var(--body-font);
  color: var(--text-color);
  line-height: 1.6;
  background-color: var(--background-color);
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--heading-font);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--text-color);
}

p {
  margin-bottom: 1rem;
  color: var(--text-light);
}

a {
  text-decoration: none;
  color: var(--primary-color);
  transition: var(--transition);
}

a:hover {
  color: var(--primary-dark);
}

ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: var(--border-radius);
}

.container {
  width: 100%;
  max-width: var(--max-width);
  padding: 0 1.5rem;
  margin: 0 auto;
}

section {
  padding: 5rem 0;
}

/* Utilitários */
.text-center {
  text-align: center;
}

.text-gradient {
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Componentes de Layout */
.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
}

.section-header h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.section-header p {
  font-size: 1.1rem;
  color: var(--text-light);
}

.section-badge {
  display: inline-block;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Header e Navegação */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: var(--shadow-sm);
  padding: 1rem 0;
  transition: var(--transition);
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-color);
}

.logo-icon {
  margin-right: 0.5rem;
  color: var(--secondary-color);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: var(--text-color);
  font-weight: 500;
  position: relative;
}

.nav-links a:hover {
  color: var(--primary-color);
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: var(--transition);
}

.nav-links a:hover::after {
  width: 100%;
}

.nav-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.login-btn {
  color: var(--text-color);
  font-weight: 600;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
}

.nav-toggle span {
  display: block;
  height: 3px;
  width: 100%;
  background-color: var(--text-color);
  border-radius: 3px;
  transition: var(--transition);
}

/* Seção Hero */
.hero {
  position: relative;
  background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,250,251,0.95) 100%), url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80') no-repeat center/cover;
  padding: 10rem 0 5rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
}

.hero-text {
  flex: 1;
}

.hero-text h1 {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: var(--text-light);
}

.hero-cta {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.hero-image {
  flex: 1;
  position: relative;
}

.hero-image img {
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg);
  transform: perspective(1000px) rotateY(-15deg) rotateX(5deg) rotateZ(-1deg);
  transition: var(--transition);
}

.hero-image img:hover {
  transform: perspective(1000px) rotateY(-5deg) rotateX(2deg) rotateZ(0deg);
}

.hero-badge {
  position: absolute;
  top: -15px;
  right: -15px;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 700;
  box-shadow: var(--shadow-md);
}

.hero-badge span {
  font-weight: 400;
  opacity: 0.8;
  margin-left: 0.25rem;
}

.hero-stats {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-light);
}

.hero-clients {
  margin-top: 4rem;
  text-align: center;
}

.hero-clients p {
  font-size: 0.875rem;
  color: var(--text-light);
  margin-bottom: 1.5rem;
}

.client-logos {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 3rem;
}

.client-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-light);
  opacity: 0.7;
  transition: var(--transition);
}

.client-logo:hover {
  opacity: 1;
  transform: translateY(-5px);
}

.client-logo i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.client-logo span {
  font-size: 0.75rem;
}

/* Botões */
.primary-button, .secondary-button, .btn-primary, .btn-secondary, .btn-outline, .cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  transition: var(--transition);
  cursor: pointer;
  font-size: 1rem;
  gap: 0.5rem;
}

.primary-button, .btn-primary {
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  box-shadow: var(--shadow-md);
}

.primary-button:hover, .btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  color: white;
}

.secondary-button, .btn-secondary {
  background-color: white;
  color: var(--primary-color);
  border: 2px solid var(--border-color);
}

.secondary-button:hover, .btn-secondary:hover {
  border-color: var(--primary-color);
  transform: translateY(-3px);
}

.btn-outline {
  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-outline:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-3px);
}

.cta-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.cta-button:hover {
  background-color: var(--primary-dark);
  transform: translateY(-3px);
}

/* Seção Recursos */
.section-recursos {
  background-color: var(--dark-background);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: white;
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
  transition: var(--transition);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg);
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.feature-link {
  display: inline-flex;
  align-items: center;
  margin-top: 1rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.feature-link i {
  font-size: 0.75rem;
  margin-left: 0.25rem;
  transition: var(--transition);
}

.feature-link:hover i {
  transform: translateX(3px);
}

/* Seção Como Funciona */
.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.step {
  text-align: center;
  padding: 2rem;
  position: relative;
}

.step::after {
  content: '';
  position: absolute;
  top: 40px;
  right: -10px;
  width: 20px;
  height: 20px;
  border-top: 2px dashed var(--primary-color);
  border-right: 2px dashed var(--primary-color);
}

.step:last-child::after {
  display: none;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1.5rem;
}

.how-image {
  margin-top: 3rem;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

/* Seção de Preços */
.section-pricing {
  background-color: var(--background-color);
}

.pricing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
  font-weight: 500;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
  margin: 0 1rem;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--primary-color);
}

input:checked + .slider:before {
  transform: translateX(30px);
}

.save-badge {
  display: inline-block;
  background-color: var(--success-color);
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  margin-left: 0.5rem;
  vertical-align: middle;
  font-weight: 600;
}

.pricing-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.pricing-card {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: var(--transition);
  border: 1px solid var(--border-color);
  position: relative;
}

.pricing-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg);
}

.pricing-card.popular {
  transform: scale(1.05);
  border-color: var(--primary-color);
  z-index: 1;
}

.pricing-card.popular:hover {
  transform: scale(1.05) translateY(-10px);
}

.popular-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-bottom-left-radius: var(--border-radius);
}

.pricing-header {
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid var(--border-color);
}

.pricing-header h3 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.pricing {
  margin-bottom: 1rem;
}

.price {
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary-color);
}

.period {
  font-size: 1rem;
  color: var(--text-light);
}

.pricing-features {
  padding: 2rem;
}

.pricing-features ul {
  margin-bottom: 2rem;
}

.pricing-features li {
  padding: 0.75rem 0;
  display: flex;
  align-items: center;
  color: var(--text-color);
}

.pricing-features li i {
  margin-right: 1rem;
  color: var(--success-color);
}

.pricing-features li.disabled {
  color: var(--text-light);
  text-decoration: line-through;
}

.pricing-features li.disabled i {
  color: var(--text-light);
}

.pricing-action {
  padding: 0 2rem 2rem;
  text-align: center;
}

/* Seção Depoimentos */
.section-testimonials {
  background-color: var(--dark-background);
}

.testimonials {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg);
}

.testimonial-rating {
  color: #ffc107;
  margin-bottom: 1rem;
}

.testimonial-text {
  font-style: italic;
  margin-bottom: 1.5rem;
  position: relative;
}

.testimonial-text::before {
  content: '"';
  font-size: 4rem;
  position: absolute;
  top: -2rem;
  left: -1rem;
  color: rgba(0,0,0,0.05);
  font-family: Georgia, serif;
}

.testimonial-author {
  display: flex;
  align-items: center;
}

.testimonial-author img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
  object-fit: cover;
}

.testimonial-author h4 {
  margin-bottom: 0.25rem;
  font-size: 1rem;
}

.testimonial-author p {
  margin-bottom: 0;
  font-size: 0.875rem;
  color: var(--text-light);
}

/* Seção FAQ */
.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  margin-bottom: 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
  background-color: white;
  transition: var(--transition);
}

.faq-question:hover {
  background-color: rgba(67, 97, 238, 0.05);
}

.faq-question h3 {
  margin-bottom: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.faq-icon {
  color: var(--primary-color);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  display: none;
}

.faq-item.active .faq-question {
  background-color: rgba(67, 97, 238, 0.05);
}

.faq-item.active .faq-answer {
  display: block;
}

.faq-item.active .faq-icon i {
  transform: rotate(45deg);
}

/* Seção Call to Action */
.section-cta {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  text-align: center;
  padding: 5rem 0;
}

.cta-content h2 {
  color: white;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-content p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.section-cta .btn-primary {
  background-color: white;
  color: var(--primary-color);
}

.section-cta .btn-outline {
  background-color: transparent;
  color: white;
  border-color: white;
}

.section-cta .btn-outline:hover {
  background-color: white;
  color: var(--primary-color);
}

/* Footer */
.footer {
  background-color: var(--text-color);
  color: white;
  padding: 5rem 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.footer-brand p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transition: var(--transition);
}

.social-links a:hover {
  background-color: var(--primary-color);
  transform: translateY(-3px);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.footer-links-column h3 {
  color: white;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

.footer-links-column ul li {
  margin-bottom: 0.75rem;
}

.footer-links-column ul li a {
  color: rgba(255, 255, 255, 0.7);
  transition: var(--transition);
}

.footer-links-column ul li a:hover {
  color: white;
  padding-left: 5px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0;
  font-size: 0.875rem;
}

.footer-legal {
  display: flex;
  gap: 1.5rem;
}

.footer-legal a {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
}

.footer-legal a:hover {
  color: white;
}

/* Media Queries */
@media (max-width: 992px) {
  html {
    font-size: 15px;
  }
  
  .hero-content {
    flex-direction: column;
  }
  
  .hero-image {
    margin-top: 2rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
  }
  
  .nav-links, .nav-buttons {
    display: none;
  }
  
  .nav-links.active {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: white;
    padding: 1rem 0;
    box-shadow: var(--shadow-md);
    text-align: center;
  }
  
  .nav-buttons.active {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem 0;
  }
  
  .hero-text h1 {
    font-size: 2.5rem;
  }
  
  .hero-cta {
    flex-direction: column;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .pricing-cards {
    grid-template-columns: 1fr;
  }
  
  .pricing-card.popular {
    transform: scale(1);
  }
  
  .pricing-card.popular:hover {
    transform: translateY(-10px);
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
}

@media (max-width: 576px) {
  html {
    font-size: 14px;
  }
  
  .hero {
    padding: 8rem 0 4rem;
  }
  
  .features, .steps, .testimonials {
    grid-template-columns: 1fr;
  }
  
  .footer-links {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
  }
}
`;

const defaultJSCode = `// DOM Elements
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const navButtons = document.querySelector('.nav-buttons');
const navbar = document.querySelector('.navbar');
const faqItems = document.querySelectorAll('.faq-item');
const pricingToggle = document.getElementById('pricingToggle');
const pricingCards = document.querySelectorAll('.pricing-card');
const yearlyPrices = ['R$39', 'R$79', 'R$199'];
const monthlyPrices = ['R$49', 'R$99', 'R$249'];

// Initialize AOS animation library (if available)
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
}

// Mobile Navigation Toggle
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    navButtons.classList.toggle('active');
  });
}

// Navbar Scroll Effect
function handleScroll() {
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
}

window.addEventListener('scroll', handleScroll);

// Initialize scrolled state on page load
handleScroll();

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navButtons.classList.remove('active');
      }
      
      // Smooth scroll to target
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Account for fixed navbar
        behavior: 'smooth'
      });
    }
  });
});

// FAQ Accordion
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    // Toggle current item
    item.classList.toggle('active');
    
    // Close other items
    faqItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        otherItem.classList.remove('active');
      }
    });
    
    // Change icon
    const icon = question.querySelector('.faq-icon i');
    if (item.classList.contains('active')) {
      icon.className = 'fas fa-minus';
    } else {
      icon.className = 'fas fa-plus';
    }
  });
});

// Pricing Toggle
if (pricingToggle) {
  pricingToggle.addEventListener('change', () => {
    const isYearly = pricingToggle.checked;
    
    pricingCards.forEach((card, index) => {
      const priceElement = card.querySelector('.price');
      if (priceElement) {
        // Apply animation
        priceElement.classList.add('price-change');
        
        // Update price after a small delay for animation
        setTimeout(() => {
          priceElement.textContent = isYearly ? yearlyPrices[index] : monthlyPrices[index];
          priceElement.classList.remove('price-change');
        }, 200);
      }
    });
  });
}

// Testimonial Carousel/Slider functionality
class TestimonialSlider {
  constructor(sliderSelector = '.testimonials') {
    this.slider = document.querySelector(sliderSelector);
    this.testimonials = this.slider ? Array.from(this.slider.children) : [];
    this.currentIndex = 0;
    this.autoplayInterval = null;
    
    if (this.testimonials.length > 3 && window.innerWidth > 992) {
      this.initSlider();
    }
  }
  
  initSlider() {
    // Create navigation controls
    const controls = document.createElement('div');
    controls.className = 'slider-controls';
    
    const prevBtn = document.createElement('button');
    prevBtn.className = 'slider-control prev';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.addEventListener('click', () => this.prevSlide());
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'slider-control next';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.addEventListener('click', () => this.nextSlide());
    
    controls.appendChild(prevBtn);
    controls.appendChild(nextBtn);
    
    // Add navigation indicators
    const indicators = document.createElement('div');
    indicators.className = 'slider-indicators';
    
    this.testimonials.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = index === 0 ? 'indicator active' : 'indicator';
      dot.addEventListener('click', () => this.goToSlide(index));
      indicators.appendChild(dot);
    });
    
    // Append controls to slider parent
    this.slider.parentNode.appendChild(controls);
    this.slider.parentNode.appendChild(indicators);
    
    // Start autoplay
    this.startAutoplay();
    
    // Pause autoplay on hover
    this.slider.addEventListener('mouseenter', () => this.stopAutoplay());
    this.slider.addEventListener('mouseleave', () => this.startAutoplay());
  }
  
  updateSlider() {
    // Hide all testimonials
    this.testimonials.forEach((testimonial, index) => {
      if (index >= this.currentIndex && index < this.currentIndex + 3) {
        testimonial.style.display = 'block';
        testimonial.classList.add('active');
      } else {
        testimonial.style.display = 'none';
        testimonial.classList.remove('active');
      }
    });
    
    // Update indicators
    const indicators = document.querySelectorAll('.slider-indicators .indicator');
    indicators.forEach((indicator, index) => {
      if (index === this.currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
  
  nextSlide() {
    if (this.currentIndex < this.testimonials.length - 3) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updateSlider();
  }
  
  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.testimonials.length - 3;
    }
    this.updateSlider();
  }
  
  goToSlide(index) {
    this.currentIndex = index;
    this.updateSlider();
  }
  
  startAutoplay() {
    this.autoplayInterval = setInterval(() => this.nextSlide(), 5000);
  }
  
  stopAutoplay() {
    clearInterval(this.autoplayInterval);
  }
}

// Initialize testimonial slider if there are enough testimonials
document.addEventListener('DOMContentLoaded', () => {
  const testimonialSlider = new TestimonialSlider();
  
  // Add scroll animations
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });
  
  animateElements.forEach(element => {
    animateOnScroll.observe(element);
  });
  
  // Add CSS class to elements based on their position in viewport
  const addClassOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .step, .pricing-card, .testimonial-card');
    
    elements.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        // Add staggered delay based on index
        setTimeout(() => {
          element.classList.add('visible');
        }, index * 100);
      }
    });
  };
  
  // Run on initial load
  addClassOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', addClassOnScroll);
  
  // Counters Animation
  const counterElements = document.querySelectorAll('.stat-number');
  
  const animateCounter = (element) => {
    const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
    const suffix = element.textContent.replace(/[0-9]/g, '');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const counterInterval = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target + suffix;
        clearInterval(counterInterval);
      } else {
        element.textContent = Math.floor(current) + suffix;
      }
    }, 16);
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counterElements.forEach(counter => {
    counterObserver.observe(counter);
  });
  
  // Simple form validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const formElements = form.elements;
      
      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        
        if (element.hasAttribute('required') && element.value.trim() === '') {
          isValid = false;
          element.classList.add('error');
          
          // Create or update error message
          let errorMsg = element.nextElementSibling;
          if (!errorMsg || !errorMsg.classList.contains('error-message')) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            element.parentNode.insertBefore(errorMsg, element.nextSibling);
          }
          errorMsg.textContent = 'Este campo é obrigatório';
        } else if (element.type === 'email' && element.value.trim() !== '') {
          const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          
          if (!emailPattern.test(element.value)) {
            isValid = false;
            element.classList.add('error');
            
            let errorMsg = element.nextElementSibling;
            if (!errorMsg || !errorMsg.classList.contains('error-message')) {
              errorMsg = document.createElement('div');
              errorMsg.className = 'error-message';
              element.parentNode.insertBefore(errorMsg, element.nextSibling);
            }
            errorMsg.textContent = 'Digite um e-mail válido';
          } else {
            element.classList.remove('error');
            const errorMsg = element.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
              errorMsg.remove();
            }
          }
        } else {
          element.classList.remove('error');
          const errorMsg = element.nextElementSibling;
          if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.remove();
          }
        }
      }
      
      if (isValid) {
        // Here you would typically send the form data to your server
        // For now, we'll just show a success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'Mensagem enviada com sucesso!';
        
        form.reset();
        form.appendChild(successMsg);
        
        // Remove the success message after 3 seconds
        setTimeout(() => {
          successMsg.remove();
        }, 3000);
      }
    });
  });
});`;

interface CodeEditorProps {
  className?: string;
}

const CodeEditor = ({ className }: CodeEditorProps) => {
  const [htmlCode, setHtmlCode] = useState(defaultHTMLCode);
  const [cssCode, setCssCode] = useState(defaultCSSCode);
  const [jsCode, setJsCode] = useState(defaultJSCode);
  const [preview, setPreview] = useState('');
  const [fileName, setFileName] = useState('projeto-sem-titulo');
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [showConsole, setShowConsole] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('modern');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Atualizar preview quando o código mudar
  useEffect(() => {
    if (autoRefresh) {
      updatePreview();
    }
  }, [htmlCode, cssCode, jsCode, autoRefresh]);
  
  const updatePreview = () => {
    // Limpar console e erros anteriores
    setConsoleOutput([]);
    setErrors([]);
    
    try {
      // Interceptar console.log no iframe
      const consoleInterceptor = `
        <script>
          (function(){
            const originalConsole = window.console;
            window.console = {
              log: function() {
                window.parent.postMessage({
                  type: 'console.log',
                  data: Array.from(arguments).map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                  ).join(' ')
                }, '*');
                originalConsole.log.apply(originalConsole, arguments);
              },
              error: function() {
                window.parent.postMessage({
                  type: 'console.error',
                  data: Array.from(arguments).map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                  ).join(' ')
                }, '*');
                originalConsole.error.apply(originalConsole, arguments);
              },
              warn: function() {
                window.parent.postMessage({
                  type: 'console.warn',
                  data: Array.from(arguments).map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                  ).join(' ')
                }, '*');
                originalConsole.warn.apply(originalConsole, arguments);
              },
              info: function() {
                window.parent.postMessage({
                  type: 'console.info',
                  data: Array.from(arguments).map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                  ).join(' ')
                }, '*');
                originalConsole.info.apply(originalConsole, arguments);
              }
            };
            
            // Capturar erros de JavaScript
            window.addEventListener('error', function(event) {
              window.parent.postMessage({
                type: 'error',
                data: event.message + ' (' + event.filename + ':' + event.lineno + ')'
              }, '*');
            });
          })();
        </script>
      `;
      
      const combinedCode = `
        <html>
          <head>
            <style>${cssCode}</style>
            ${consoleInterceptor}
          </head>
          <body>
            ${htmlCode.replace(/<html[^>]*>|<\/html>|<head>.*<\/head>|<body[^>]*>|<\/body>/gs, '')}
            <script>${jsCode}</script>
          </body>
        </html>
      `;
      setPreview(combinedCode);
    } catch (error) {
      if (error instanceof Error) {
        setErrors(prev => [...prev, error.message]);
      }
    }
  };
  
  // Listener para mensagens do iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type) {
        switch (event.data.type) {
          case 'console.log':
          case 'console.info':
            setConsoleOutput(prev => [...prev, `log: ${event.data.data}`]);
            break;
          case 'console.warn':
            setConsoleOutput(prev => [...prev, `warn: ${event.data.data}`]);
            break;
          case 'console.error':
          case 'error':
            setConsoleOutput(prev => [...prev, `error: ${event.data.data}`]);
            setErrors(prev => [...prev, event.data.data]);
            break;
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Resetar para o código padrão
  const handleReset = () => {
    if (confirm("Tem certeza que deseja restaurar o código padrão? Todas as alterações serão perdidas.")) {
      setHtmlCode(defaultHTMLCode);
      setCssCode(defaultCSSCode);
      setJsCode(defaultJSCode);
      setConsoleOutput([]);
      setErrors([]);
    }
  };

  // Simular salvar o projeto
  const handleSave = () => {
    try {
      const project = {
        name: fileName,
        html: htmlCode,
        css: cssCode,
        js: jsCode
      };
      
      const blob = new Blob([JSON.stringify(project)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      // Feedback ao usuário
      setConsoleOutput(prev => [...prev, `log: Projeto "${fileName}" salvo com sucesso!`]);
    } catch (error) {
      if (error instanceof Error) {
        setErrors(prev => [...prev, `Erro ao salvar: ${error.message}`]);
      }
    }
  };

  // Exportar código para download
  const handleExportHTML = () => {
    try {
      const fullHTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fileName}</title>
  <style>
${cssCode}
  </style>
</head>
<body>
${htmlCode.replace(/<html[^>]*>|<\/html>|<head>.*<\/head>|<body[^>]*>|<\/body>/gs, '')}
  <script>
${jsCode}
  </script>
</body>
</html>`;
      
      const blob = new Blob([fullHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.html`;
      a.click();
      URL.revokeObjectURL(url);
      
      // Feedback ao usuário
      setConsoleOutput(prev => [...prev, `log: Site exportado com sucesso para ${fileName}.html`]);
    } catch (error) {
      if (error instanceof Error) {
        setErrors(prev => [...prev, `Erro ao exportar: ${error.message}`]);
      }
    }
  };
  
  // Importar projeto
  const handleImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const project = JSON.parse(content);
        
        if (project.html && project.css && project.js) {
          setFileName(project.name || 'projeto-importado');
          setHtmlCode(project.html);
          setCssCode(project.css);
          setJsCode(project.js);
          setConsoleOutput(prev => [...prev, `log: Projeto "${project.name}" importado com sucesso!`]);
        } else {
          throw new Error('Formato de arquivo inválido');
        }
      } catch (error) {
        if (error instanceof Error) {
          setErrors(prev => [...prev, `Erro ao importar: ${error.message}`]);
        }
      }
    };
    reader.readAsText(file);
    
    // Limpar o input para permitir selecionar o mesmo arquivo novamente
    e.target.value = '';
  };
  
  // Copiar código completo para a área de transferência
  const handleCopyCode = () => {
    const fullHTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fileName}</title>
  <style>
${cssCode}
  </style>
</head>
<body>
${htmlCode.replace(/<html[^>]*>|<\/html>|<head>.*<\/head>|<body[^>]*>|<\/body>/gs, '')}
  <script>
${jsCode}
  </script>
</body>
</html>`;
    
    navigator.clipboard.writeText(fullHTML)
      .then(() => {
        setConsoleOutput(prev => [...prev, 'log: Código copiado para a área de transferência!']);
      })
      .catch(err => {
        setErrors(prev => [...prev, `Erro ao copiar: ${err.message}`]);
      });
  };
  
  // Limpar console
  const handleClearConsole = () => {
    setConsoleOutput([]);
    setErrors([]);
  };

  return (
    <div className={`w-full h-[800px] bg-[#1E1E1E] rounded-lg shadow-lg overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full flex flex-col"
      >
        {/* Barra superior */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#1E1E1E]">
          <div className="flex items-center space-x-4">
            <input 
              type="text" 
              value={fileName} 
              onChange={(e) => setFileName(e.target.value)}
              className="bg-[#3C3C3C] text-white px-3 py-1 rounded text-sm outline-none border border-[#3C3C3C] focus:border-[#007ACC]"
            />
            
            {/* Menu Arquivo */}
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C]">
                        Arquivo
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Menu Arquivo</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent className="bg-[#252526] text-gray-300 border-[#3C3C3C]">
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={handleSave}>
                  Salvar Projeto
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={handleExportHTML}>
                  Exportar HTML
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={handleImport}>
                  Importar Projeto
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={handleCopyCode}>
                  Copiar Código
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={handleReset}>
                  Restaurar Padrão
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Menu Editar */}
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C]">
                        Editar
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Menu Editar</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent className="bg-[#252526] text-gray-300 border-[#3C3C3C]">
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer">
                  Desfazer
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer">
                  Refazer
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer">
                  Localizar
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer">
                  Substituir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Menu Exibir */}
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C]">
                        Exibir
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Menu Exibir</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent className="bg-[#252526] text-gray-300 border-[#3C3C3C]">
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={() => setTheme(theme === 'vs-dark' ? 'vs-light' : 'vs-dark')}>
                  Alternar Tema
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={() => setFontSize(fontSize + 1)}>
                  Aumentar Tamanho da Fonte
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={() => setFontSize(Math.max(10, fontSize - 1))}>
                  Diminuir Tamanho da Fonte
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={() => setShowConsole(!showConsole)}>
                  {showConsole ? 'Ocultar Console' : 'Mostrar Console'}
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={() => setAutoRefresh(!autoRefresh)}>
                  {autoRefresh ? 'Desativar Atualização Automática' : 'Ativar Atualização Automática'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Menu Temas */}
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C]">
                        Temas
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Temas Pré-configurados</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent className="bg-[#252526] text-gray-300 border-[#3C3C3C]">
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer">
                  Moderno (Padrão)
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer">
                  Minimalista
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer">
                  E-commerce
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer">
                  Blog
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer">
                  Portfolio
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center space-x-2">
            <input 
              ref={fileInputRef} 
              type="file" 
              accept=".json" 
              className="hidden" 
              onChange={handleFileChange} 
            />
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-300 hover:text-white hover:bg-[#3C3C3C]"
                    onClick={handleSave}
                  >
                    <Save size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Salvar Projeto</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-300 hover:text-white hover:bg-[#3C3C3C]"
                    onClick={handleImport}
                  >
                    <Upload size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Importar Projeto</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-300 hover:text-white hover:bg-[#3C3C3C]"
                    onClick={handleExportHTML}
                  >
                    <Download size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Exportar HTML</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-300 hover:text-white hover:bg-[#3C3C3C]"
                    onClick={() => updatePreview()}
                  >
                    <Play size={16} className="text-[#4CAF50]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Executar</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-300 hover:text-white hover:bg-[#3C3C3C]"
                  >
                    <Settings size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Configurações</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {/* Área principal do editor */}
        <div className="flex-1 flex flex-col">
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            {/* Painel à esquerda com abas de arquivo */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <Card className="h-full border-0 rounded-none bg-[#1E1E1E] text-white">
                <CardContent className="p-0 h-full">
                  <Tabs defaultValue="html" className="h-full flex flex-col">
                    <div className="border-b border-[#252526] px-2 bg-[#252526]">
                      <TabsList className="h-10 bg-[#252526]">
                        <TabsTrigger value="html" className="data-[state=active]:bg-[#1E1E1E] data-[state=active]:text-[#007ACC] flex items-center space-x-2">
                          <FileCode size={14} />
                          <span>index.html</span>
                        </TabsTrigger>
                        <TabsTrigger value="css" className="data-[state=active]:bg-[#1E1E1E] data-[state=active]:text-[#007ACC] flex items-center space-x-2">
                          <FileType size={14} />
                          <span>estilos.css</span>
                        </TabsTrigger>
                        <TabsTrigger value="js" className="data-[state=active]:bg-[#1E1E1E] data-[state=active]:text-[#007ACC] flex items-center space-x-2">
                          <FileCog size={14} />
                          <span>script.js</span>
                        </TabsTrigger>
                      </TabsList>
                      
                      <div className="flex items-center space-x-2 py-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={handleReset}
                                className="h-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C] flex items-center space-x-1"
                              >
                                <RotateCcw size={14} />
                                <span>Restaurar</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">Restaurar Código Padrão</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={handleCopyCode}
                                className="h-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C] flex items-center space-x-1"
                              >
                                <Copy size={14} />
                                <span>Copiar</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">Copiar Código Completo</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setShowConsole(!showConsole)}
                                className="h-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C] flex items-center space-x-1"
                              >
                                <Terminal size={14} />
                                <span>Console</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">Mostrar/Ocultar Console</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    {/* Editor de código com linha de numeração e estilo VSCode */}
                    <TabsContent value="html" className="flex-1 overflow-hidden mt-0 p-0">
                      <div className="flex items-center px-4 py-1 bg-[#252526] text-xs text-gray-400 border-b border-[#1E1E1E]">
                        <span>HTML</span>
                        <span className="mx-2">•</span>
                        <span>UTF-8</span>
                      </div>
                      <Editor
                        height="100%"
                        defaultLanguage="html"
                        theme={theme}
                        value={htmlCode}
                        onChange={(value) => setHtmlCode(value || '')}
                        options={{
                          fontSize: fontSize,
                          fontFamily: "'Fira Code', monospace",
                          fontLigatures: true,
                          minimap: { enabled: true },
                          scrollBeyondLastLine: false,
                          wordWrap: 'on',
                          lineNumbers: 'on',
                          renderLineHighlight: 'all',
                          cursorBlinking: 'smooth',
                          automaticLayout: true,
                          padding: { top: 10 },
                          suggest: {
                            showMethods: true,
                            showFunctions: true,
                            showConstructors: true,
                            showFields: true,
                            showVariables: true,
                            showClasses: true,
                            showStructs: true,
                            showInterfaces: true,
                            showModules: true,
                            showProperties: true,
                            showEvents: true,
                            showOperators: true,
                            showUnits: true,
                            showValues: true,
                            showConstants: true,
                            showEnums: true,
                            showEnumMembers: true,
                            showKeywords: true,
                            showWords: true,
                            showColors: true,
                            showFiles: true,
                            showReferences: true,
                            showFolders: true,
                            showTypeParameters: true,
                            showSnippets: true,
                            showUsers: true,
                            showIssues: true
                          }
                        }}
                      />
                    </TabsContent>

                    <TabsContent value="css" className="flex-1 overflow-hidden mt-0 p-0">
                      <div className="flex items-center px-4 py-1 bg-[#252526] text-xs text-gray-400 border-b border-[#1E1E1E]">
                        <span>CSS</span>
                        <span className="mx-2">•</span>
                        <span>UTF-8</span>
                      </div>
                      <Editor
                        height="100%"
                        defaultLanguage="css"
                        theme={theme}
                        value={cssCode}
                        onChange={(value) => setCssCode(value || '')}
                        options={{
                          fontSize: fontSize,
                          fontFamily: "'Fira Code', monospace",
                          fontLigatures: true,
                          minimap: { enabled: true },
                          scrollBeyondLastLine: false,
                          wordWrap: 'on',
                          lineNumbers: 'on',
                          renderLineHighlight: 'all',
                          cursorBlinking: 'smooth',
                          automaticLayout: true,
                          padding: { top: 10 }
                        }}
                      />
                    </TabsContent>

                    <TabsContent value="js" className="flex-1 overflow-hidden mt-0 p-0">
                      <div className="flex items-center px-4 py-1 bg-[#252526] text-xs text-gray-400 border-b border-[#1E1E1E]">
                        <span>JavaScript</span>
                        <span className="mx-2">•</span>
                        <span>UTF-8</span>
                      </div>
                      <Editor
                        height="100%"
                        defaultLanguage="javascript"
                        theme={theme}
                        value={jsCode}
                        onChange={(value) => setJsCode(value || '')}
                        options={{
                          fontSize: fontSize,
                          fontFamily: "'Fira Code', monospace",
                          fontLigatures: true,
                          minimap: { enabled: true },
                          scrollBeyondLastLine: false,
                          wordWrap: 'on',
                          lineNumbers: 'on',
                          renderLineHighlight: 'all',
                          cursorBlinking: 'smooth',
                          automaticLayout: true,
                          padding: { top: 10 }
                        }}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-[#252526] hover:bg-[#007ACC]" />

            {/* Painel de visualização */}
            <ResizablePanel defaultSize={50}>
              <Card className="h-full border-0 rounded-none bg-[#1E1E1E]">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="p-2 border-b border-[#252526] bg-[#252526] flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Play size={14} className="text-[#007ACC]" />
                      <h3 className="font-medium text-gray-300 text-sm">Visualização</h3>
                      {!autoRefresh && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={updatePreview}
                          className="h-6 ml-2 text-xs text-white bg-[#007ACC] hover:bg-[#005999] border-[#007ACC]"
                        >
                          Atualizar
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-7 w-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C]"
                              onClick={() => {
                                const newWindow = window.open('', '_blank');
                                if (newWindow) {
                                  newWindow.document.write(preview);
                                  newWindow.document.close();
                                }
                              }}
                            >
                              <Maximize size={14} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">Abrir em Nova Aba</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-7 w-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C]"
                            >
                              <LayoutPanelLeft size={14} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">Mudar Layout</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-7 w-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C]"
                              onClick={() => setShowConsole(!showConsole)}
                            >
                              <Terminal size={14} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">Mostrar/Ocultar Console</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  
                  <div className={`flex flex-col ${showConsole ? 'h-[calc(100%-33px)]' : 'h-[calc(100%-33px)]'}`}>
                    <div className={`bg-white ${showConsole ? 'h-[70%]' : 'h-full'}`}>
                      <iframe
                        title="Visualização do Projeto"
                        srcDoc={preview}
                        className="w-full h-full border-0"
                        sandbox="allow-scripts"
                      />
                    </div>
                    
                    {/* Console de desenvolvedor */}
                    {showConsole && (
                      <div className="h-[30%] bg-[#1E1E1E] border-t border-[#252526] overflow-auto">
                        <div className="flex justify-between items-center p-2 bg-[#252526] text-gray-300 text-xs">
                          <div className="flex items-center space-x-2">
                            <Terminal size={14} />
                            <span>Console</span>
                            {errors.length > 0 && (
                              <div className="flex items-center text-red-500">
                                <AlertTriangle size={14} className="mr-1" />
                                <span>{errors.length} erro(s)</span>
                              </div>
                            )}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={handleClearConsole}
                            className="h-6 text-xs text-gray-300 hover:text-white hover:bg-[#3C3C3C]"
                          >
                            <Trash2 size={14} className="mr-1" />
                            Limpar
                          </Button>
                        </div>
                        
                        <div className="p-2 font-mono text-xs overflow-auto max-h-[calc(100%-28px)]">
                          {consoleOutput.length > 0 ? (
                            consoleOutput.map((output, index) => {
                              const isError = output.startsWith('error:');
                              const isWarn = output.startsWith('warn:');
                              let textColor = 'text-gray-300';
                              
                              if (isError) textColor = 'text-red-400';
                              else if (isWarn) textColor = 'text-yellow-400';
                              
                              return (
                                <div key={index} className={`${textColor} py-1 border-b border-[#333333]`}>
                                  &gt; {output}
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-gray-500 py-1">Console está vazio. Tente usar console.log() no seu JavaScript.</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        
        {/* Barra de status */}
        <div className="flex items-center justify-between px-4 py-1 bg-[#007ACC] text-white text-xs">
          <div className="flex items-center space-x-4">
            <span>Ln 1, Col 1</span>
            <span>UTF-8</span>
            <span>CRLF</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>{autoRefresh ? 'Auto' : 'Manual'}</span>
            <span>100%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CodeEditor; 
import { Github, Linkedin, Mail, ArrowUp, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      className="bg-gray-900 py-10 px-3 sm:py-16 sm:px-6 border-t border-gray-700"
      role="contentinfo"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3 mb-10 sm:mb-12">
          {/* About Section */}
          <div className="mb-6 md:mb-0 animate__animated animate__fadeIn animate__delay-0.5s">
            <Link
              to="/"
              className="text-2xl sm:text-3xl font-bold transition-all text-white mb-4 inline-block hover:text-teal-500"
              aria-label="Ir para a página inicial"
            >
              <span className="text-teal-500">igao</span>
              <span>devs_404</span>
            </Link>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              Desenvolvedor Front End Sênior apaixonado por criar experiências digitais intuitivas e impactantes.
            </p>
            <div className="flex space-x-4 sm:space-x-6">
              <a
                href="https://github.com/igaodeveloper"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full text-white hover:text-teal-500 hover:scale-105 transition-all"
                aria-label="Perfil do GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/igor-costa-oliveira-673866169/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full text-white hover:text-teal-500 hover:scale-105 transition-all"
                aria-label="Perfil do LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:igorhawking@gmail.com"
                className="bg-gray-800 p-3 rounded-full text-white hover:text-teal-500 hover:scale-105 transition-all"
                aria-label="Enviar e-mail"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="animate__animated animate__fadeIn animate__delay-1s">
            <h3 className="text-white font-semibold text-lg sm:text-xl mb-3 sm:mb-4">
              Links Rápidos
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  to="/#home"
                  className="text-gray-400 hover:text-teal-500 transition-all"
                  aria-label="Ir para a seção Home"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/#about"
                  className="text-gray-400 hover:text-teal-500 transition-all"
                  aria-label="Ir para a seção Quem sou"
                >
                  Quem sou
                </Link>
              </li>
              <li>
                <Link
                  to="/#experience"
                  className="text-gray-400 hover:text-teal-500 transition-all"
                  aria-label="Ir para a seção Experiências"
                >
                  Experiências
                </Link>
              </li>
              <li>
                <Link
                  to="/#services"
                  className="text-gray-400 hover:text-teal-500 transition-all"
                  aria-label="Ir para a seção Serviços"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  to="/#projects"
                  className="text-gray-400 hover:text-teal-500 transition-all"
                  aria-label="Ir para a seção Projetos"
                >
                  Projetos
                </Link>
              </li>
              <li>
                <Link
                  to="/#skills"
                  className="text-gray-400 hover:text-teal-500 transition-all"
                  aria-label="Ir para a seção Conhecimentos"
                >
                  Conhecimentos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="animate__animated animate__fadeIn animate__delay-1.5s">
            <h3 className="text-white font-semibold text-lg sm:text-xl mb-3 sm:mb-4">Contato</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center text-gray-400 hover:text-teal-500 transition-all">
                <Mail className="mr-3" size={24} />
                <p>igorhawking@gmail.com</p>
              </div>
              <div className="flex items-center text-gray-400 hover:text-teal-500 transition-all">
                <Phone className="mr-3" size={24} />
                <a href="tel:+5511982928508" className="hover:text-teal-500">
                  +55 (11) 98292-8508
                </a>
              </div>
              <div className="text-gray-400">São Paulo, Brasil</div>
            </div>
          </div>

          {/* Newsletter Link */}
          <div className="animate__animated animate__fadeIn animate__delay-0.5s mt-6 sm:mt-8">
            <Link
              to="/newsletter"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
              aria-label="Assine a Newsletter"
            >
              <Mail className="mr-2 h-5 w-5" /> Assine a Newsletter
            </Link>
          </div>

          {/* Doação Pix */}
          <div className="animate__animated animate__fadeIn animate__delay-0.5s mt-3 sm:mt-4">
            <button
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors font-semibold"
              onClick={() => navigator.clipboard.writeText('11982928508')}
              title="Copiar chave Pix para doar"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Doar via Pix: <span className="ml-2 font-mono text-blue-600 bg-white px-2 rounded">11982928508</span>
            </button>
            <span className="block text-xs text-gray-400 mt-1">Clique para copiar a chave Pix</span>
          </div>

          {/* Afiliados/Recursos Gratuitos */}
          <div className="animate__animated animate__fadeIn animate__delay-0.5s mt-3 sm:mt-4">
            <div className="flex flex-col gap-2 items-center">
              <a href="https://www.cursoemvideo.com/course/javascript/" target="_blank" rel="noopener noreferrer" className="w-full max-w-xs inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-900 rounded-lg shadow hover:bg-yellow-200 transition-colors font-semibold justify-center">
                🚀 Curso de JavaScript Gratuito (Curso em Vídeo)
              </a>
              <a href="https://www.freecodecamp.org/" target="_blank" rel="noopener noreferrer" className="w-full max-w-xs inline-flex items-center px-4 py-2 bg-green-100 text-green-900 rounded-lg shadow hover:bg-green-200 transition-colors font-semibold justify-center">
                📘 Certificações Grátis em Programação (freeCodeCamp)
              </a>
              <a href="https://www.rocketseat.com.br/discover" target="_blank" rel="noopener noreferrer" className="w-full max-w-xs inline-flex items-center px-4 py-2 bg-blue-100 text-blue-900 rounded-lg shadow hover:bg-blue-200 transition-colors font-semibold justify-center">
                💻 Trilha Discover Gratuita (Rocketseat)
              </a>
            </div>
            <span className="block text-xs text-gray-400 mt-1">Recomendações gratuitas para aprender programação!</span>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <p className="text-gray-400 text-sm sm:text-base text-center sm:text-left">
            © {currentYear} igaodevs_404. Todos os direitos reservados.
          </p>
          <button
            onClick={scrollToTop}
            className="p-3 bg-gray-800 rounded-full text-white hover:text-teal-500 hover:scale-105 transition-all mt-2 sm:mt-0"
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={24} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

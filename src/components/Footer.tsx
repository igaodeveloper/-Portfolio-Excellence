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
          <div className="mb-6 md:mb-0">
            <Link
              to="/"
              className="text-2xl sm:text-3xl font-bold transition-all text-white mb-4 inline-block hover:text-teal-500"
              aria-label="Ir para a página inicial"
            >
              <span className="text-teal-500">igao</span>
              <span>devs_404</span>
            </Link>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              desenvolvedor fullstack senior apaixonado por criar experiências digitais intuitivas e impactantes.
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
          <div>
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
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white font-semibold text-lg sm:text-xl mb-3 sm:mb-4">
              Contato
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center text-gray-400 hover:text-teal-500 transition-all">
                <Mail className="mr-3" size={24} />
                <a href="mailto:igorhawking@gmail.com" className="hover:text-teal-500">
                  igorhawking@gmail.com
                </a>
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
        </div>

        {/* Free Resources Section */}
        <div className="mt-12 mb-8">
          <h3 className="text-white font-semibold text-lg sm:text-xl mb-4 text-center">
            Recursos Gratuitos para Aprender Programação
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="https://www.cursoemvideo.com/course/javascript/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-yellow-100 text-yellow-900 rounded-lg p-4 hover:bg-yellow-200 transition-colors shadow-md"
            >
              <div className="font-semibold">🚀 Curso de JavaScript Gratuito</div>
              <div className="text-sm text-yellow-700">Curso em Vídeo</div>
            </a>
            <a 
              href="https://www.freecodecamp.org/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-green-100 text-green-900 rounded-lg p-4 hover:bg-green-200 transition-colors shadow-md"
            >
              <div className="font-semibold">📘 Certificações Grátis</div>
              <div className="text-sm text-green-700">freeCodeCamp</div>
            </a>
            <a 
              href="https://www.rocketseat.com.br/discover" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-blue-100 text-blue-900 rounded-lg p-4 hover:bg-blue-200 transition-colors shadow-md"
            >
              <div className="font-semibold">💻 Trilha Discover</div>
              <div className="text-sm text-blue-700">Rocketseat</div>
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm sm:text-base text-center sm:text-left">
            © {currentYear} igaodevs_404. Todos os direitos reservados.
          </p>
          <button
            onClick={scrollToTop}
            className="p-3 bg-gray-800 rounded-full text-white hover:text-teal-500 hover:scale-105 transition-all"
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

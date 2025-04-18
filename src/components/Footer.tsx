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
    <footer className="bg-gray-900 py-16 px-6 border-t border-gray-700" role="contentinfo">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* About Section */}
          <div className="animate__animated animate__fadeIn animate__delay-0.5s">
            <Link
              to="/"
              className="text-3xl font-bold transition-all text-white mb-4 inline-block hover:text-teal-500"
              aria-label="Ir para a página inicial"
            >
              <span className="text-teal-500">igao</span>
              <span>devs_404</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Desenvolvedor Front-end & UI Designer apaixonado por criar
              experiências digitais intuitivas e impactantes.
            </p>
            <div className="flex space-x-6">
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
            <h3 className="text-white font-semibold text-xl mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
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
            <h3 className="text-white font-semibold text-xl mb-4">Contato</h3>
            <div className="space-y-4">
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
              <div className="text-gray-400">
                São Paulo, Brasil
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-6 flex justify-between items-center">
          <p className="text-gray-400">
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

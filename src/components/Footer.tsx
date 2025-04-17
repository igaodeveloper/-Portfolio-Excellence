import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-modern-darker py-12 px-6 border-t border-modern-accent/10">
      <div className="container-section">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <Link
              to="/"
              className="text-2xl font-bold transition-colors text-modern-white mb-4 inline-block"
            >
              <span className="text-modern-accent">Port</span>
              <span>fólio</span>
            </Link>
            <p className="text-modern-gray mb-6">
              Desenvolvedor Front-end & UI Designer apaixonado por criar
              experiências digitais intuitivas e impactantes.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/igaodeveloper"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-modern-dark p-3 rounded-lg text-modern-gray hover:text-modern-accent transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/igor-costa-oliveira-673866169/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-modern-dark p-3 rounded-lg text-modern-gray hover:text-modern-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="igorhawking@gmail.com"
                className="bg-modern-dark p-3 rounded-lg text-modern-gray hover:text-modern-accent transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-modern-white font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/#home"
                  className="text-modern-gray hover:text-modern-accent transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/#about"
                  className="text-modern-gray hover:text-modern-accent transition-colors"
                >
                  Quem sou
                </Link>
              </li>
              <li>
                <Link
                  to="/#experience"
                  className="text-modern-gray hover:text-modern-accent transition-colors"
                >
                  Experiências
                </Link>
              </li>
              <li>
                <Link
                  to="/#services"
                  className="text-modern-gray hover:text-modern-accent transition-colors"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  to="/#projects"
                  className="text-modern-gray hover:text-modern-accent transition-colors"
                >
                  Projetos
                </Link>
              </li>
              <li>
                <Link
                  to="/#skills"
                  className="text-modern-gray hover:text-modern-accent transition-colors"
                >
                  Conhecimentos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-modern-white font-bold text-lg mb-4">Contato</h3>
            <p className="text-modern-gray mb-2">contato@exemplo.com</p>
            <p className="text-modern-gray">São Paulo, Brasil</p>
          </div>
        </div>

        <div className="border-t border-modern-accent/10 pt-6 flex justify-between items-center">
          <p className="text-modern-gray">
            © {currentYear} Portfólio. Todos os direitos reservados.
          </p>
          <button 
            onClick={scrollToTop}
            className="p-3 bg-modern-dark rounded-lg text-modern-gray hover:text-modern-accent transition-colors"
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

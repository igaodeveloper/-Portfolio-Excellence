import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121214] py-12 px-6 border-t border-[#323238]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <Link
              to="/"
              className="text-2xl font-bold hover:text-[#00D2DF] transition-colors text-white mb-4 inline-block"
            >
              <span className="text-[#00D2DF]">Iuri</span>
              <span>Code</span>
            </Link>
            <p className="text-[#C4C4CC] mb-6">
              Desenvolvedor Front-end & UI Designer apaixonado por criar
              experiências digitais intuitivas e impactantes.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#202024] p-3 rounded-lg text-[#C4C4CC] hover:text-[#00D2DF] transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#202024] p-3 rounded-lg text-[#C4C4CC] hover:text-[#00D2DF] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:contact@example.com"
                className="bg-[#202024] p-3 rounded-lg text-[#C4C4CC] hover:text-[#00D2DF] transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-[#C4C4CC] hover:text-[#00D2DF] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/#about"
                  className="text-[#C4C4CC] hover:text-[#00D2DF] transition-colors"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  to="/#projects"
                  className="text-[#C4C4CC] hover:text-[#00D2DF] transition-colors"
                >
                  Projetos
                </Link>
              </li>
              <li>
                <Link
                  to="/#skills"
                  className="text-[#C4C4CC] hover:text-[#00D2DF] transition-colors"
                >
                  Habilidades
                </Link>
              </li>
              <li>
                <Link
                  to="/#contact"
                  className="text-[#C4C4CC] hover:text-[#00D2DF] transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contato</h3>
            <p className="text-[#C4C4CC] mb-2">contato@exemplo.com</p>
            <p className="text-[#C4C4CC]">São Paulo, Brasil</p>
          </div>
        </div>

        <div className="border-t border-[#323238] pt-6 text-center">
          <p className="text-[#C4C4CC]">
            © {currentYear} IuriCode. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

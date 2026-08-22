import { PlayCircle } from "lucide-react";

import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaYoutube
} from "react-icons/fa";

import "../styles/footer.css";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                {/* Marca */}
                <div className="footer-coluna footer-marca">

                    <div className="footer-logo">
                        <div className="footer-logo-icon">
                            C
                        </div>

                        <h2>
                            Conecta<span>Tech</span>
                        </h2>
                    </div>

                    <p>
                        A melhor curadoria de tecnologia de ponta
                        para otimizar sua rotina profissional e pessoal.
                    </p>

                </div>


                {/* Categorias */}
                <div className="footer-coluna">

                    <h3>Categorias</h3>

                    <a href="#">Notebooks</a>
                    <a href="#">Smartphones</a>
                    <a href="#">Componentes</a>

                </div>


                {/* Institucional */}
                <div className="footer-coluna">

                    <h3>Institucional</h3>

                    <a href="#">Sobre Nós</a>
                    <a href="#">Contato</a>
                    <a href="#">Políticas</a>

                </div>


                {/* Redes sociais */}
                <div className="footer-coluna footer-redes-coluna">

                    <h3>Siga-nos</h3>

                    <div className="footer-redes">

                        <a href="#" aria-label="Facebook">
                            <FaFacebookF />
                        </a>

                        <a href="#" aria-label="Instagram">
                            <FaInstagram />
                        </a>

                        <a href="#" aria-label="Twitter">
                            <FaTwitter />
                        </a>

                        <a href="#" aria-label="YouTube">
                            <FaYoutube />
                        </a>

                    </div>

                </div>

            </div>


            {/* Parte inferior */}
            <div className="footer-bottom">

                <p>
                    © 2026 ConectaTech S.A. Todos os direitos reservados.
                </p>

                <p>
                    CNPJ: 12.345.678/0001-90
                </p>

            </div>

        </footer>
    );
}

export default Footer;
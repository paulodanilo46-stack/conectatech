import Header from "../components/Header";
import "../styles/telaInicial.css";
import Footer from "../components/Footer";

import macbook from "../assets/macbook.png";
import iphone from "../assets/iphone.png";
import teclado from "../assets/teclado.png";
import rtx from "../assets/rtx.png";

import {
    Laptop,
    Smartphone,
    Cpu,
    Headphones,
    Monitor,
    Keyboard,
    ShoppingCart
} from "lucide-react";

function TelaInicial({
    estaLogado,
    onLogin,
    onPerfil,
    onLogout,
    onCarrinho,
    mostrarPopup,
    onProdutos,
    onHome
}) {
    return (
        <>
            <Header
                estaLogado={estaLogado}
                onLogin={onLogin}
                onPerfil={onPerfil}
                onLogout={onLogout}
                onCarrinho={onCarrinho}
                onProdutos={onProdutos}
                onHome={() => setScreen("inicio")}
            />

            {mostrarPopup && (
                <div className="popup-login">
                    <strong>Login realizado com sucesso!</strong>
                    <span>Bem-vindo à ConectaTech.</span>
                </div>
            )}

            <main className="hero">

                <div className="overlay">

                    <div className="hero-content">

                        <span className="tag">
                            NOVIDADES DA SEMANA
                        </span>

                        <h1>
                            Eleve sua performance <br />
                            digital hoje
                        </h1>

                        <p>
                            Descubra a seleção de processadores e notebooks
                            com até 30% de desconto especial e frete grátis
                            em toda a linha Pro.
                        </p>

                        <button onClick={onProdutos}>
                            Confira as Ofertas
                        </button>

                    </div>

                </div>

            </main>
            <section className="categorias">

                <div className="secao-topo">
                    <div>
                        <span className="subtitulo">
                            ENCONTRE O QUE VOCÊ PRECISA
                        </span>

                        <h2>
                            Navegue por categoria
                        </h2>
                    </div>

                    <button className="ver-todas">
                        Ver todas
                    </button>
                </div>

                <div className="categorias-grid">

                    <div className="categoria-card">
                        <div className="categoria-icon">
                            <Laptop size={30} />
                        </div>

                        <h3>Notebooks</h3>
                        <p>Desempenho e mobilidade</p>
                    </div>

                    <div className="categoria-card">
                        <div className="categoria-icon">
                            <Smartphone size={30} />
                        </div>

                        <h3>Smartphones</h3>
                        <p>Tecnologia na palma da mão</p>
                    </div>

                    <div className="categoria-card">
                        <div className="categoria-icon">
                            <Cpu size={30} />
                        </div>

                        <h3>Componentes</h3>
                        <p>Monte seu computador</p>
                    </div>

                    <div className="categoria-card">
                        <div className="categoria-icon">
                            <Headphones size={30} />
                        </div>

                        <h3>Periféricos</h3>
                        <p>Mais precisão e conforto</p>
                    </div>

                    <div className="categoria-card">
                        <div className="categoria-icon">
                            <Monitor size={30} />
                        </div>

                        <h3>Monitores</h3>
                        <p>Imagem com alta qualidade</p>
                    </div>

                    <div className="categoria-card">
                        <div className="categoria-icon">
                            <Keyboard size={30} />
                        </div>

                        <h3>Acessórios</h3>
                        <p>Complete seu setup</p>
                    </div>

                </div>

            </section>
            {/* PRODUTOS EM DESTAQUE */}
            <section className="produtos-destaque">

                <div className="secao-topo">
                    <div>
                        <span className="subtitulo">
                            OS MAIS PROCURADOS
                        </span>

                        <h2>
                            Produtos em destaque
                        </h2>
                    </div>

                    <button className="ver-todas">
                        Ver todos
                    </button>
                </div>


                <div className="produtos-grid">

                    {/* MacBook */}
                    <div className="produto-card">

                        <div className="produto-imagem-destaque">
                            <img
                                src={macbook}
                                alt="MacBook Pro M3"
                            />
                        </div>

                        <span className="produto-categoria">
                            Notebook
                        </span>

                        <h3>
                            MacBook Pro M3
                        </h3>

                        <p>
                            Apple · 16GB RAM · 512GB SSD
                        </p>

                        <div className="produto-preco">
                            <span>
                                R$ 12.499,00
                            </span>
                        </div>

                        <button className="adicionar-carrinho">
                            <ShoppingCart size={18} />
                            Adicionar ao Carrinho
                        </button>

                    </div>


                    {/* iPhone */}
                    <div className="produto-card">

                        <div className="produto-imagem-destaque">
                            <img
                                src={iphone}
                                alt="iPhone 15 Pro Max"
                            />
                        </div>

                        <span className="produto-categoria">
                            Smartphone
                        </span>

                        <h3>
                            iPhone 15 Pro Max
                        </h3>

                        <p>
                            Apple · 256GB · 5G
                        </p>

                        <div className="produto-preco">
                            <span>
                                R$ 8.999,00
                            </span>
                        </div>

                        <button className="adicionar-carrinho">
                            <ShoppingCart size={18} />
                            Adicionar ao Carrinho
                        </button>

                    </div>


                    {/* Teclado */}
                    <div className="produto-card">

                        <div className="produto-imagem-destaque">
                            <img
                                src={teclado}
                                alt="Teclado Mecânico RGB"
                            />
                        </div>

                        <span className="produto-categoria">
                            Periférico
                        </span>

                        <h3>
                            Teclado Mecânico RGB
                        </h3>

                        <p>
                            RGB · Switch mecânico · USB
                        </p>

                        <div className="produto-preco">
                            <span>
                                R$ 549,00
                            </span>
                        </div>

                        <button className="adicionar-carrinho">
                            <ShoppingCart size={18} />
                            Adicionar ao Carrinho
                        </button>

                    </div>


                    {/* RTX */}
                    <div className="produto-card">

                        <div className="produto-imagem-destaque">
                            <img
                                src={rtx}
                                alt="GeForce RTX 4070 Ti"
                            />
                        </div>

                        <span className="produto-categoria">
                            Placa de vídeo
                        </span>

                        <h3>
                            GeForce RTX 4070 Ti
                        </h3>

                        <p>
                            NVIDIA · 12GB GDDR6X
                        </p>

                        <div className="produto-preco">
                            <span>
                                R$ 5.899,00
                            </span>
                        </div>

                        <button className="adicionar-carrinho">
                            <ShoppingCart size={18} />
                            Adicionar ao Carrinho
                        </button>

                    </div>

                </div>

            </section>

            <Footer />

        </>
    );
}

export default TelaInicial;
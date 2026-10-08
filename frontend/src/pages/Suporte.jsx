import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/suporte.css";

function Suporte({
    estaLogado,
    onLogin,
    onPerfil,
    onLogout,
    onCarrinho,
    onProdutos,
    onHome,
    onPedidos,
    onSobre,
    onSuporte
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
                onHome={onHome}
                onPedidos={onPedidos}
                onSobre={onSobre}
                onSuporte={onSuporte}
            />

            <main className="suporte-page">

                <section className="suporte-topo">
                    <span className="subtitulo">CENTRAL DE AJUDA</span>

                    <h1>
                        Como podemos ajudar?
                    </h1>

                    <p>
                        Encontre respostas para suas dúvidas ou entre em contato
                        com nossa equipe de suporte.
                    </p>
                </section>

                <section className="suporte-opcoes">

                    <div className="suporte-card">
                        <h2>Pedidos</h2>

                        <p>
                            Consulte informações sobre seus pedidos,
                            pagamentos e acompanhamento da entrega.
                        </p>

                        <button>
                            Consultar pedidos
                        </button>
                    </div>

                    <div className="suporte-card">
                        <h2>Produtos</h2>

                        <p>
                            Precisa de informações sobre algum produto?
                            Consulte nossa área de produtos.
                        </p>

                        <button>
                            Ver produtos
                        </button>
                    </div>

                    <div className="suporte-card">
                        <h2>Atendimento</h2>

                        <p>
                            Não encontrou o que precisava? Entre em contato
                            com nossa equipe para receber ajuda.
                        </p>

                        <button>
                            Entrar em contato
                        </button>
                    </div>

                </section>

                <section className="suporte-contato">

                    <div>
                        <span className="subtitulo">FALE CONOSCO</span>

                        <h2>
                            Precisa de ajuda?
                        </h2>

                        <p>
                            Nossa equipe está disponível para auxiliar com
                            dúvidas relacionadas à plataforma, produtos e pedidos.
                        </p>
                    </div>

                    <div className="suporte-informacoes">
                        <div>
                            <span>E-mail</span>
                            <strong>suporte@conectatech.com</strong>
                        </div>

                        <div>
                            <span>Atendimento</span>
                            <strong>Segunda a sexta, das 8h às 18h</strong>
                        </div>
                    </div>

                </section>

            </main>

            <Footer
                onSobre={onSobre}
                onSuporte={onSuporte}
            />
        </>
    );
}

export default Suporte;
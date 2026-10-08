import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/sobre.css";

function Sobre({
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

            <main className="sobre-page">

                <section className="sobre-topo">
                    <span className="subtitulo">SOBRE A CONECTATECH</span>

                    <h1>
                        Tecnologia para conectar você
                    </h1>

                    <p>
                        A ConectaTech é uma plataforma de comércio eletrônico
                        voltada para produtos de tecnologia, oferecendo uma
                        experiência simples, organizada e segura para seus clientes.
                    </p>
                </section>

                <section className="sobre-conteudo">

                    <div className="sobre-card">
                        <h2>Quem somos</h2>

                        <p>
                            A ConectaTech foi desenvolvida com o objetivo de
                            proporcionar uma experiência digital para a compra
                            de produtos tecnológicos, reunindo praticidade,
                            organização e facilidade de acesso.
                        </p>
                    </div>

                    <div className="sobre-card">
                        <h2>Nosso objetivo</h2>

                        <p>
                            Facilitar o acesso a produtos de tecnologia por meio
                            de uma plataforma intuitiva, permitindo que o cliente
                            encontre produtos, realize suas compras e acompanhe
                            seus pedidos.
                        </p>
                    </div>

                    <div className="sobre-card">
                        <h2>Nossa proposta</h2>

                        <p>
                            Oferecer uma experiência de compra organizada,
                            com informações sobre produtos, gerenciamento de
                            pedidos e suporte aos usuários.
                        </p>
                    </div>

                </section>

                <section className="sobre-destaque">

                    <div className="sobre-destaque-conteudo">

                        <span className="subtitulo">
                            CONHEÇA A CONECTATECH
                        </span>

                        <h2>
                            Tecnologia que conecta,
                            <span> inovação que transforma.</span>
                        </h2>

                        <p>
                            A ConectaTech nasceu com o propósito de tornar a tecnologia
                            mais acessível, prática e presente no dia a dia das pessoas.
                        </p>

                        <p>
                            Reunimos produtos de tecnologia em um único espaço,
                            proporcionando uma experiência simples, organizada e segura
                            para nossos clientes.
                        </p>

                    </div>

                    <div className="sobre-destaque-card">

                        <strong>ConectaTech</strong>

                        <span>
                            Tecnologia para sua rotina.
                        </span>

                        <div className="sobre-destaque-linha"></div>

                        <p>
                            Conectando pessoas,
                            produtos e inovação.
                        </p>

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

export default Sobre;
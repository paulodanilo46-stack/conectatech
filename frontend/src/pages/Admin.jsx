import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/admin.css";

function Admin({
    estaLogado,
    onLogin,
    onPerfil,
    onLogout,
    onCarrinho,
    onProdutos,
    onHome
}) {
    const resumo = {
        usuarios: 25,
        produtos: 18,
        pedidos: 42,
        faturamento: 35400.00
    };

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
            />

            <main className="admin-page">

                <section className="admin-topo">
                    <span className="subtitulo">
                        ADMINISTRAÇÃO
                    </span>

                    <h1>
                        Painel administrativo
                    </h1>

                    <p>
                        Gerencie os principais recursos da ConectaTech.
                    </p>
                </section>

                <section className="admin-resumo">

                    <div className="admin-card">
                        <span>Usuários</span>
                        <strong>{resumo.usuarios}</strong>
                    </div>

                    <div className="admin-card">
                        <span>Produtos</span>
                        <strong>{resumo.produtos}</strong>
                    </div>

                    <div className="admin-card">
                        <span>Pedidos</span>
                        <strong>{resumo.pedidos}</strong>
                    </div>

                    <div className="admin-card">
                        <span>Faturamento</span>
                        <strong>
                            R$ {resumo.faturamento.toFixed(2)}
                        </strong>
                    </div>

                </section>

                <section className="admin-opcoes">

                    <div className="admin-opcao">
                        <span className="admin-label">
                            PRODUTOS
                        </span>

                        <h2>
                            Gerenciar produtos
                        </h2>

                        <p>
                            Cadastre, edite e gerencie os produtos disponíveis na loja.
                        </p>

                        <button>
                            Gerenciar
                        </button>
                    </div>

                    <div className="admin-opcao">
                        <span className="admin-label">
                            PEDIDOS
                        </span>

                        <h2>
                            Gerenciar pedidos
                        </h2>

                        <p>
                            Consulte os pedidos realizados e atualize seus status.
                        </p>

                        <button>
                            Gerenciar
                        </button>
                    </div>

                    <div className="admin-opcao">
                        <span className="admin-label">
                            ESTOQUE
                        </span>

                        <h2>
                            Controle de estoque
                        </h2>

                        <p>
                            Consulte e atualize a quantidade disponível dos produtos.
                        </p>

                        <button>
                            Gerenciar
                        </button>
                    </div>

                    <div className="admin-opcao">
                        <span className="admin-label">
                            RELATÓRIOS
                        </span>

                        <h2>
                            Dashboard
                        </h2>

                        <p>
                            Consulte os principais indicadores da plataforma.
                        </p>

                        <button>
                            Visualizar
                        </button>
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

export default Admin;
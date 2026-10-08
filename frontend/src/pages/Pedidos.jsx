import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/pedidos.css";

function Pedidos({
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
    const pedidos = [
        {
            id: 1001,
            criado_em: "07/10/2026",
            status: "Processando",
            forma_pagamento: "PIX",
            valor_total: 2799.90,
            itens: [
                {
                    produto_id: 1,
                    nome: "Notebook ConectaTech Pro",
                    quantidade: 1,
                    preco_unitario: 2799.90
                }
            ]
        },
        {
            id: 1002,
            criado_em: "05/10/2026",
            status: "Entregue",
            forma_pagamento: "Cartão de crédito",
            valor_total: 899.90,
            itens: [
                {
                    produto_id: 2,
                    nome: "Monitor ConectaTech 24",
                    quantidade: 1,
                    preco_unitario: 899.90
                }
            ]
        }
    ];

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

            <main className="pedidos-page">

                <section className="pedidos-topo">
                    <span className="subtitulo">
                        ÁREA DO CLIENTE
                    </span>

                    <h1>
                        Meus pedidos
                    </h1>

                    <p>
                        Consulte suas compras e acompanhe o status dos seus pedidos.
                    </p>
                </section>

                <section className="pedidos-lista">

                    {pedidos.map((pedido) => (
                        <article
                            className="pedido-card"
                            key={pedido.id}
                        >

                            <div className="pedido-cabecalho">

                                <div>
                                    <span className="pedido-label">
                                        PEDIDO
                                    </span>

                                    <h2>
                                        #{pedido.id}
                                    </h2>

                                    <p>
                                        Realizado em {pedido.criado_em}
                                    </p>
                                </div>

                                <span className="pedido-status">
                                    {pedido.status}
                                </span>

                            </div>

                            <div className="pedido-conteudo">

                                <div className="pedido-produtos">

                                    <span className="pedido-label">
                                        PRODUTOS
                                    </span>

                                    {pedido.itens.map((item) => (
                                        <div
                                            className="pedido-item"
                                            key={item.produto_id}
                                        >
                                            <div>
                                                <strong>
                                                    {item.nome}
                                                </strong>

                                                <p>
                                                    Quantidade: {item.quantidade}
                                                </p>
                                            </div>

                                            <span>
                                                R$ {item.preco_unitario.toFixed(2)}
                                            </span>
                                        </div>
                                    ))}

                                </div>

                                <div className="pedido-resumo">

                                    <div>
                                        <span>
                                            Pagamento
                                        </span>

                                        <strong>
                                            {pedido.forma_pagamento}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            Total
                                        </span>

                                        <strong>
                                            R$ {pedido.valor_total.toFixed(2)}
                                        </strong>
                                    </div>

                                </div>

                            </div>

                            <button className="pedido-detalhes">
                                Ver detalhes
                            </button>

                        </article>
                    ))}

                </section>

            </main>

            <Footer
                onSobre={onSobre}
                onSuporte={onSuporte}
            />
        </>
    );
}

export default Pedidos;
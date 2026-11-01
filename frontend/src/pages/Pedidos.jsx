import { useEffect, useState } from "react";
import { apiRequest } from "../services/api.js";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/pedidos.css";

function Pedidos({
    estaLogado,
    token,
    onCategoria,
    quantidadeCarrinho = 0,
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
    const [pedidos, setPedidos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [mensagemErro, setMensagemErro] = useState("");
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
    const [carregandoDetalhes, setCarregandoDetalhes] = useState(false);
    const [pedidoAcompanhado, setPedidoAcompanhado] = useState(null);

    useEffect(() => {
        async function carregarPedidos() {
            if (!estaLogado || !token) {
                setPedidos([]);
                setCarregando(false);
                return;
            }

            try {
                setCarregando(true);
                setMensagemErro("");

                const resposta = await apiRequest("/pedidos", {
                    token
                });

                setPedidos(Array.isArray(resposta) ? resposta : []);
            } catch (erro) {
                setMensagemErro(erro.message);
            } finally {
                setCarregando(false);
            }
        }

        carregarPedidos();
    }, [estaLogado, token]);

    async function abrirDetalhes(id) {
        try {
            setCarregandoDetalhes(true);
            setMensagemErro("");
            setPedidoSelecionado(null);
            setPedidoAcompanhado(null);

            const resposta = await apiRequest(`/pedidos/${id}`, {
                token
            });

            setPedidoSelecionado(resposta);
        } catch (erro) {
            setMensagemErro(erro.message);
        } finally {
            setCarregandoDetalhes(false);
        }
    }

    async function acompanharPedido(id) {
        try {
            setMensagemErro("");
            setPedidoAcompanhado(null);
            setPedidoSelecionado(null);
            setCarregandoDetalhes(true);

            const resposta = await apiRequest(`/pedidos/${id}`, {
                token
            });

            setPedidoAcompanhado(resposta);
        } catch (erro) {
            setMensagemErro(erro.message);
        } finally {
            setCarregandoDetalhes(false);
        }
    }
    function formatarData(data) {
        if (!data) return "Data não disponível";

        return new Date(data).toLocaleDateString("pt-BR", {
            timeZone: "UTC"
        });
    }

    function formatarMoeda(valor) {
        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function formatarStatus(status) {
        const statusFormatados = {
            pendente: "Pendente",
            processando: "Processando",
            enviado: "Enviado",
            entregue: "Entregue",
            cancelado: "Cancelado"
        };

        return statusFormatados[status] || status;
    }

    return (
        <>
            <Header
                estaLogado={estaLogado}
                quantidadeCarrinho={quantidadeCarrinho}
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
                {carregando && (
                    <p>Carregando seus pedidos...</p>
                )}

                {mensagemErro && (
                    <p role="alert">{mensagemErro}</p>
                )}

                {!carregando && !mensagemErro && pedidos.length === 0 && (
                    <p>Você ainda não possui pedidos.</p>
                )}
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
                                        Realizado em {formatarData(pedido.criado_em)}
                                    </p>
                                </div>

                                <span className={`pedido-status status-${pedido.status}`}>
                                    {formatarStatus(pedido.status)}
                                </span>

                            </div>

                            <div className="pedido-conteudo">

                                <div className="pedido-produtos">

                                    <span className="pedido-label">
                                        PEDIDO
                                    </span>

                                    <p>
                                        Clique em "Ver detalhes" para consultar
                                        os produtos e as quantidades da compra.
                                    </p>

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
                                            {formatarMoeda(pedido.valor_total)}
                                        </strong>
                                    </div>

                                </div>

                            </div>

                            <div className="pedido-acoes">
                                <button
                                    type="button"
                                    className="pedido-detalhes"
                                    onClick={() => abrirDetalhes(pedido.id)}
                                >
                                    Ver detalhes
                                </button>

                                <button
                                    type="button"
                                    className="pedido-acompanhar"
                                    onClick={() => acompanharPedido(pedido.id)}
                                >
                                    Acompanhar pedido
                                </button>
                            </div>

                        </article>
                    ))}

                </section>
                {carregandoDetalhes && (
                    <p>Carregando informações do pedido...</p>
                )}

                {pedidoSelecionado && (
                    <section className="pedido-painel">

                        <div className="pedido-painel-cabecalho">
                            <h2>
                                Detalhes do pedido #{pedidoSelecionado.id}
                            </h2>

                            <button
                                type="button"
                                className="pedido-fechar"
                                onClick={() => setPedidoSelecionado(null)}
                            >
                                Fechar
                            </button>
                        </div>

                        <p>
                            <strong>Data:</strong>{" "}
                            {formatarData(pedidoSelecionado.criado_em)}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            {formatarStatus(pedidoSelecionado.status)}
                        </p>

                        <p>
                            <strong>Pagamento:</strong>{" "}
                            {pedidoSelecionado.forma_pagamento}
                        </p>

                        <h3>Produtos</h3>

                        {pedidoSelecionado.itens?.map((item) => (
                            <div className="pedido-item" key={item.id}>
                                <div>
                                    <strong>{item.nome}</strong>

                                    <p>
                                        Quantidade: {item.quantidade}
                                    </p>
                                </div>

                                <span>
                                    {formatarMoeda(
                                        item.subtotal ??
                                        Number(item.quantidade) *
                                        Number(item.preco_unitario)
                                    )}
                                </span>
                            </div>
                        ))}

                        <div className="pedido-detalhes-total">
                            <strong>Total do pedido</strong>

                            <strong>
                                {formatarMoeda(pedidoSelecionado.valor_total)}
                            </strong>
                        </div>

                    </section>
                )}

                {pedidoAcompanhado && (
                    <section className="pedido-painel">

                        <div className="pedido-painel-cabecalho">
                            <h2>
                                Acompanhamento do pedido #{pedidoAcompanhado.id}
                            </h2>

                            <button
                                type="button"
                                className="pedido-fechar"
                                onClick={() => setPedidoAcompanhado(null)}
                            >
                                Fechar
                            </button>
                        </div>

                        <p className="pedido-status-atual">
                            Status atual:{" "}
                            <strong>
                                {formatarStatus(pedidoAcompanhado.status)}
                            </strong>
                        </p>

                        {pedidoAcompanhado.status === "cancelado" ? (
                            <p>
                                Este pedido foi cancelado.
                            </p>
                        ) : (
                            <div className="pedido-linha-tempo">

                                {[
                                    {
                                        status: "pendente",
                                        titulo: "Pedido realizado"
                                    },
                                    {
                                        status: "processando",
                                        titulo: "Em preparação"
                                    },
                                    {
                                        status: "enviado",
                                        titulo: "Pedido enviado"
                                    },
                                    {
                                        status: "entregue",
                                        titulo: "Pedido entregue"
                                    }
                                ].map((etapa, indice, etapas) => {
                                    const ordemStatus = [
                                        "pendente",
                                        "processando",
                                        "enviado",
                                        "entregue"
                                    ];

                                    const indiceAtual = ordemStatus.indexOf(
                                        pedidoAcompanhado.status
                                    );

                                    const concluida = indiceAtual >= indice;
                                    const atual = indiceAtual === indice;

                                    return (
                                        <div
                                            className={`pedido-etapa ${concluida ? "concluida" : ""
                                                } ${atual ? "etapa-atual" : ""}`}
                                            key={etapa.status}
                                        >
                                            <div className="pedido-etapa-marcador">
                                                {concluida ? "✓" : indice + 1}
                                            </div>

                                            <div className="pedido-etapa-texto">
                                                <strong>{etapa.titulo}</strong>

                                                {atual && (
                                                    <span>Status atual</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        )}

                    </section>
                )}
            </main>

            <Footer
                onSobre={onSobre}
                onSuporte={onSuporte}
                onCategoria={onCategoria}
            />
        </>
    );
}

export default Pedidos;
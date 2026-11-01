import AdminHeader from "../components/AdminHeader";
import Footer from "../components/Footer";
import "../styles/admin.css";
import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { apiRequest } from "../services/api.js";

function Admin({
    estaLogado,
    token,
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
    const [resumo, setResumo] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [mensagemErro, setMensagemErro] = useState("");
    const [secao, setSecao] = useState("dashboard");
    const [produtos, setProdutos] = useState([]);
    const [carregandoProdutos, setCarregandoProdutos] = useState(false);
    const [erroProdutos, setErroProdutos] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [carregandoCategorias, setCarregandoCategorias] = useState(false);

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [avaliacao, setAvaliacao] = useState("0");
    const [estoque, setEstoque] = useState("");
    const [imagem, setImagem] = useState(null);

    const [salvandoProduto, setSalvandoProduto] = useState(false);
    const [mensagemFormulario, setMensagemFormulario] = useState("");
    const [produtoEditando, setProdutoEditando] = useState(null);

    const [pedidos, setPedidos] = useState([]);
    const [carregandoPedidos, setCarregandoPedidos] = useState(false);
    const [erroPedidos, setErroPedidos] = useState("");

    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
    const [carregandoDetalhes, setCarregandoDetalhes] = useState(false);
    const [erroDetalhes, setErroDetalhes] = useState("");
    const [atualizandoStatus, setAtualizandoStatus] = useState(false);

    useEffect(() => {
        async function carregarResumo() {
            if (!estaLogado || !token) {
                setResumo(null);
                setCarregando(false);
                return;
            }

            try {
                setCarregando(true);
                setMensagemErro("");

                const resposta = await apiRequest("/admin/dashboard", {
                    token
                });

                setResumo(resposta.dashboard);
            } catch (erro) {
                setMensagemErro(erro.message);
            } finally {
                setCarregando(false);
            }
        }

        carregarResumo();
    }, [estaLogado, token]);
    useEffect(() => {
        async function carregarProdutos() {
            if (
                (secao !== "produtos" && secao !== "estoque") ||
                !estaLogado ||
                !token
            ) {
                return;
            }

            try {
                setCarregandoProdutos(true);
                setErroProdutos("");

                const resposta = await apiRequest("/admin/produtos", {
                    token
                });

                setProdutos(resposta.produtos || []);

            } catch (erro) {
                setErroProdutos(erro.message);
            } finally {
                setCarregandoProdutos(false);
            }
        }

        carregarProdutos();
    }, [secao, estaLogado, token]);

    useEffect(() => {
        async function carregarCategorias() {
            if (secao !== "novoProduto" && secao !== "editarProduto") {
                return;
            }

            try {
                setCarregandoCategorias(true);

                const resposta = await apiRequest("/categorias");

                setCategorias(resposta);
            } catch (erro) {
                setMensagemFormulario(erro.message);
            } finally {
                setCarregandoCategorias(false);
            }
        }

        carregarCategorias();
    }, [secao]);
    useEffect(() => {
        async function carregarPedidos() {
            if (secao !== "pedidos" || !estaLogado || !token) {
                return;
            }

            try {
                setCarregandoPedidos(true);
                setErroPedidos("");

                const resposta = await apiRequest("/admin/pedidos", {
                    token
                });

                setPedidos(resposta.pedidos || []);

            } catch (erro) {
                setErroPedidos(erro.message);
            } finally {
                setCarregandoPedidos(false);
            }
        }

        carregarPedidos();
    }, [secao, estaLogado, token]);
    function limparFormulario() {
        setNome("");
        setDescricao("");
        setPreco("");
        setCategoriaId("");
        setAvaliacao("0");
        setEstoque("");
        setImagem(null);
        setProdutoEditando(null);
        setMensagemFormulario("");
    }
    async function editarProduto(id) {
        try {
            setMensagemFormulario("");

            const resposta = await apiRequest(`/admin/produtos/${id}`, {
                token
            });

            const produto = resposta.produto;

            setProdutoEditando(produto.id);
            setNome(produto.nome || "");
            setDescricao(produto.descricao || "");
            setPreco(produto.preco ?? "");
            setCategoriaId(String(produto.categoria_id || ""));
            setAvaliacao(String(produto.avaliacao ?? 0));
            setEstoque(String(produto.estoque ?? ""));
            setImagem(null);

            setSecao("editarProduto");
        } catch (erro) {
            alert(erro.message);
        }
    }
    async function cadastrarProduto(e) {
        e.preventDefault();

        try {
            setSalvandoProduto(true);
            setMensagemFormulario("");

            const formData = new FormData();

            formData.append("nome", nome);
            formData.append("descricao", descricao);
            formData.append("preco", preco);
            formData.append("categoria_id", categoriaId);
            formData.append("avaliacao", avaliacao);
            formData.append("estoque", estoque);

            // O backend exige o campo ativo na atualização.
            if (produtoEditando !== null) {
                const produtoAtual = produtos.find(
                    (produto) => String(produto.id) === String(produtoEditando)
                );

                formData.append("ativo", String(produtoAtual?.ativo ?? true));
            }

            if (imagem) {
                formData.append("imagem", imagem);
            }

            const editando = produtoEditando !== null;

            await apiRequest(
                editando
                    ? `/admin/produtos/${produtoEditando}`
                    : "/admin/produtos",
                {
                    method: editando ? "PUT" : "POST",
                    token,
                    body: formData
                }
            );

            limparFormulario();
            setSecao("produtos");

            // Atualiza a listagem após salvar.
            const resposta = await apiRequest("/admin/produtos", { token });
            setProdutos(resposta.produtos || []);

        } catch (erro) {
            setMensagemFormulario(erro.message);
        } finally {
            setSalvandoProduto(false);
        }
    }
    async function excluirProduto(id) {
        const confirmar = window.confirm(
            "Tem certeza de que deseja excluir este produto?"
        );

        if (!confirmar) {
            return;
        }

        try {
            await apiRequest(`/admin/produtos/${id}`, {
                method: "DELETE",
                token
            });

            setProdutos((produtosAtuais) =>
                produtosAtuais.filter((produto) => produto.id !== id)
            );

        } catch (erro) {
            alert(erro.message);
        }
    }

    async function alterarStatusProduto(produto) {
        const novoStatus = !produto.ativo;

        const confirmar = window.confirm(
            `Deseja ${novoStatus ? "ativar" : "desativar"} este produto?`
        );

        if (!confirmar) {
            return;
        }

        try {
            await apiRequest(`/admin/produtos/${produto.id}/ativo`, {
                method: "PUT",
                token,
                body: {
                    ativo: novoStatus
                }
            });

            setProdutos((produtosAtuais) =>
                produtosAtuais.map((item) =>
                    item.id === produto.id
                        ? { ...item, ativo: novoStatus }
                        : item
                )
            );

        } catch (erro) {
            alert(erro.message);
        }
    }

    async function atualizarEstoqueProduto(produto) {
        const quantidadeInformada = window.prompt(
            `Informe a nova quantidade de estoque para ${produto.nome}:`,
            String(produto.estoque ?? 0)
        );

        if (quantidadeInformada === null) {
            return;
        }

        if (quantidadeInformada.trim() === "") {
            alert("Informe uma quantidade válida.");
            return;
        }

        const novoEstoque = Number(quantidadeInformada);

        if (
            !Number.isInteger(novoEstoque) ||
            novoEstoque < 0
        ) {
            alert("O estoque deve ser um número inteiro maior ou igual a zero.");
            return;
        }

        try {
            await apiRequest(`/admin/produtos/${produto.id}/estoque`, {
                method: "PUT",
                token,
                body: {
                    estoque: novoEstoque
                }
            });

            setProdutos((produtosAtuais) =>
                produtosAtuais.map((item) =>
                    item.id === produto.id
                        ? { ...item, estoque: novoEstoque }
                        : item
                )
            );

            alert("Estoque atualizado com sucesso!");

        } catch (erro) {
            alert(erro.message);
        }
    }

    async function visualizarPedido(id) {
        try {
            setCarregandoDetalhes(true);
            setErroDetalhes("");
            setPedidoSelecionado(null);

            const resposta = await apiRequest(`/admin/pedidos/${id}`, {
                token
            });

            setPedidoSelecionado(resposta.pedido);
            setSecao("detalhesPedido");

        } catch (erro) {
            setErroDetalhes(erro.message);
            alert(erro.message);
        } finally {
            setCarregandoDetalhes(false);
        }
    }

    async function atualizarStatusPedido(novoStatus) {
        if (!pedidoSelecionado) {
            return;
        }

        const confirmar = window.confirm(
            `Deseja alterar o status do pedido #${pedidoSelecionado.id} para "${novoStatus}"?`
        );

        if (!confirmar) {
            return;
        }

        try {
            setAtualizandoStatus(true);

            const resposta = await apiRequest(
                `/admin/pedidos/${pedidoSelecionado.id}/status`,
                {
                    method: "PUT",
                    token,
                    body: {
                        status: novoStatus
                    }
                }
            );

            setPedidoSelecionado((pedidoAtual) => ({
                ...pedidoAtual,
                status: resposta.pedido.status
            }));

            setPedidos((pedidosAtuais) =>
                pedidosAtuais.map((pedido) =>
                    pedido.id === pedidoSelecionado.id
                        ? { ...pedido, status: resposta.pedido.status }
                        : pedido
                )
            );

            alert("Status atualizado com sucesso!");

        } catch (erro) {
            alert(erro.message);
        } finally {
            setAtualizandoStatus(false);
        }
    }

    function formatarMoeda(valor) {
        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function salvarRelatorioPDF() {
        const tituloOriginal = document.title;

        document.title = "Relatório ConectaTech";

        window.onafterprint = () => {
            document.title = tituloOriginal;
            window.onafterprint = null;
        };

        window.print();
    }

    return (
        <>
            <AdminHeader
                onHome={() => setSecao("dashboard")}
                onProdutos={() => setSecao("produtos")}
                onPedidos={() => setSecao("pedidos")}
                onLogout={onLogout}
            />

            <main className="admin-page">
                {secao === "dashboard" ? (
                    <>
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

                        {carregando && (
                            <p>Carregando indicadores...</p>
                        )}

                        {mensagemErro && (
                            <p role="alert">{mensagemErro}</p>
                        )}

                        {!carregando && resumo && (
                            <section className="admin-resumo">

                                <div className="admin-card">
                                    <span>Usuários</span>
                                    <strong>{resumo.usuarios.total}</strong>
                                </div>

                                <div className="admin-card">
                                    <span>Produtos</span>
                                    <strong>{resumo.produtos.total}</strong>
                                </div>

                                <div className="admin-card">
                                    <span>Pedidos</span>
                                    <strong>{resumo.pedidos.total}</strong>
                                </div>

                                <div className="admin-card">
                                    <span>Faturamento</span>
                                    <strong>
                                        {formatarMoeda(resumo.pedidos.valor_total)}
                                    </strong>
                                </div>

                            </section>
                        )}

                        <section className="admin-opcoes">

                            <div className="admin-opcao">
                                <span className="admin-label">
                                    PRODUTOS
                                </span>

                                <h2>Gerenciar produtos</h2>

                                <p>
                                    Cadastre, edite e gerencie os produtos disponíveis na loja.
                                </p>

                                <button onClick={() => setSecao("produtos")}>
                                    Gerenciar
                                </button>
                            </div>

                            <div className="admin-opcao">
                                <span className="admin-label">
                                    PEDIDOS
                                </span>

                                <h2>Gerenciar pedidos</h2>

                                <p>
                                    Consulte os pedidos realizados e atualize seus status.
                                </p>

                                <button onClick={() => setSecao("pedidos")}>
                                    Gerenciar
                                </button>
                            </div>

                            <div className="admin-opcao">
                                <span className="admin-label">
                                    ESTOQUE
                                </span>

                                <h2>Controle de estoque</h2>

                                <p>
                                    Consulte e atualize a quantidade disponível dos produtos.
                                </p>

                                <button onClick={() => setSecao("estoque")}>
                                    Gerenciar
                                </button>
                            </div>

                            <div className="admin-opcao">
                                <span className="admin-label">
                                    RELATÓRIOS
                                </span>

                                <h2>Dashboard</h2>

                                <p>
                                    Consulte os principais indicadores da plataforma.
                                </p>

                                <button onClick={() => setSecao("relatorios")}>
                                    Visualizar
                                </button>
                            </div>

                        </section>
                    </>
                ) : secao === "produtos" ? (
                    <>
                        <section className="admin-topo">
                            <span className="subtitulo">
                                ADMINISTRAÇÃO
                            </span>

                            <h1>Gerenciar produtos</h1>

                            <p>
                                Consulte os produtos cadastrados na ConectaTech.
                            </p>
                        </section>

                        <button
                            className="admin-voltar"
                            onClick={() => setSecao("dashboard")}
                        >
                            Voltar ao painel
                        </button>


                        {carregandoProdutos && (
                            <p>Carregando produtos...</p>
                        )}

                        {erroProdutos && (
                            <p role="alert">{erroProdutos}</p>
                        )}

                        {!carregandoProdutos && !erroProdutos && (
                            <section className="admin-produtos">

                                <div className="admin-produtos-topo">
                                    <h2>Produtos cadastrados</h2>

                                    <span>
                                        {produtos.length} produto(s)
                                    </span>

                                    <button
                                        onClick={() => {
                                            limparFormulario();
                                            setSecao("novoProduto");
                                        }}
                                    >
                                        Novo produto
                                    </button>
                                </div>

                                {produtos.length === 0 ? (
                                    <p>Nenhum produto cadastrado.</p>
                                ) : (
                                    <div className="admin-tabela-container">
                                        <table className="admin-tabela">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Produto</th>
                                                    <th>Categoria</th>
                                                    <th>Preço</th>
                                                    <th>Estoque</th>
                                                    <th>Situação</th>
                                                    <th>Ações</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {produtos.map((produto) => (
                                                    <tr key={produto.id}>
                                                        <td>{produto.id}</td>
                                                        <td>{produto.nome}</td>

                                                        <td>
                                                            {produto.categoria || "Sem categoria"}
                                                        </td>

                                                        <td>
                                                            {formatarMoeda(produto.preco)}
                                                        </td>

                                                        <td>{produto.estoque}</td>

                                                        <td>
                                                            <span className={
                                                                produto.ativo
                                                                    ? "admin-status ativo"
                                                                    : "admin-status inativo"
                                                            }>
                                                                {produto.ativo
                                                                    ? "Ativo"
                                                                    : "Inativo"}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="admin-acoes-produto">
                                                                <button
                                                                    type="button"
                                                                    className="admin-acao-editar"
                                                                    title="Editar produto"
                                                                    onClick={() => editarProduto(produto.id)}
                                                                >
                                                                    <Pencil size={18} />
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    className={produto.ativo ? "admin-acao-desativar" : "admin-acao-ativar"}
                                                                    title={produto.ativo ? "Desativar produto" : "Ativar produto"}
                                                                    onClick={() => alterarStatusProduto(produto)}
                                                                >
                                                                    {produto.ativo ? "Desativar" : "Ativar"}
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    className="admin-acao-excluir"
                                                                    title="Excluir produto"
                                                                    onClick={() => excluirProduto(produto.id)}
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </section>
                        )}
                    </>
                ) : secao === "pedidos" ? (

                    <section className="admin-produtos">

                        <section className="admin-topo">
                            <span className="subtitulo">
                                ADMINISTRAÇÃO
                            </span>

                            <h1>Gerenciar pedidos</h1>

                            <p>
                                Consulte os pedidos realizados pelos clientes.
                            </p>
                        </section>

                        <button
                            className="admin-voltar"
                            onClick={() => setSecao("dashboard")}
                        >
                            Voltar ao painel
                        </button>

                        {carregandoPedidos && (
                            <p>Carregando pedidos...</p>
                        )}

                        {erroPedidos && (
                            <p role="alert">{erroPedidos}</p>
                        )}

                        {!carregandoPedidos && !erroPedidos && (
                            <>
                                <div className="admin-produtos-topo">
                                    <h2>Pedidos realizados</h2>

                                    <span>
                                        {pedidos.length} pedido(s)
                                    </span>
                                </div>

                                {pedidos.length === 0 ? (
                                    <p>Nenhum pedido realizado.</p>
                                ) : (
                                    <div className="admin-tabela-container">
                                        <table className="admin-tabela">
                                            <thead>
                                                <tr>
                                                    <th>Pedido</th>
                                                    <th>Cliente</th>
                                                    <th>Data</th>
                                                    <th>Pagamento</th>
                                                    <th>Valor total</th>
                                                    <th>Status</th>
                                                    <th>Ação</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {pedidos.map((pedido) => (
                                                    <tr key={pedido.id}>
                                                        <td>#{pedido.id}</td>

                                                        <td>
                                                            <strong>
                                                                {pedido.usuario_nome}
                                                            </strong>
                                                            <br />
                                                            {pedido.usuario_email}
                                                        </td>

                                                        <td>
                                                            {new Date(
                                                                pedido.criado_em
                                                            ).toLocaleString("pt-BR")}
                                                        </td>

                                                        <td>
                                                            {pedido.forma_pagamento}
                                                        </td>

                                                        <td>
                                                            {formatarMoeda(
                                                                pedido.valor_total
                                                            )}
                                                        </td>

                                                        <td>
                                                            <span className={`admin-status ${pedido.status}`}>
                                                                {pedido.status}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="admin-acao-editar"
                                                                onClick={() => visualizarPedido(pedido.id)}
                                                            >
                                                                Visualizar
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </>
                        )}

                    </section>

                ) : secao === "detalhesPedido" ? (
                    <section className="admin-produtos">

                        {carregandoDetalhes && (
                            <p>Carregando detalhes do pedido...</p>
                        )}

                        {erroDetalhes && (
                            <p role="alert">{erroDetalhes}</p>
                        )}

                        {pedidoSelecionado && (
                            <>
                                <section className="admin-topo">
                                    <span className="subtitulo">
                                        ADMINISTRAÇÃO
                                    </span>

                                    <h1>Pedido #{pedidoSelecionado.id}</h1>

                                    <p>
                                        Consulte os dados e os produtos deste pedido.
                                    </p>
                                </section>

                                <button
                                    className="admin-voltar"
                                    onClick={() => setSecao("pedidos")}
                                >
                                    Voltar aos pedidos
                                </button>

                                <div className="admin-detalhes-pedido">

                                    <h2>Dados do cliente</h2>

                                    <p>
                                        <strong>Nome:</strong>{" "}
                                        {pedidoSelecionado.usuario_nome}
                                    </p>

                                    <p>
                                        <strong>E-mail:</strong>{" "}
                                        {pedidoSelecionado.usuario_email}
                                    </p>

                                    <p>
                                        <strong>Data:</strong>{" "}
                                        {new Date(
                                            pedidoSelecionado.criado_em
                                        ).toLocaleString("pt-BR")}
                                    </p>

                                    <p>
                                        <strong>Pagamento:</strong>{" "}
                                        {pedidoSelecionado.forma_pagamento}
                                    </p>

                                    <p>
                                        <strong>Valor total:</strong>{" "}
                                        {formatarMoeda(pedidoSelecionado.valor_total)}
                                    </p>

                                    <h2>Produtos do pedido</h2>

                                    <div className="admin-tabela-container">
                                        <table className="admin-tabela">
                                            <thead>
                                                <tr>
                                                    <th>Produto</th>
                                                    <th>Quantidade</th>
                                                    <th>Preço unitário</th>
                                                    <th>Subtotal</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {pedidoSelecionado.itens?.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.nome}</td>
                                                        <td>{item.quantidade}</td>
                                                        <td>
                                                            {formatarMoeda(item.preco_unitario)}
                                                        </td>
                                                        <td>
                                                            {formatarMoeda(item.subtotal)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <h2>Atualizar status</h2>

                                    <p>
                                        Status atual: <strong>{pedidoSelecionado.status}</strong>
                                    </p>

                                    <select
                                        value={pedidoSelecionado.status}
                                        disabled={atualizandoStatus}
                                        onChange={(e) => atualizarStatusPedido(e.target.value)}
                                    >
                                        <option value="pendente">Pendente</option>
                                        <option value="processando">Processando</option>
                                        <option value="enviado">Enviado</option>
                                        <option value="entregue">Entregue</option>
                                        <option value="cancelado">Cancelado</option>
                                    </select>

                                    {atualizandoStatus && (
                                        <p>Atualizando status...</p>
                                    )}

                                </div>
                            </>
                        )}

                    </section>

                ) : secao === "estoque" ? (

                    <section className="admin-produtos">

                        <section className="admin-topo">
                            <span className="subtitulo">
                                ADMINISTRAÇÃO
                            </span>

                            <h1>Controle de estoque</h1>

                            <p>
                                Consulte e atualize a quantidade disponível dos produtos.
                            </p>
                        </section>

                        <button
                            className="admin-voltar"
                            onClick={() => setSecao("dashboard")}
                        >
                            Voltar ao painel
                        </button>

                        {carregandoProdutos && (
                            <p>Carregando produtos...</p>
                        )}

                        {erroProdutos && (
                            <p role="alert">{erroProdutos}</p>
                        )}

                        {!carregandoProdutos && !erroProdutos && (
                            <>
                                <div className="admin-produtos-topo">
                                    <h2>Estoque dos produtos</h2>

                                    <span>
                                        {produtos.length} produto(s)
                                    </span>
                                </div>

                                {produtos.length === 0 ? (
                                    <p>Nenhum produto cadastrado.</p>
                                ) : (
                                    <div className="admin-tabela-container">
                                        <table className="admin-tabela">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Produto</th>
                                                    <th>Categoria</th>
                                                    <th>Quantidade disponível</th>
                                                    <th>Situação</th>
                                                    <th>Ação</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {produtos.map((produto) => (
                                                    <tr key={produto.id}>
                                                        <td>{produto.id}</td>
                                                        <td>{produto.nome}</td>
                                                        <td>
                                                            {produto.categoria || "Sem categoria"}
                                                        </td>
                                                        <td>{produto.estoque}</td>
                                                        <td>
                                                            <span className={
                                                                produto.ativo
                                                                    ? "admin-status ativo"
                                                                    : "admin-status inativo"
                                                            }>
                                                                {produto.ativo ? "Ativo" : "Inativo"}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="admin-acao-editar"
                                                                onClick={() => atualizarEstoqueProduto(produto)}
                                                            >
                                                                Atualizar estoque
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </>
                        )}

                    </section>

                ) : secao === "relatorios" ? (

                    <section className="admin-relatorios">

                        <section className="admin-topo">
                            <span className="subtitulo">
                                ADMINISTRAÇÃO
                            </span>

                            <h1>Relatórios</h1>

                            <p>
                                Acompanhe os indicadores gerais da ConectaTech.
                            </p>
                        </section>

                        <button
                            className="admin-voltar"
                            onClick={() => setSecao("dashboard")}
                        >
                            Voltar ao painel
                        </button>

                        <button
                            type="button"
                            className="admin-salvar-pdf"
                            onClick={salvarRelatorioPDF}
                        >
                            Salvar em PDF
                        </button>

                        {carregando && (
                            <p>Carregando indicadores...</p>
                        )}

                        {mensagemErro && (
                            <p role="alert">{mensagemErro}</p>
                        )}

                        {!carregando && resumo && (
                            <>
                                <section className="admin-relatorio-grupo">
                                    <h2>Visão geral</h2>

                                    <div className="admin-relatorio-cards">

                                        <div className="admin-relatorio-card">
                                            <span>Usuários cadastrados</span>
                                            <strong>{resumo.usuarios.total}</strong>
                                        </div>

                                        <div className="admin-relatorio-card">
                                            <span>Produtos cadastrados</span>
                                            <strong>{resumo.produtos.total}</strong>
                                        </div>

                                        <div className="admin-relatorio-card">
                                            <span>Total de pedidos</span>
                                            <strong>{resumo.pedidos.total}</strong>
                                        </div>

                                        <div className="admin-relatorio-card">
                                            <span>Faturamento</span>
                                            <strong>
                                                {formatarMoeda(resumo.pedidos.valor_total)}
                                            </strong>
                                        </div>

                                    </div>
                                </section>

                                <section className="admin-relatorio-grupo">
                                    <h2>Relatório de produtos</h2>

                                    <div className="admin-relatorio-lista">
                                        <div>
                                            <span>Produtos ativos</span>
                                            <strong>{resumo.produtos.ativos}</strong>
                                        </div>

                                        <div>
                                            <span>Produtos inativos</span>
                                            <strong>{resumo.produtos.inativos}</strong>
                                        </div>

                                        <div>
                                            <span>Produtos com estoque baixo</span>
                                            <strong>{resumo.produtos.estoque_baixo}</strong>
                                        </div>
                                    </div>
                                </section>

                                <section className="admin-relatorio-grupo">
                                    <h2>Relatório de pedidos</h2>

                                    <div className="admin-relatorio-lista">
                                        <div>
                                            <span>Pendentes</span>
                                            <strong>{resumo.pedidos.pendentes}</strong>
                                        </div>

                                        <div>
                                            <span>Em processamento</span>
                                            <strong>{resumo.pedidos.processando}</strong>
                                        </div>

                                        <div>
                                            <span>Enviados</span>
                                            <strong>{resumo.pedidos.enviados}</strong>
                                        </div>

                                        <div>
                                            <span>Entregues</span>
                                            <strong>{resumo.pedidos.entregues}</strong>
                                        </div>

                                        <div>
                                            <span>Cancelados</span>
                                            <strong>{resumo.pedidos.cancelados}</strong>
                                        </div>
                                    </div>
                                </section>

                                <p className="admin-relatorio-observacao">
                                    O faturamento considera os pedidos não cancelados.
                                    Os indicadores representam os dados gerais cadastrados
                                    na plataforma.
                                </p>
                            </>
                        )}

                    </section>

                ) : (
                    <section className="admin-produtos">
                        <h1>
                            {produtoEditando !== null
                                ? "Editar produto"
                                : "Novo produto"}
                        </h1>

                        <button
                            type="button"
                            className="admin-voltar"
                            onClick={() => {
                                limparFormulario();
                                setSecao("produtos");
                            }}
                        >
                            Voltar aos produtos
                        </button>

                        {mensagemFormulario && (
                            <p role="alert">{mensagemFormulario}</p>
                        )}

                        {carregandoCategorias ? (
                            <p>Carregando categorias...</p>
                        ) : (
                            <form
                                onSubmit={cadastrarProduto}
                                className="admin-formulario"
                            >
                                <label>Nome do produto</label>
                                <input
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />

                                <label>Descrição</label>
                                <textarea
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                />

                                <label>Preço</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={preco}
                                    onChange={(e) => setPreco(e.target.value)}
                                    required
                                />

                                <label>Categoria</label>
                                <select
                                    value={categoriaId}
                                    onChange={(e) => setCategoriaId(e.target.value)}
                                    required
                                >
                                    <option value="">
                                        Selecione uma categoria
                                    </option>

                                    {categorias.map((categoria) => (
                                        <option
                                            key={categoria.id}
                                            value={categoria.id}
                                        >
                                            {categoria.nome}
                                        </option>
                                    ))}
                                </select>

                                <label>Avaliação</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={avaliacao}
                                    onChange={(e) => setAvaliacao(e.target.value)}
                                />

                                <label>Estoque</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={estoque}
                                    onChange={(e) => setEstoque(e.target.value)}
                                    required
                                />

                                <label>Imagem do produto</label>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={(e) => {
                                        setImagem(e.target.files[0] || null);
                                    }}
                                />

                                {imagem && (
                                    <p>Nova imagem selecionada: {imagem.name}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={salvandoProduto}
                                >
                                    {salvandoProduto
                                        ? "Salvando..."
                                        : produtoEditando !== null
                                            ? "Salvar alterações"
                                            : "Cadastrar produto"}
                                </button>
                            </form>
                        )}
                    </section>
                )}


            </main>

            <Footer
                onSobre={onSobre}
                onSuporte={onSuporte}
            />
        </>
    );
}

export default Admin;

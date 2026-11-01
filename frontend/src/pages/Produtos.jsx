import { useEffect, useMemo, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { apiRequest } from "../services/api";

import "../styles/produtos.css";

import cadeira from "../assets/cadeira.png";
import monitor from "../assets/monitor.png";
import celular from "../assets/celular.png";
import fone from "../assets/fone.png";
import roteador from "../assets/roteador.png";
import ssd from "../assets/ssd.png";
import iphone from "../assets/iphone.png";
import macbook from "../assets/macbook.png";
import teclado from "../assets/teclado.png";
import mouse from "../assets/mouse.jpg";

const imagensLocais = {
    "cadeira.png": cadeira,
    "monitor.png": monitor,
    "celular.png": celular,
    "fone.png": fone,
    "roteador.png": roteador,
    "ssd.png": ssd,
};

function obterImagem(produto) {
    const imagem = produto.imagem || "";

    // Usa imagens locais quando o endereço cadastrado é fictício.
    if (
        !imagem ||
        imagem.includes("exemplo.com")
    ) {
        const nomeProduto = (produto.nome || "").toLowerCase();

        if (nomeProduto.includes("notebook")) {
            return macbook;
        }

        if (nomeProduto.includes("mouse")) {
            return mouse;
        }

        if (nomeProduto.includes("teclado")) {
            return teclado;
        }

        if (nomeProduto.includes("iphone")) {
            return iphone;
        }

        if (nomeProduto.includes("celular")) {
            return celular;
        }

        if (nomeProduto.includes("cadeira")) {
            return cadeira;
        }

        if (nomeProduto.includes("fone")) {
            return fone;
        }

        if (nomeProduto.includes("roteador")) {
            return roteador;
        }

        if (nomeProduto.includes("ssd")) {
            return ssd;
        }

        return monitor;
    }

    // Mantém imagens cadastradas com URLs válidas.
    if (
        imagem.startsWith("http://") ||
        imagem.startsWith("https://") ||
        imagem.startsWith("data:")
    ) {
        return imagem;
    }

    // Trata imagens armazenadas no servidor.
    if (imagem.startsWith("/uploads/")) {
        return `http://localhost:3000${imagem}`;
    }

    // Procura uma imagem local pelo nome do arquivo.
    const nomeArquivo = imagem.split("/").pop();

    if (imagensLocais[nomeArquivo]) {
        return imagensLocais[nomeArquivo];
    }

    return monitor;
}

function Produtos({
    estaLogado,
    token,
    categoriaInicial,
    onCategoriaAplicada,
    onCategoria,
    quantidadeCarrinho = 0,
    atualizarQuantidadeCarrinho,
    onLogin,
    onPerfil,
    onLogout,
    onCarrinho,
    onProdutos,
    onHome,
    onPedidos,
    onSobre,
    onSuporte,
}) {
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState(
        []
    );
    const [categoriasExpandidas, setCategoriasExpandidas] = useState(false);

    const [precoLimite, setPrecoLimite] = useState(5000);
    const [precoSelecionado, setPrecoSelecionado] = useState(5000);
    const [ordenacao, setOrdenacao] = useState("populares");

    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    const [adicionandoId, setAdicionandoId] = useState(null);
    const [mensagemCarrinho, setMensagemCarrinho] = useState("");
    const [erroCarrinho, setErroCarrinho] = useState(false);

    // Busca os produtos e as categorias no backend.
    useEffect(() => {
        async function carregarDados() {
            try {
                setCarregando(true);
                setErro("");

                const [dadosProdutos, dadosCategorias] = await Promise.all([
                    apiRequest("/produtos"),
                    apiRequest("/categorias"),
                ]);

                if (!Array.isArray(dadosProdutos)) {
                    throw new Error(
                        "A API não retornou uma lista válida de produtos."
                    );
                }

                if (!Array.isArray(dadosCategorias)) {
                    throw new Error(
                        "A API não retornou uma lista válida de categorias."
                    );
                }

                // Não exibe produtos marcados como inativos.
                const produtosAtivos = dadosProdutos.filter(
                    (produto) => produto.ativo !== false
                );

                setProdutos(produtosAtivos);
                setCategorias(dadosCategorias);

                // Ajusta a faixa de preço ao maior preço encontrado.
                const maiorPreco = produtosAtivos.reduce(
                    (maior, produto) => {
                        return Math.max(
                            maior,
                            Number(produto.preco) || 0
                        );
                    },
                    0
                );

                const limite = Math.max(1, Math.ceil(maiorPreco));

                setPrecoLimite(limite);
                setPrecoSelecionado(limite);
            } catch (error) {
                console.error(
                    "Erro ao carregar produtos e categorias:",
                    error
                );

                setErro(
                    error.message ||
                    "Não foi possível carregar os produtos."
                );
            } finally {
                setCarregando(false);
            }
        }

        carregarDados();
    }, []);

    // Marca ou desmarca uma categoria.
    function alternarCategoria(categoriaId) {
        setCategoriasSelecionadas((selecionadas) => {
            if (selecionadas.includes(categoriaId)) {
                return selecionadas.filter(
                    (id) => id !== categoriaId
                );
            }

            return [...selecionadas, categoriaId];
        });
    }

    // Aplica os filtros e a ordenação.
    const produtosFiltrados = useMemo(() => {
        let resultado = [...produtos];

        // Filtra pelas categorias selecionadas.
        if (categoriasSelecionadas.length > 0) {
            resultado = resultado.filter((produto) =>
                categoriasSelecionadas.includes(
                    Number(produto.categoria_id)
                )
            );
        }

        // Filtra pelo preço máximo selecionado.
        resultado = resultado.filter(
            (produto) => Number(produto.preco) <= precoSelecionado
        );

        // Ordena os produtos.
        if (ordenacao === "menor") {
            resultado.sort(
                (a, b) => Number(a.preco) - Number(b.preco)
            );
        } else if (ordenacao === "maior") {
            resultado.sort(
                (a, b) => Number(b.preco) - Number(a.preco)
            );
        } else {
            resultado.sort(
                (a, b) =>
                    Number(b.avaliacao || 0) -
                    Number(a.avaliacao || 0)
            );
        }

        return resultado;
    }, [
        produtos,
        categoriasSelecionadas,
        precoSelecionado,
        ordenacao,
    ]);
    useEffect(() => {
        if (!categoriaInicial || categorias.length === 0) {
            return;
        }

        const categoriaEncontrada = categorias.find(
            (categoria) =>
                categoria.nome.toLowerCase() === categoriaInicial.toLowerCase()
        );

        if (categoriaEncontrada) {
            setCategoriasSelecionadas([
                Number(categoriaEncontrada.id)
            ]);

            setCategoriasExpandidas(true);
        }

        if (onCategoriaAplicada) {
            onCategoriaAplicada();
        }
    }, [categoriaInicial, categorias, onCategoriaAplicada]);
    function formatarPreco(preco) {
        return Number(preco || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    async function adicionarAoCarrinho(produtoId) {
        if (!estaLogado || !token) {
            setErroCarrinho(true);
            setMensagemCarrinho(
                "Faça login para adicionar produtos ao carrinho."
            );
            return;
        }

        try {
            setAdicionandoId(produtoId);
            setMensagemCarrinho("");
            setErroCarrinho(false);

            const resposta = await apiRequest("/carrinho/itens", {
                method: "POST",
                token,
                body: JSON.stringify({
                    produto_id: produtoId,
                    quantidade: 1,
                }),
            });

            setMensagemCarrinho(
                resposta.mensagem || "Produto adicionado ao carrinho!"
            );

            // Atualiza o número exibido no cabeçalho.
            if (atualizarQuantidadeCarrinho) {
                await atualizarQuantidadeCarrinho(token);
            }
        } catch (erro) {
            setErroCarrinho(true);

            setMensagemCarrinho(
                erro.message || "Não foi possível adicionar o produto."
            );
        } finally {
            setAdicionandoId(null);
        }
    }

    return (
        <div className="produtos-page">
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

            <main className="produtos-container">
                <div className="titulo-produtos">
                    <h1>Produtos</h1>

                    <p>
                        Encontre os melhores equipamentos para sua
                        performance.
                    </p>
                </div>

                <div className="produtos-layout">
                    {/* MENU LATERAL */}
                    <aside className="filtros">
                        <div className="filtro-categorias">
                            <button
                                type="button"
                                className="filtro-categorias-titulo"
                                onClick={() =>
                                    setCategoriasExpandidas(!categoriasExpandidas)
                                }
                                aria-expanded={categoriasExpandidas}
                            >
                                <span>
                                    Categorias
                                    {categoriasSelecionadas.length > 0 && (
                                        <span className="categorias-contador">
                                            {" "}({categoriasSelecionadas.length})
                                        </span>
                                    )}
                                </span>

                                <span className="categorias-seta">
                                    {categoriasExpandidas ? "−" : "+"}
                                </span>
                            </button>

                            {categoriasExpandidas && (
                                <div className="filtro-categorias-lista">
                                    {categorias.length > 0 ? (
                                        categorias.map((categoria) => (
                                            <label key={categoria.id}>
                                                <input
                                                    type="checkbox"
                                                    checked={categoriasSelecionadas.includes(
                                                        Number(categoria.id)
                                                    )}
                                                    onChange={() =>
                                                        alternarCategoria(
                                                            Number(categoria.id)
                                                        )
                                                    }
                                                />

                                                {categoria.nome}
                                            </label>
                                        ))
                                    ) : (
                                        !carregando && (
                                            <p>Nenhuma categoria cadastrada.</p>
                                        )
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="filtro-separador"></div>

                        <h2> Faixa de Preço</h2>

                        <input
                            type="range"
                            min="0"
                            max={precoLimite}
                            value={Math.min(precoSelecionado, precoLimite)}
                            onChange={(evento) =>
                                setPrecoSelecionado(Number(evento.target.value))
                            }
                            className="preco-range"
                        />

                        <div className="preco-valores">
                            <span>R$ 0</span>

                            <span>
                                {formatarPreco(precoSelecionado)}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setCategoriasSelecionadas([]);
                                setPrecoSelecionado(precoLimite);
                                setOrdenacao("populares");
                            }}
                        >
                            Limpar filtros
                        </button>
                    </aside>

                    {/* ÁREA DOS PRODUTOS */}
                    <section className="produtos-area">
                        <div className="barra-produtos">
                            <p>
                                Mostrando{" "}
                                <strong>
                                    {produtosFiltrados.length}
                                </strong>{" "}
                                produtos
                            </p>

                            <div className="ordenar">
                                <span>Ordenar por:</span>

                                <select
                                    value={ordenacao}
                                    onChange={(evento) =>
                                        setOrdenacao(evento.target.value)
                                    }
                                >
                                    <option value="populares">
                                        Mais Populares
                                    </option>

                                    <option value="menor">
                                        Menor preço
                                    </option>

                                    <option value="maior">
                                        Maior preço
                                    </option>
                                </select>
                            </div>
                        </div>
                        {mensagemCarrinho && (
                            <div
                                className={`mensagem - carrinho ${erroCarrinho ? "mensagem-carrinho-erro" : ""
                                    } `}
                                role="status"
                            >
                                {mensagemCarrinho}
                            </div>
                        )}

                        {carregando && (
                            <p>
                                Carregando produtos...
                            </p>
                        )}

                        {!carregando && erro && (
                            <div className="produtos-mensagem erro">
                                <p>{erro}</p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        window.location.reload()
                                    }
                                >
                                    Tentar novamente
                                </button>
                            </div>
                        )}

                        {!carregando &&
                            !erro &&
                            produtosFiltrados.length === 0 && (
                                <p>
                                    Nenhum produto encontrado com os
                                    filtros selecionados.
                                </p>
                            )}

                        {!carregando && !erro && (
                            <div className="grid-produtos">
                                {produtosFiltrados.map((produto) => (
                                    <div
                                        className="card-produto"
                                        key={produto.id}
                                    >
                                        <div className="imagem-produto">
                                            <img
                                                src={obterImagem(produto)}
                                                alt={produto.nome}
                                            />
                                        </div>

                                        <div className="info-produto">
                                            <div className="avaliacao">
                                                <span>★</span>

                                                <small>
                                                    {Number(
                                                        produto.avaliacao || 0
                                                    ).toFixed(1)}
                                                </small>
                                            </div>

                                            <span>
                                                {produto.categoria ||
                                                    "Sem categoria"}
                                            </span>

                                            <h2>{produto.nome}</h2>

                                            <strong>
                                                {formatarPreco(
                                                    produto.preco
                                                )}
                                            </strong>

                                            <button
                                                type="button"
                                                disabled={adicionandoId === produto.id}
                                                onClick={() => adicionarAoCarrinho(produto.id)}
                                            >
                                                {adicionandoId === produto.id
                                                    ? "Adicionando..."
                                                    : "Adicionar ao Carrinho"}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>

            <Footer
                onSobre={onSobre}
                onSuporte={onSuporte}
                onCategoria={onCategoria}
            />
        </div>
    );
}

export default Produtos;
import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import "../styles/carrinho.css";
import Footer from "../components/Footer";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import { apiRequest } from "../services/api";

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

function obterImagemCarrinho(produto) {
  const imagemBanco = produto.imagem;
  const nomeProduto = (produto.nome || "").toLowerCase();

  // Utiliza a imagem do banco quando o endereço é válido.
  if (
    imagemBanco &&
    !imagemBanco.includes("exemplo.com")
  ) {
    return imagemBanco;
  }

  // Utiliza as imagens locais do projeto.
  if (nomeProduto.includes("notebook") || nomeProduto.includes("macbook")) {
    return macbook;
  }

  if (nomeProduto.includes("iphone")) {
    return iphone;
  }

  if (nomeProduto.includes("celular")) {
    return celular;
  }

  if (nomeProduto.includes("mouse")) {
    return mouse;
  }

  if (nomeProduto.includes("teclado")) {
    return teclado;
  }

  if (nomeProduto.includes("monitor")) {
    return monitor;
  }

  if (nomeProduto.includes("cadeira")) {
    return cadeira;
  }

  if (nomeProduto.includes("fone") || nomeProduto.includes("headset")) {
    return fone;
  }

  if (nomeProduto.includes("roteador")) {
    return roteador;
  }

  if (nomeProduto.includes("ssd")) {
    return ssd;
  }

  return null;
}

function Carrinho({
  estaLogado,
  token,
  onCategoria,
  quantidadeCarrinho = 0,
  atualizarQuantidadeCarrinho,
  onLogin,
  onPerfil,
  onLogout,
  onCarrinho,
  onProdutos,
  onHome,
  onFinalizarCompra,
  onPedidos,
  onSobre,
  onSuporte
}) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [atualizandoId, setAtualizandoId] = useState(null);
  const [itensSelecionados, setItensSelecionados] = useState([]);
  // Buscar os produtos reais do carrinho
  const carregarCarrinho = useCallback(async () => {
    if (!estaLogado || !token) {
      setProdutos([]);
      setCarregando(false);
      return;
    }

    try {
      setCarregando(true);
      setErro("");

      const resposta = await apiRequest("/carrinho", {
        token
      });

      const itens = resposta.carrinho?.itens || [];

      setProdutos(
        itens.map((item) => ({
          ...item,
          id: item.id,
          preco: Number(item.preco),
          subtotal: Number(item.subtotal),
          quantidade: Number(item.quantidade)
        }))
      );
      // Inicialmente, todos os produtos ficam selecionados.
      setItensSelecionados(itens.map((item) => item.id));

    } catch (erro) {
      setErro(erro.message || "Não foi possível carregar o carrinho.");
    } finally {
      setCarregando(false);
    }
  }, [estaLogado, token]);

  useEffect(() => {
    carregarCarrinho();
  }, [carregarCarrinho]);
  // Selecionar ou desmarcar um produto.
  function alternarSelecao(itemId) {
    setItensSelecionados((selecionados) =>
      selecionados.includes(itemId)
        ? selecionados.filter((id) => id !== itemId)
        : [...selecionados, itemId]
    );
  }

  // Selecionar ou desmarcar todos os produtos.
  function alternarTodos() {
    if (itensSelecionados.length === produtos.length) {
      setItensSelecionados([]);
    } else {
      setItensSelecionados(produtos.map((produto) => produto.id));
    }
  }
  // Atualizar a quantidade de um produto
  const alterarQuantidade = async (item, novaQuantidade) => {
    if (novaQuantidade < 1) {
      await removerProduto(item.id);
      return;
    }

    try {
      setAtualizandoId(item.id);
      setErro("");

      await apiRequest(`/carrinho/itens/${item.id}`, {
        method: "PUT",
        token,
        body: JSON.stringify({
          quantidade: novaQuantidade
        })
      });

      await carregarCarrinho();

      if (atualizarQuantidadeCarrinho) {
        await atualizarQuantidadeCarrinho(token);
      }
    } catch (erro) {
      setErro(erro.message || "Não foi possível atualizar a quantidade.");
    } finally {
      setAtualizandoId(null);
    }
  };

  // Remover produto do carrinho
  const removerProduto = async (itemId) => {
    try {
      setAtualizandoId(itemId);
      setErro("");

      await apiRequest(`/carrinho/itens/${itemId}`, {
        method: "DELETE",
        token
      });

      await carregarCarrinho();

      if (atualizarQuantidadeCarrinho) {
        await atualizarQuantidadeCarrinho(token);
      }
    } catch (erro) {
      setErro(erro.message || "Não foi possível remover o produto.");
    } finally {
      setAtualizandoId(null);
    }
  };

  // Calcular subtotal com os preços do banco de dados
  const produtosSelecionados = produtos.filter((produto) =>
    itensSelecionados.includes(produto.id)
  );

  const subtotal = produtosSelecionados.reduce(
    (total, produto) =>
      total + Number(produto.preco) * Number(produto.quantidade),
    0
  );

  const total = subtotal;

  return (
    <div className="carrinho-page">
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

      <main className="carrinho-container">
        <div className="carrinho-title">
          <h1>Meu Carrinho</h1>
          <p>
            Confira os produtos que você adicionou ao carrinho.
          </p>
        </div>

        <div className="carrinho-content">
          <section className="carrinho-produtos">
            <div className="carrinho-card">
              {!carregando && estaLogado && produtos.length > 0 && (
                <div className="selecionar-todos">
                  <label>
                    <input
                      type="checkbox"
                      checked={
                        produtos.length > 0 &&
                        produtos.every((produto) =>
                          itensSelecionados.includes(produto.id)
                        )
                      }
                      onChange={alternarTodos}
                    />

                    Selecionar todos os produtos
                  </label>
                </div>
              )}
              {carregando ? (
                <p>Carregando seu carrinho...</p>
              ) : !estaLogado ? (
                <div className="carrinho-vazio">
                  <ShoppingCart size={50} />
                  <h2>Faça login para acessar seu carrinho</h2>
                  <button
                    type="button"
                    className="continuar-button"
                    onClick={onLogin}
                  >
                    Fazer login
                  </button>
                </div>
              ) : erro && produtos.length === 0 ? (
                <div className="carrinho-vazio">
                  <h2>Não foi possível carregar o carrinho</h2>
                  <p>{erro}</p>
                  <button
                    type="button"
                    className="continuar-button"
                    onClick={carregarCarrinho}
                  >
                    Tentar novamente
                  </button>
                </div>
              ) : produtos.length === 0 ? (
                <div className="carrinho-vazio">
                  <ShoppingCart size={50} />
                  <h2>Seu carrinho está vazio</h2>
                  <p>
                    Adicione produtos para continuar.
                  </p>
                  <button
                    type="button"
                    className="continuar-button"
                    onClick={onProdutos}
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                produtos.map((produto) => (
                  <div
                    className="produto-carrinho"
                    key={produto.id}
                  >
                    <div className="produto-selecao">
                      <input
                        type="checkbox"
                        checked={itensSelecionados.includes(produto.id)}
                        onChange={() => alternarSelecao(produto.id)}
                        aria-label={`Selecionar ${produto.nome}`}
                      />
                    </div>

                    <div className="produto-imagem">
                      {obterImagemCarrinho(produto) ? (
                        <img
                          src={obterImagemCarrinho(produto)}
                          alt={produto.nome}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <ShoppingCart size={40} />
                      )}
                    </div>

                    <div className="produto-info">
                      <h2>{produto.nome}</h2>

                      <strong>
                        {produto.preco.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL"
                        })}
                      </strong>
                    </div>

                    <div className="produto-acoes">
                      <div className="quantidade">
                        <button
                          type="button"
                          disabled={atualizandoId === produto.id}
                          onClick={() =>
                            alterarQuantidade(
                              produto,
                              produto.quantidade - 1
                            )
                          }
                          aria-label="Diminuir quantidade"
                        >
                          <Minus size={15} />
                        </button>

                        <span>{produto.quantidade}</span>

                        <button
                          type="button"
                          disabled={atualizandoId === produto.id}
                          onClick={() =>
                            alterarQuantidade(
                              produto,
                              produto.quantidade + 1
                            )
                          }
                          aria-label="Aumentar quantidade"
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="remover-produto"
                        disabled={atualizandoId === produto.id}
                        onClick={() => removerProduto(produto.id)}
                        aria-label="Remover produto"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}

              {erro && produtos.length > 0 && (
                <p role="alert">{erro}</p>
              )}
            </div>
          </section>

          <aside className="resumo-carrinho">
            <div className="resumo-card">
              <h2>Resumo do Pedido</h2>

              <div className="resumo-linha">
                <span>Subtotal</span>
                <strong>
                  {subtotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </strong>
              </div>

              <div className="resumo-linha">
                <span>Frete</span>
                <strong className="frete-gratis">
                  Grátis
                </strong>
              </div>

              <div className="resumo-separador"></div>

              <div className="resumo-total">
                <span>Total</span>
                <strong>
                  {total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </strong>
              </div>

              <button
                type="button"
                className="finalizar-button"
                disabled={
                  !estaLogado ||
                  carregando ||
                  produtosSelecionados.length === 0
                }
                onClick={() => {
                  sessionStorage.setItem(
                    "conectaTechItensSelecionados",
                    JSON.stringify(
                      produtosSelecionados.map((produto) => produto.id)
                    )
                  );

                  onFinalizarCompra();
                }}
              >
                Finalizar Compra
              </button>

              <button
                type="button"
                className="continuar-button"
                onClick={onProdutos}
              >
                Continuar Comprando
              </button>
            </div>
          </aside>
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

export default Carrinho;
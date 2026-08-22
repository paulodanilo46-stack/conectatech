import { useState } from "react";
import Header from "../components/Header";
import "../styles/carrinho.css";
import Footer from "../components/Footer";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";

function Carrinho({
  estaLogado,
  onLogin,
  onPerfil,
  onLogout,
  onCarrinho,
  onProdutos,
  onHome,
  onFinalizarCompra
}) {

  const [produtos, setProdutos] = useState([
    {
      id: 1,
      nome: "MacBook Pro M3",
      descricao: "Apple · 16GB RAM · 512GB SSD",
      preco: 19999,
      quantidade: 1
    },
    {
      id: 2,
      nome: "Mouse Logitech MX Master 3S",
      descricao: "Sem fio · Bluetooth · USB-C",
      preco: 549,
      quantidade: 1
    }
  ]);

  // Aumentar quantidade
  const aumentarQuantidade = (id) => {
    setProdutos((produtosAtuais) =>
      produtosAtuais.map((produto) =>
        produto.id === id
          ? {
            ...produto,
            quantidade: produto.quantidade + 1
          }
          : produto
      )
    );
  };

  // Diminuir quantidade
  const diminuirQuantidade = (id) => {
    setProdutos((produtosAtuais) =>
      produtosAtuais
        .map((produto) =>
          produto.id === id
            ? {
              ...produto,
              quantidade: produto.quantidade - 1
            }
            : produto
        )
        .filter((produto) => produto.quantidade > 0)
    );
  };

  // Remover produto
  const removerProduto = (id) => {
    setProdutos((produtosAtuais) =>
      produtosAtuais.filter((produto) => produto.id !== id)
    );
  };

  // Calcular subtotal
  const subtotal = produtos.reduce(
    (total, produto) =>
      total + produto.preco * produto.quantidade,
    0
  );

  const total = subtotal;

  return (
    <div className="carrinho-page">

      <Header
        estaLogado={estaLogado}
        onLogin={onLogin}
        onPerfil={onPerfil}
        onLogout={onLogout}
        onCarrinho={onCarrinho}
        onProdutos={onProdutos}
        onHome={onHome}
      />

      <main className="carrinho-container">

        <div className="carrinho-title">
          <h1>Meu Carrinho</h1>
          <p>
            Confira os produtos que você adicionou ao carrinho.
          </p>
        </div>

        <div className="carrinho-content">

          {/* Produtos */}
          <section className="carrinho-produtos">

            <div className="carrinho-card">

              {produtos.length === 0 ? (

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

                    <div className="produto-imagem">
                      <ShoppingCart size={40} />
                    </div>

                    <div className="produto-info">

                      <h2>{produto.nome}</h2>

                      <p>{produto.descricao}</p>

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
                          onClick={() =>
                            diminuirQuantidade(produto.id)
                          }
                        >
                          <Minus size={15} />
                        </button>

                        <span>
                          {produto.quantidade}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            aumentarQuantidade(produto.id)
                          }
                        >
                          <Plus size={15} />
                        </button>

                      </div>

                      <button
                        type="button"
                        className="remover-produto"
                        onClick={() =>
                          removerProduto(produto.id)
                        }
                        aria-label="Remover produto"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </div>

                ))

              )}

            </div>

          </section>

          {/* Resumo */}
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
                disabled={produtos.length === 0}
                onClick={onFinalizarCompra}
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
      <Footer />
    </div>

  );
}

export default Carrinho;
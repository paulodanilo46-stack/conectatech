import Header from "../components/Header";
import "../styles/finalizarCompra.css";

function FinalizarCompra({
  estaLogado,
  onLogin,
  onPerfil,
  onLogout,
  onCarrinho,
  onProdutos,
  onHome
}) {
  return (
    <div className="finalizar-page">

      <Header
        estaLogado={estaLogado}
        onLogin={onLogin}
        onPerfil={onPerfil}
        onLogout={onLogout}
        onCarrinho={onCarrinho}
        onProdutos={onProdutos}
        onHome={onHome}
      />

      <main className="finalizar-container">

        <div className="finalizar-title">
          <h1>Finalizar Compra</h1>
          <p>
            Confira seu pedido e informe os dados para entrega.
          </p>
        </div>

        <div className="finalizar-content">

          {/* Dados da entrega */}
          <section className="dados-entrega">

            <div className="finalizar-card">

              <h2>Dados de Entrega</h2>

              <div className="form-grid">

                <div className="campo">
                  <label htmlFor="nome">
                    Nome completo
                  </label>

                  <input
                    id="nome"
                    type="text"
                    placeholder="Digite seu nome"
                  />
                </div>

                <div className="campo">
                  <label htmlFor="telefone">
                    Telefone
                  </label>

                  <input
                    id="telefone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div className="campo">
                  <label htmlFor="cep">
                    CEP
                  </label>

                  <input
                    id="cep"
                    type="text"
                    placeholder="00000-000"
                  />
                </div>

                <div className="campo">
                  <label htmlFor="cidade">
                    Cidade
                  </label>

                  <input
                    id="cidade"
                    type="text"
                    placeholder="Cidade"
                  />
                </div>

                <div className="campo campo-maior">
                  <label htmlFor="endereco">
                    Endereço
                  </label>

                  <input
                    id="endereco"
                    type="text"
                    placeholder="Rua, avenida..."
                  />
                </div>

                <div className="campo">
                  <label htmlFor="numero">
                    Número
                  </label>

                  <input
                    id="numero"
                    type="text"
                    placeholder="Número"
                  />
                </div>

                <div className="campo">
                  <label htmlFor="complemento">
                    Complemento
                  </label>

                  <input
                    id="complemento"
                    type="text"
                    placeholder="Apartamento, bloco..."
                  />
                </div>

              </div>

            </div>

            {/* Pagamento */}
            <div className="finalizar-card">

              <h2>Forma de Pagamento</h2>

              <div className="pagamento-opcoes">

                <label className="pagamento-option">
                  <input
                    type="radio"
                    name="pagamento"
                  />

                  <span>Cartão de crédito</span>
                </label>

                <label className="pagamento-option">
                  <input
                    type="radio"
                    name="pagamento"
                  />

                  <span>Pix</span>
                </label>

                <label className="pagamento-option">
                  <input
                    type="radio"
                    name="pagamento"
                  />

                  <span>Boleto</span>
                </label>

              </div>

            </div>

          </section>

          {/* Resumo */}
          <aside className="resumo-finalizacao">

            <div className="resumo-card-finalizacao">

              <h2>Resumo do Pedido</h2>

              <div className="pedido-item">
                <div>
                  <strong>MacBook Pro M3</strong>
                  <span>Quantidade: 1</span>
                </div>

                <strong>R$ 19.999,00</strong>
              </div>

              <div className="pedido-item">
                <div>
                  <strong>Mouse Logitech MX Master 3S</strong>
                  <span>Quantidade: 1</span>
                </div>

                <strong>R$ 549,00</strong>
              </div>

              <div className="resumo-separador"></div>

              <div className="resumo-linha-final">
                <span>Subtotal</span>
                <strong>R$ 20.548,00</strong>
              </div>

              <div className="resumo-linha-final">
                <span>Frete</span>
                <strong className="frete-gratis">
                  Grátis
                </strong>
              </div>

              <div className="resumo-total-final">
                <span>Total</span>
                <strong>R$ 20.548,00</strong>
              </div>

              <button
                type="button"
                className="confirmar-button"
              >
                Confirmar Pedido
              </button>

              <button
                type="button"
                className="voltar-carrinho-button"
                onClick={onCarrinho}
              >
                Voltar ao Carrinho
              </button>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}

export default FinalizarCompra;
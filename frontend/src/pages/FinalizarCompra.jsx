import { useState, useEffect } from "react";
import Header from "../components/Header";
import "../styles/finalizarCompra.css";
import Footer from "../components/Footer";
import { apiRequest } from "../services/api";

function FinalizarCompra({
  estaLogado,
  token,
  quantidadeCarrinho,
  atualizarQuantidadeCarrinho,
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
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState("");
  const [carregandoEnderecos, setCarregandoEnderecos] = useState(true);
  const [erroEndereco, setErroEndereco] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [dadosEndereco, setDadosEndereco] = useState({
    nome: "",
    telefone: "",
    cep: "",
    cidade: "",
    endereco: "",
    numero: "",
    complemento: ""
  });
  const [salvandoEndereco, setSalvandoEndereco] = useState(false);
  const [erroSalvarEndereco, setErroSalvarEndereco] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [enviandoPedido, setEnviandoPedido] = useState(false);
  const [erroPedido, setErroPedido] = useState("");

  useEffect(() => {
    async function carregarProdutosSelecionados() {
      if (!estaLogado || !token) {
        setProdutos([]);
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        setErro("");

        const idsSalvos = JSON.parse(
          sessionStorage.getItem("conectaTechItensSelecionados") || "[]"
        );

        if (idsSalvos.length === 0) {
          setProdutos([]);
          return;
        }

        const resposta = await apiRequest("/carrinho", { token });

        const itens = resposta.carrinho?.itens || [];

        const selecionados = itens
          .filter((item) =>
            idsSalvos.some((id) => String(id) === String(item.id))
          )
          .map((item) => ({
            ...item,
            preco: Number(item.preco),
            quantidade: Number(item.quantidade)
          }));

        setProdutos(selecionados);

        if (selecionados.length === 0) {
          setErro(
            "Não encontramos os produtos selecionados. Volte ao carrinho e selecione os produtos novamente."
          );
        }
      } catch (erro) {
        setErro(erro.message || "Não foi possível carregar os produtos.");
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutosSelecionados();
  }, [estaLogado, token]);
  const subtotal = produtos.reduce(
    (total, produto) =>
      total + produto.preco * produto.quantidade,
    0
  );

  const total = subtotal;

  useEffect(() => {
    async function carregarEnderecos() {
      if (!estaLogado || !token) {
        setEnderecos([]);
        setCarregandoEnderecos(false);
        setEnderecoSelecionado("");
        setMostrarFormulario(false);
        return;
      }

      try {
        setCarregandoEnderecos(true);
        setErroEndereco("");

        const resposta = await apiRequest("/enderecos", {
          token
        });

        const lista = resposta.enderecos || [];

        setEnderecos(lista);

        if (lista.length > 0) {
          setEnderecoSelecionado(String(lista[0].id));
          setMostrarFormulario(false);
        } else {
          setEnderecoSelecionado("");
          setMostrarFormulario(true);
        }

      } catch (erro) {
        setErroEndereco(
          erro.message || "Não foi possível carregar os endereços."
        );
      } finally {
        setCarregandoEnderecos(false);
      }
    }

    carregarEnderecos();
  }, [estaLogado, token]);
  const enderecoAtual = enderecos.find(
    (endereco) => String(endereco.id) === String(enderecoSelecionado)
  );
  async function salvarEndereco() {
    const camposObrigatorios = [
      "nome",
      "telefone",
      "cep",
      "cidade",
      "endereco",
      "numero"
    ];

    const campoVazio = camposObrigatorios.some(
      (campo) => !dadosEndereco[campo].trim()
    );

    if (campoVazio) {
      setErroSalvarEndereco("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setSalvandoEndereco(true);
      setErroSalvarEndereco("");

      const resposta = await apiRequest("/enderecos", {
        method: "POST",
        token,
        body: JSON.stringify(dadosEndereco)
      });

      const novoEndereco = resposta.endereco;

      setEnderecos((atuais) => [novoEndereco, ...atuais]);

      setEnderecoSelecionado(String(novoEndereco.id));

      setMostrarFormulario(false);

      setDadosEndereco({
        nome: "",
        telefone: "",
        cep: "",
        cidade: "",
        endereco: "",
        numero: "",
        complemento: ""
      });

    } catch (erro) {
      setErroSalvarEndereco(
        erro.message || "Não foi possível salvar o endereço."
      );
    } finally {
      setSalvandoEndereco(false);
    }
  }
  async function confirmarPedido() {
    // Verificar se existe endereço selecionado
    if (!enderecoSelecionado || mostrarFormulario) {
      setErroPedido("Selecione ou cadastre um endereço de entrega.");
      return;
    }

    // Verificar forma de pagamento
    if (!formaPagamento) {
      setErroPedido("Selecione uma forma de pagamento.");
      return;
    }

    // Verificar produtos
    if (produtos.length === 0) {
      setErroPedido("Não existem produtos selecionados para a compra.");
      return;
    }

    try {
      setEnviandoPedido(true);
      setErroPedido("");

      // Recuperar os IDs dos itens selecionados no carrinho
      const itensIds = JSON.parse(
        sessionStorage.getItem("conectaTechItensSelecionados") || "[]"
      );

      if (itensIds.length === 0) {
        setErroPedido("Não foi possível identificar os produtos selecionados.");
        return;
      }

      // Enviar os dados para o backend
      await apiRequest("/pedidos", {
        method: "POST",
        token,
        body: JSON.stringify({
          endereco_id: Number(enderecoSelecionado),
          forma_pagamento: formaPagamento,
          itens: itensIds
        })
      });

      // Limpar a seleção após a compra concluída
      sessionStorage.removeItem("conectaTechItensSelecionados");

      // Atualizar a quantidade do carrinho consultando o backend
      if (atualizarQuantidadeCarrinho) {
        await atualizarQuantidadeCarrinho(token);
      }

      // Encaminhar para a tela de pedidos
      if (onPedidos) {
        onPedidos();
      }

    } catch (erro) {
      setErroPedido(
        erro.message || "Não foi possível finalizar o pedido."
      );
    } finally {
      setEnviandoPedido(false);
    }
  }
  return (
    <div className="finalizar-page">

      <Header
        estaLogado={estaLogado}
        quantidadeCarrinho={quantidadeCarrinho}
        atualizarQuantidadeCarrinho={atualizarQuantidadeCarrinho}
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

              {carregandoEnderecos ? (
                <p>Carregando endereços cadastrados...</p>
              ) : erroEndereco ? (
                <p role="alert">{erroEndereco}</p>
              ) : (
                <>
                  {enderecos.length > 0 && (
                    <div className="campo">
                      <label htmlFor="enderecoSelecionado">
                        Escolha o endereço de entrega
                      </label>

                      <select
                        id="enderecoSelecionado"
                        value={enderecoSelecionado}
                        onChange={(e) => {
                          setEnderecoSelecionado(e.target.value);
                          setMostrarFormulario(false);
                        }}
                      >
                        {enderecos.map((endereco) => (
                          <option key={endereco.id} value={String(endereco.id)}>
                            {endereco.endereco}, nº {endereco.numero} - {endereco.cidade}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {enderecoAtual && !mostrarFormulario && (
                    <div className="endereco-selecionado">
                      <h3>Endereço selecionado</h3>

                      <p><strong>Nome:</strong> {enderecoAtual.nome}</p>
                      <p><strong>Telefone:</strong> {enderecoAtual.telefone}</p>
                      <p><strong>CEP:</strong> {enderecoAtual.cep}</p>
                      <p><strong>Cidade:</strong> {enderecoAtual.cidade}</p>
                      <p>
                        <strong>Endereço:</strong> {enderecoAtual.endereco}, nº {enderecoAtual.numero}
                      </p>
                      {enderecoAtual.complemento && (
                        <p>
                          <strong>Complemento:</strong> {enderecoAtual.complemento}
                        </p>
                      )}
                    </div>
                  )}

                  {!mostrarFormulario && enderecos.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setDadosEndereco({
                          nome: "",
                          telefone: "",
                          cep: "",
                          cidade: "",
                          endereco: "",
                          numero: "",
                          complemento: ""
                        });
                        setMostrarFormulario(true);
                      }}
                    >
                      Cadastrar novo endereço
                    </button>
                  )}

                  {mostrarFormulario && (
                    <>
                      <div className="form-grid">

                        <div className="campo">
                          <label htmlFor="nome">Nome completo</label>
                          <input
                            id="nome"
                            type="text"
                            placeholder="Digite seu nome"
                            value={dadosEndereco.nome}
                            onChange={(e) =>
                              setDadosEndereco({
                                ...dadosEndereco,
                                nome: e.target.value
                              })
                            }
                          />
                        </div>

                        <div className="campo">
                          <label htmlFor="telefone">Telefone</label>
                          <input
                            id="telefone"
                            type="tel"
                            placeholder="(00) 00000-0000"
                            maxLength={15}
                            value={dadosEndereco.telefone}
                            onChange={(e) => {
                              let valor = e.target.value.replace(/\D/g, "");

                              if (valor.length > 11) valor = valor.slice(0, 11);

                              if (valor.length > 10) {
                                valor = valor.replace(
                                  /^(\d{2})(\d{5})(\d{0,4})$/,
                                  "($1) $2-$3"
                                );
                              } else if (valor.length > 6) {
                                valor = valor.replace(
                                  /^(\d{2})(\d{4})(\d{0,4})$/,
                                  "($1) $2-$3"
                                );
                              } else if (valor.length > 2) {
                                valor = valor.replace(
                                  /^(\d{2})(\d{0,5})$/,
                                  "($1) $2"
                                );
                              }

                              setDadosEndereco({
                                ...dadosEndereco,
                                telefone: valor
                              });
                            }}
                          />
                        </div>

                        <div className="campo">
                          <label htmlFor="cep">CEP</label>
                          <input
                            id="cep"
                            type="text"
                            placeholder="00000-000"
                            maxLength={9}
                            value={dadosEndereco.cep}
                            onChange={(e) => {
                              let valor = e.target.value.replace(/\D/g, "");

                              if (valor.length > 8) valor = valor.slice(0, 8);

                              if (valor.length > 5) {
                                valor = valor.replace(
                                  /^(\d{5})(\d{0,3})$/,
                                  "$1-$2"
                                );
                              }

                              setDadosEndereco({
                                ...dadosEndereco,
                                cep: valor
                              });
                            }}
                          />
                        </div>

                        <div className="campo">
                          <label htmlFor="cidade">Cidade</label>
                          <input
                            id="cidade"
                            type="text"
                            placeholder="Cidade"
                            value={dadosEndereco.cidade}
                            onChange={(e) =>
                              setDadosEndereco({
                                ...dadosEndereco,
                                cidade: e.target.value
                              })
                            }
                          />
                        </div>

                        <div className="campo campo-maior">
                          <label htmlFor="endereco">Endereço</label>
                          <input
                            id="endereco"
                            type="text"
                            placeholder="Rua, avenida..."
                            value={dadosEndereco.endereco}
                            onChange={(e) =>
                              setDadosEndereco({
                                ...dadosEndereco,
                                endereco: e.target.value
                              })
                            }
                          />
                        </div>

                        <div className="campo">
                          <label htmlFor="numero">Número</label>
                          <input
                            id="numero"
                            type="text"
                            placeholder="Número"
                            value={dadosEndereco.numero}
                            onChange={(e) =>
                              setDadosEndereco({
                                ...dadosEndereco,
                                numero: e.target.value
                              })
                            }
                          />
                        </div>

                        <div className="campo">
                          <label htmlFor="complemento">Complemento</label>
                          <input
                            id="complemento"
                            type="text"
                            placeholder="Apartamento, bloco..."
                            value={dadosEndereco.complemento}
                            onChange={(e) =>
                              setDadosEndereco({
                                ...dadosEndereco,
                                complemento: e.target.value
                              })
                            }
                          />
                        </div>

                      </div>
                      {erroSalvarEndereco && (
                        <p role="alert"> {erroSalvarEndereco} </p>
                      )}
                      <button
                        type="button"
                        onClick={salvarEndereco}
                        disabled={salvandoEndereco}
                      >
                        {salvandoEndereco ? "Salvando..." : "Salvar endereço"}
                      </button>

                      {enderecos.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setErroSalvarEndereco("");
                            setMostrarFormulario(false);
                          }}
                        >
                          Usar endereço já cadastrado
                        </button>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

            {/* Pagamento */}
            <div className="finalizar-card">

              <h2>Forma de Pagamento</h2>

              <div className="pagamento-opcoes">

                <label className="pagamento-option">
                  <input
                    type="radio"
                    name="pagamento"
                    value="Cartão de crédito"
                    checked={formaPagamento === "Cartão de crédito"}
                    onChange={(e) => setFormaPagamento(e.target.value)}
                  />

                  <span>Cartão de crédito</span>
                </label>

                <label className="pagamento-option">
                  <input
                    type="radio"
                    name="pagamento"
                    value="Pix"
                    checked={formaPagamento === "Pix"}
                    onChange={(e) => setFormaPagamento(e.target.value)}
                  />

                  <span>Pix</span>
                </label>

                <label className="pagamento-option">
                  <input
                    type="radio"
                    name="pagamento"
                    value="Boleto"
                    checked={formaPagamento === "Boleto"}
                    onChange={(e) => setFormaPagamento(e.target.value)}
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

              {carregando ? (
                <p>Carregando produtos selecionados...</p>
              ) : erro ? (
                <p role="alert">{erro}</p>
              ) : produtos.length === 0 ? (
                <p>Nenhum produto selecionado para a compra.</p>
              ) : (
                produtos.map((produto) => (
                  <div className="pedido-item" key={produto.id}>
                    <div>
                      <strong>{produto.nome}</strong>
                      <span>Quantidade: {produto.quantidade}</span>
                    </div>

                    <strong>
                      {(produto.preco * produto.quantidade).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                      })}
                    </strong>
                  </div>
                ))
              )}

              <div className="resumo-separador"></div>

              <div className="resumo-linha-final">
                <span>Subtotal</span>
                <strong>
                  {subtotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </strong>
              </div>

              <div className="resumo-linha-final">
                <span>Frete</span>
                <strong className="frete-gratis">Grátis</strong>
              </div>

              <div className="resumo-total-final">
                <span>Total</span>
                <strong>
                  {total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </strong>
              </div>

              {erroPedido && (
                <p role="alert" className="erro-pedido">
                  {erroPedido}
                </p>
              )}

              <button
                type="button"
                className="confirmar-button"
                onClick={confirmarPedido}
                disabled={enviandoPedido || carregando || produtos.length === 0}
              >
                {enviandoPedido ? "Finalizando pedido..." : "Confirmar Pedido"}
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

      </main >
      <Footer
        onSobre={onSobre}
        onSuporte={onSuporte}
      />
    </div >
  );
}

export default FinalizarCompra;
import { useState, useEffect } from "react";
import { apiRequest } from "../services/api.js";

import "../styles/perfil.css";
import { User, Package, Truck, Edit3, LogOut } from "lucide-react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer";

function Perfil({
    estaLogado,
    usuario,
    token,
    quantidadeCarrinho = 0,
    atualizarQuantidadeCarrinho,
    onLogin,
    onPerfil,
    onLogout,
    onCategoria,
    onCarrinho,
    onProdutos,
    onHome,
    onPedidos,
    onSobre,
    onSuporte
}) {
    const [dadosPerfil, setDadosPerfil] = useState({
        nome: "",
        email: "",
        telefone: "",
        cpf: ""
    });
    const [editando, setEditando] = useState(false);
    const [salvando, setSalvando] = useState(false);
    const [mensagemSucesso, setMensagemSucesso] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [mensagemErro, setMensagemErro] = useState("");

    useEffect(() => {
        const buscarPerfil = async () => {
            if (!token) {
                setCarregando(false);
                setMensagemErro("Faça login para visualizar seu perfil.");
                return;
            }

            try {
                setCarregando(true);
                setMensagemErro("");

                const resposta = await apiRequest("/usuarios/perfil", {
                    token
                });

                setDadosPerfil({
                    nome: resposta.usuario?.nome || "",
                    email: resposta.usuario?.email || "",
                    telefone: resposta.usuario?.telefone || "",
                    cpf: resposta.usuario?.cpf || ""
                });
            } catch (erro) {
                console.error("Erro ao buscar perfil:", erro);

                setMensagemErro(
                    erro.message || "Não foi possível carregar os dados do perfil."
                );
            } finally {
                setCarregando(false);
            }
        };

        buscarPerfil();
    }, [token]);

    const salvarPerfil = async (evento) => {
        evento.preventDefault();

        if (!token) {
            setMensagemErro("Sua sessão expirou. Faça login novamente.");
            return;
        }

        try {
            setSalvando(true);
            setMensagemErro("");
            setMensagemSucesso("");

            const resposta = await apiRequest("/usuarios/perfil", {
                method: "PUT",
                token,
                body: {
                    nome: dadosPerfil.nome,
                    telefone: dadosPerfil.telefone,
                    cpf: dadosPerfil.cpf
                }
            });

            setDadosPerfil({
                nome: resposta.usuario.nome || "",
                email: resposta.usuario.email || "",
                telefone: resposta.usuario.telefone || "",
                cpf: resposta.usuario.cpf || ""
            });

            setEditando(false);
            setMensagemSucesso("Perfil atualizado com sucesso!");

        } catch (erro) {
            console.error("Erro ao atualizar perfil:", erro);

            setMensagemErro(
                erro.message || "Não foi possível atualizar o perfil."
            );
        } finally {
            setSalvando(false);
        }
    };
    return (
        <div className="perfil-page">
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
            {/* Conteúdo principal */}
            <main className="perfil-container">
                {carregando && (
                    <p>Carregando dados do perfil...</p>
                )}

                {mensagemErro && (
                    <p role="alert">{mensagemErro}</p>
                )}

                {mensagemSucesso && (
                    <p role="status">{mensagemSucesso}</p>
                )}

                {/* Título */}
                <div className="perfil-title">
                    <h1>{dadosPerfil.nome || "Meu Perfil"}</h1>
                    <p>Gerencie seus dados e acompanhe seus pedidos.</p>
                </div>

                <div className="perfil-content">

                    {/* Menu lateral */}
                    <aside className="perfil-sidebar">

                        <div className="perfil-user">

                            <div className="perfil-avatar">
                                JS
                            </div>

                            <div>
                                <h3>{dadosPerfil.nome || "Nome não informado"}</h3>
                                <p>{dadosPerfil.email || "E-mail não informado"}</p>
                            </div>

                        </div>

                        <div className="perfil-menu">

                            <button className="perfil-menu-active">
                                <User size={18} />
                                Meus Dados
                            </button>

                            <button>
                                <Package size={18} />
                                Meus Pedidos
                            </button>

                            <button className="perfil-logout">
                                <LogOut size={18} />
                                Sair
                            </button>

                        </div>

                    </aside>

                    <nav className="perfil-mobile-menu" aria-label="Navegação do perfil">
                        <button
                            type="button"
                            className="perfil-mobile-item ativo"
                            onClick={onPerfil}
                        >
                            <User size={20} />
                            <span>Meus Dados</span>
                        </button>

                        <button
                            type="button"
                            className="perfil-mobile-item"
                            onClick={onPedidos}
                        >
                            <Package size={20} />
                            <span>Meus Pedidos</span>
                        </button>


                        <button
                            type="button"
                            className="perfil-mobile-item sair"
                            onClick={onLogout}
                        >
                            <LogOut size={20} />
                            <span>Sair</span>
                        </button>
                    </nav>

                    {/* Área dos dados */}
                    <section className="perfil-main">

                        <div className="perfil-card">

                            <div className="perfil-card-header">
                                <div>
                                    <h2>Meus Dados</h2>
                                    <p>Confira as informações da sua conta.</p>
                                </div>

                                <div className="perfil-big-avatar">
                                    JS
                                </div>
                            </div>

                            <form id="formulario-perfil" className="perfil-form" onSubmit={salvarPerfil}>

                                <div className="perfil-field">
                                    <label>Nome Completo</label>
                                    <input
                                        type="text"
                                        value={dadosPerfil.nome}
                                        onChange={(e) =>
                                            setDadosPerfil({
                                                ...dadosPerfil,
                                                nome: e.target.value
                                            })
                                        }
                                        readOnly={!editando}
                                        required
                                    />
                                </div>

                                <div className="perfil-field">
                                    <label>E-mail</label>
                                    <input
                                        type="email"
                                        value={dadosPerfil.email}
                                        readOnly
                                    />
                                </div>

                                <div className="perfil-field">
                                    <label>Telefone</label>
                                    <input
                                        type="tel"
                                        value={dadosPerfil.telefone}
                                        onChange={(e) =>
                                            setDadosPerfil({
                                                ...dadosPerfil,
                                                telefone: e.target.value
                                            })
                                        }
                                        readOnly={!editando}
                                    />
                                </div>

                                <div className="perfil-field">
                                    <label>CPF</label>
                                    <input
                                        type="text"
                                        value={dadosPerfil.cpf}
                                        onChange={(e) =>
                                            setDadosPerfil({
                                                ...dadosPerfil,
                                                cpf: e.target.value
                                            })
                                        }
                                        readOnly={!editando}
                                    />
                                </div>

                            </form>

                            {editando ? (
                                <div className="perfil-acoes">
                                    <button
                                        type="submit"
                                        form="formulario-perfil"
                                        className="editar-perfil-button"
                                        disabled={salvando}
                                    >
                                        {salvando ? "Salvando..." : "Salvar alterações"}
                                    </button>

                                    <button
                                        type="button"
                                        className="cancelar-perfil-button"
                                        onClick={() => {
                                            setEditando(false);
                                            setMensagemErro("");
                                            setMensagemSucesso("");
                                            setDadosPerfil({
                                                nome: usuario?.nome || "",
                                                email: usuario?.email || "",
                                                telefone: usuario?.telefone || "",
                                                cpf: usuario?.cpf || ""
                                            });
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className="editar-perfil-button"
                                    onClick={() => {
                                        setMensagemErro("");
                                        setMensagemSucesso("");
                                        setEditando(true);
                                    }}
                                >
                                    <Edit3 size={17} />
                                    Editar Perfil
                                </button>
                            )}

                        </div>

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

export default Perfil;
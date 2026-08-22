import "../styles/perfil.css";
import { User, Package, Truck, Edit3, LogOut } from "lucide-react";
import Header from "../components/Header.jsx";

function Perfil({
    estaLogado,
    onLogin,
    onPerfil,
    onLogout,
    onCarrinho,
    onProdutos,
    onHome
}) {
    return (
        <div className="perfil-page">
            <Header
                estaLogado={estaLogado}
                onLogin={onLogin}
                onPerfil={onPerfil}
                onLogout={onLogout}
                onCarrinho={onCarrinho}
                onProdutos={onProdutos}
                onHome={onHome}
            />
            {/* Conteúdo principal */}
            <main className="perfil-container">

                {/* Título */}
                <div className="perfil-title">
                    <h1>Meu Perfil</h1>
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
                                <h3>João da Silva</h3>
                                <p>joao@email.com</p>
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

                            <button>
                                <Truck size={18} />
                                Acompanhar Pedido
                            </button>

                            <button>
                                <Edit3 size={18} />
                                Editar Perfil
                            </button>

                            <button className="perfil-logout">
                                <LogOut size={18} />
                                Sair
                            </button>

                        </div>

                    </aside>

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

                            <div className="perfil-form">

                                <div className="perfil-field">
                                    <label>Nome Completo</label>
                                    <input
                                        type="text"
                                        value="João da Silva"
                                        readOnly
                                    />
                                </div>

                                <div className="perfil-field">
                                    <label>E-mail</label>
                                    <input
                                        type="email"
                                        value="joao@email.com"
                                        readOnly
                                    />
                                </div>

                                <div className="perfil-field">
                                    <label>Telefone</label>
                                    <input
                                        type="text"
                                        value="(11) 99999-9999"
                                        readOnly
                                    />
                                </div>

                                <div className="perfil-field">
                                    <label>CPF</label>
                                    <input
                                        type="text"
                                        value="000.000.000-00"
                                        readOnly
                                    />
                                </div>

                            </div>

                            <button className="editar-perfil-button">
                                <Edit3 size={17} />
                                Editar Perfil
                            </button>

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
}

export default Perfil;
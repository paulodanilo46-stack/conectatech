
import { useState } from "react";
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    LogOut,
    Menu,
    X
} from "lucide-react";

import "../styles/adminHeader.css";

function AdminHeader({
    onHome,
    onProdutos,
    onPedidos,
    onUsuarios,
    onLogout
}) {
    const [menuAberto, setMenuAberto] = useState(false);

    const navegar = (funcao) => {
        setMenuAberto(false);

        if (funcao) {
            funcao();
        }
    };

    return (
        <header className="admin-header">

            <div
                className="admin-header-logo"
                onClick={() => navegar(onHome)}
            >
                <div className="admin-header-logo-icon">C</div>

                <h1>
                    Conecta<span>Tech</span>
                </h1>

                <span className="admin-header-tag">
                    ADMIN
                </span>
            </div>

            <nav className={`admin-header-nav ${menuAberto ? "aberto" : ""}`}>

                <button onClick={() => navegar(onHome)}>
                    <LayoutDashboard size={18} />
                    Painel
                </button>

                <button
                    onClick={() => navegar(onProdutos)}
                    disabled={!onProdutos}
                    title={!onProdutos ? "Em breve" : "Gerenciar produtos"}
                >
                    <Package size={18} />
                    Produtos
                </button>

                <button
                    onClick={() => navegar(onPedidos)}
                    disabled={!onPedidos}
                    title={!onPedidos ? "Em breve" : "Gerenciar pedidos"}
                >
                    <ShoppingBag size={18} />
                    Pedidos
                </button>

                <button
                    className="admin-header-sair"
                    onClick={() => navegar(onLogout)}
                >
                    <LogOut size={18} />
                    Sair
                </button>

            </nav>

            <button
                className="admin-header-menu"
                onClick={() => setMenuAberto(!menuAberto)}
                aria-label="Abrir menu administrativo"
            >
                {menuAberto ? <X size={24} /> : <Menu size={24} />}
            </button>

        </header>
    );
}

export default AdminHeader;

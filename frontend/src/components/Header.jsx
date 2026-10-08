import { useState } from "react";
import "./../styles/header.css";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  Package,
  CircleUser,
  Info,
  Headphones,
  LogOut,
  Home,
  Store
} from "lucide-react";

function Header({
  estaLogado,
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

  const [menuAberto, setMenuAberto] = useState(false);

  const navegar = (funcao) => {
    setMenuAberto(false);

    if (funcao) {
      funcao();
    }
  };

  return (
    <header className="header">

      {/* LOGO */}
      <div
        className="logo"
        onClick={() => navegar(onHome)}
      >
        <div className="logo-icon">C</div>

        <h1>
          Conecta<span>Tech</span>
        </h1>
      </div>


      {/* MENU PRINCIPAL */}
      <nav className="menu">

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navegar(onHome);
          }}
        >
          Home
        </a>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navegar(onProdutos);
          }}
        >
          Produtos
        </a>

      </nav>


      {/* BUSCA */}
      <div className="search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Buscar produtos..."
        />

      </div>


      {/* ÍCONES */}
      <div className="icons">

        {/* PERFIL */}
        <User
          size={22}
          className="profile-icon"
          onClick={() => {
            if (estaLogado) {
              navegar(onPerfil);
            } else {
              navegar(onLogin);
            }
          }}
        />


        {/* CARRINHO */}
        <div
          className="cart"
          onClick={() => navegar(onCarrinho)}
        >

          <ShoppingCart size={22} />

          <span>2</span>

        </div>


        {/* MENU */}
        <button
          className="menu-button"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Abrir menu"
        >
          {menuAberto ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </div>


      {/* MENU SUSPENSO */}
      {menuAberto && (

        <div className="menu-dropdown">

          <div className="menu-dropdown-titulo">
            <span>Menu</span>
          </div>


          {/* NAVEGAÇÃO */}

          <button onClick={() => navegar(onHome)}>
            <Home size={18} />
            <span>Home</span>
          </button>

          <button onClick={() => navegar(onProdutos)}>
            <Store size={18} />
            <span>Produtos</span>
          </button>


          <div className="menu-separador"></div>


          {/* ÁREA DO USUÁRIO */}

          <button
            onClick={() => {
              if (estaLogado) {
                navegar(onPerfil);
              } else {
                navegar(onLogin);
              }
            }}
          >
            <CircleUser size={18} />
            <span>
              {estaLogado ? "Meu perfil" : "Entrar"}
            </span>
          </button>


          {estaLogado && (
            <button onClick={() => navegar(onPedidos)}>
              <Package size={18} />
              <span>Meus pedidos</span>
            </button>
          )}


          <button onClick={() => navegar(onCarrinho)}>
            <ShoppingCart size={18} />
            <span>Meu carrinho</span>
          </button>


          <div className="menu-separador"></div>


          {/* INSTITUCIONAL */}

          <button onClick={() => navegar(onSobre)}>
            <Info size={18} />
            <span>Sobre nós</span>
          </button>

          <button onClick={() => navegar(onSuporte)}>
            <Headphones size={18} />
            <span>Suporte</span>
          </button>


          {/* SAIR */}

          {estaLogado && (
            <>
              <div className="menu-separador"></div>

              <button
                className="menu-sair"
                onClick={() => navegar(onLogout)}
              >
                <LogOut size={18} />
                <span>Sair</span>
              </button>
            </>
          )}

        </div>

      )}

    </header>
  );
}

export default Header;
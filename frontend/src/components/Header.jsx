import "./../styles/header.css";
import { Search, User, ShoppingCart, Menu } from "lucide-react";

function Header({
  estaLogado,
  onLogin,
  onPerfil,
  onLogout,
  onCarrinho,
  onProdutos,
  onHome
}) {
  return (
    <header className="header">

      <div className="logo">
        <div className="logo-icon">C</div>

        <h1>
          Conecta<span>Tech</span>
        </h1>
      </div>

      <nav className="menu">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onHome();
          }}
        >
          Home
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onProdutos();
          }}
        >
          Produtos
        </a>
        <a href="#">Sobre</a>
        <a href="#">Suporte</a>
      </nav>

      <div className="search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Buscar produtos..."
        />

      </div>

      <div className="icons">

        <User
          size={22}
          className="profile-icon"
          onClick={estaLogado ? onPerfil : onLogin}
        />

        <div
          className="cart"
          onClick={onCarrinho}
        >

          <ShoppingCart size={22} />

          <span>2</span>

        </div>

        <Menu size={24} />

      </div>

    </header>
  );
}

export default Header;
import { useState } from "react";
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import TelaInicial from "./pages/TelaInicial.jsx";
import Perfil from "./pages/Perfil.jsx";
import Carrinho from "./pages/Carrinho.jsx";
import Produtos from "./pages/Produtos.jsx";
import FinalizarCompra from "./pages/FinalizarCompra.jsx";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("inicio");
  const [estaLogado, setEstaLogado] = useState(false);
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const handleLoginSucesso = () => {
    setEstaLogado(true);
    setMostrarPopup(true);
    setScreen("inicio");

    setTimeout(() => {
      setMostrarPopup(false);
    }, 3000);
  };

  const handleLogout = () => {
    setEstaLogado(false);
    setScreen("inicio");
  };
  const handleCarrinho = () => {
    if (estaLogado) {
      setScreen("carrinho");
    } else {
      setScreen("login");
    }
  };
  const handleFinalizarCompra = () => {
    setScreen("finalizarCompra");
  };
  const handlePerfil = () => {
    setScreen("perfil");
  };
  if (screen === "login") {
    return (
      <Login
        onCadastro={() => setScreen("cadastro")}
        onVoltar={() => setScreen("inicio")}
        onLoginSucesso={handleLoginSucesso}
      />
    );
  }

  if (screen === "cadastro") {
    return (
      <Cadastro
        onLogin={() => setScreen("login")}
      />
    );
  }
  if (screen === "carrinho") {
    return (
      <Carrinho
        estaLogado={estaLogado}
        onLogin={() => setScreen("login")}
        onPerfil={handlePerfil}
        onLogout={handleLogout}
        onCarrinho={() => setScreen("carrinho")}
        onProdutos={() => setScreen("produtos")}
        onHome={() => setScreen("inicio")}
        onFinalizarCompra={handleFinalizarCompra}
      />
    );
  }
  if (screen === "produtos") {
    return (
      <Produtos
        estaLogado={estaLogado}
        onLogin={() => setScreen("login")}
        onPerfil={handlePerfil}
        onLogout={handleLogout}
        onCarrinho={() => setScreen("carrinho")}
        onProdutos={() => setScreen("produtos")}
        onHome={() => setScreen("inicio")}
      />
    );
  }
  if (screen === "perfil") {
    return (
      <Perfil
        estaLogado={estaLogado}
        onLogin={() => setScreen("login")}
        onPerfil={handlePerfil}
        onLogout={handleLogout}
        onCarrinho={() => setScreen("carrinho")}
        onProdutos={() => setScreen("produtos")}
        onHome={() => setScreen("inicio")}
      />
    );
  }
  if (screen === "finalizarCompra") {
    return (
      <FinalizarCompra
        estaLogado={estaLogado}
        onLogin={() => setScreen("login")}
        onPerfil={handlePerfil}
        onLogout={handleLogout}
        onCarrinho={handleCarrinho}
        onProdutos={() => setScreen("produtos")}
        onHome={() => setScreen("inicio")}
      />
    );
  }
  return (
    <TelaInicial
      estaLogado={estaLogado}
      onLogin={() => setScreen("login")}
      onPerfil={handlePerfil}
      onLogout={handleLogout}
      onCarrinho={handleCarrinho}
      mostrarPopup={mostrarPopup}
      onProdutos={() => setScreen("produtos")}
      onHome={() => setScreen("inicio")}
    />
  );
}

export default App;
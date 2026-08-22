import Header from "../components/Header";
import "../styles/telaInicial.css";

function TelaInicial({
    estaLogado,
    onLogin,
    onPerfil,
    onLogout,
    onCarrinho,
    mostrarPopup,
    onProdutos,
    onHome
}) {
    return (
        <>
            <Header
                estaLogado={estaLogado}
                onLogin={onLogin}
                onPerfil={onPerfil}
                onLogout={onLogout}
                onCarrinho={onCarrinho}
                onProdutos={onProdutos}
                onHome={() => setScreen("inicio")}
            />

            {mostrarPopup && (
                <div className="popup-login">
                    <strong>Login realizado com sucesso!</strong>
                    <span>Bem-vindo à ConectaTech.</span>
                </div>
            )}

            <main className="hero">

                <div className="overlay">

                    <div className="hero-content">

                        <span className="tag">
                            NOVIDADES DA SEMANA
                        </span>

                        <h1>
                            Eleve sua performance <br />
                            digital hoje
                        </h1>

                        <p>
                            Descubra a seleção de processadores e notebooks
                            com até 30% de desconto especial e frete grátis
                            em toda a linha Pro.
                        </p>

                        <button onClick={onProdutos}>
                            Confira as Ofertas
                        </button>

                    </div>

                </div>

            </main>

        </>
    );
}

export default TelaInicial;
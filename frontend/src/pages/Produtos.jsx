import Header from "../components/Header";
import "../styles/produtos.css";

import cadeira from "../assets/cadeira.png";
import monitor from "../assets/monitor.png";
import celular from "../assets/celular.png";
import fone from "../assets/fone.png";
import roteador from "../assets/roteador.png";
import ssd from "../assets/ssd.png";

function Produtos({
    estaLogado,
    onLogin,
    onPerfil,
    onLogout,
    onCarrinho,
    onProdutos,
    onHome
}) {
    const produtos = [
        {
            id: 1,
            nome: "Smartphone Pixel 8",
            preco: 4599,
            categoria: "Smartphones",
            imagem: celular,
            avaliacao: 4.7
        },
        {
            id: 2,
            nome: "Fone de Ouvido Noise Cancelling",
            preco: 1299,
            categoria: "Áudio",
            imagem: fone,
            avaliacao: 4.8
        },
        {
            id: 3,
            nome: "Cadeira Gamer Ergonômica",
            preco: 1899,
            categoria: "Periféricos",
            imagem: cadeira,
            avaliacao: 4.6
        },
        {
            id: 4,
            nome: "SSD M.2 NVMe 2TB",
            preco: 699,
            categoria: "Componentes",
            imagem: ssd,
            avaliacao: 4.9
        },
        {
            id: 5,
            nome: "Monitor Gamer 144Hz IPS",
            preco: 2149,
            categoria: "Monitores",
            imagem: monitor,
            avaliacao: 4.7
        },
        {
            id: 6,
            nome: "Kit Roteador Mesh Wi-Fi 6",
            preco: 980,
            categoria: "Redes",
            imagem: roteador,
            avaliacao: 4.5
        }
    ];

    return (
        <div className="produtos-page">

            <Header
                estaLogado={estaLogado}
                onLogin={onLogin}
                onPerfil={onPerfil}
                onLogout={onLogout}
                onCarrinho={onCarrinho}
                onProdutos={onProdutos}
                onHome={onHome}
            />

            <main className="produtos-container">

                <div className="titulo-produtos">
                    <h1>Produtos</h1>

                    <p>
                        Encontre os melhores equipamentos para sua performance.
                    </p>
                </div>

                <div className="produtos-layout">

                    {/* MENU LATERAL */}
                    <aside className="filtros">

                        <h2>Categorias</h2>

                        <label>
                            <input type="checkbox" />
                            Notebooks
                        </label>

                        <label>
                            <input type="checkbox" />
                            Smartphones
                        </label>

                        <label>
                            <input type="checkbox" />
                            Periféricos
                        </label>

                        <label>
                            <input type="checkbox" />
                            Componentes
                        </label>

                        <label>
                            <input type="checkbox" />
                            Redes
                        </label>

                        <div className="filtro-separador"></div>

                        <h2>Faixa de Preço</h2>

                        <input
                            type="range"
                            min="100"
                            max="5000"
                            defaultValue="5000"
                            className="preco-range"
                        />

                        <div className="preco-valores">
                            <span>R$ 100</span>
                            <span>R$ 5.000+</span>
                        </div>

                    </aside>

                    {/* ÁREA DOS PRODUTOS */}
                    <section className="produtos-area">

                        <div className="barra-produtos">

                            <p>
                                Mostrando <strong>{produtos.length}</strong> produtos
                            </p>

                            <div className="ordenar">
                                <span>Ordenar por:</span>

                                <select defaultValue="populares">
                                    <option value="populares">
                                        Mais Populares
                                    </option>

                                    <option value="menor">
                                        Menor preço
                                    </option>

                                    <option value="maior">
                                        Maior preço
                                    </option>
                                </select>
                            </div>

                        </div>

                        <div className="grid-produtos">

                            {produtos.map((produto) => (

                                <div
                                    className="card-produto"
                                    key={produto.id}
                                >

                                    <div className="imagem-produto">

                                        <img
                                            src={produto.imagem}
                                            alt={produto.nome}
                                        />

                                    </div>

                                    <div className="info-produto">
                                        <div className="avaliacao">
                                            <span>★</span>
                                            <small>{produto.avaliacao}</small>
                                        </div>
                                        <span>
                                            {produto.categoria}
                                        </span>

                                        <h2>
                                            {produto.nome}
                                        </h2>

                                        <strong>
                                            {produto.preco.toLocaleString(
                                                "pt-BR",
                                                {
                                                    style: "currency",
                                                    currency: "BRL"
                                                }
                                            )}
                                        </strong>

                                        <button>
                                            Adicionar ao Carrinho
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
}

export default Produtos;
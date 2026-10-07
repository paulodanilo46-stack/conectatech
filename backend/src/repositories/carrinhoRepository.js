const pool = require("../database/database");

const buscarPorUsuario = async (usuarioId) => {
    const resultado = await pool.query(
        `SELECT id, usuario_id, criado_em
         FROM carrinhos
         WHERE usuario_id = $1`,
        [usuarioId]
    );

    return resultado.rows[0];
};

const criar = async (usuarioId) => {
    const resultado = await pool.query(
        `INSERT INTO carrinhos (usuario_id)
         VALUES ($1)
         RETURNING id, usuario_id, criado_em`,
        [usuarioId]
    );

    return resultado.rows[0];
};

const buscarOuCriar = async (usuarioId) => {
    let carrinho = await buscarPorUsuario(usuarioId);

    if (!carrinho) {
        carrinho = await criar(usuarioId);
    }

    return carrinho;
};

const listarItens = async (carrinhoId) => {
    const resultado = await pool.query(
        `SELECT
            ic.id,
            ic.carrinho_id,
            ic.produto_id,
            p.nome,
            p.preco,
            p.imagem,
            ic.quantidade,
            (p.preco * ic.quantidade) AS subtotal
         FROM itens_carrinho ic
         INNER JOIN produtos p
             ON p.id = ic.produto_id
         WHERE ic.carrinho_id = $1
         ORDER BY ic.id`,
        [carrinhoId]
    );

    return resultado.rows;
};

const buscarItem = async (carrinhoId, produtoId) => {
    const resultado = await pool.query(
        `SELECT *
         FROM itens_carrinho
         WHERE carrinho_id = $1
         AND produto_id = $2`,
        [carrinhoId, produtoId]
    );

    return resultado.rows[0];
};

const buscarItemDoCarrinho = async (itemId, carrinhoId) => {
    const resultado = await pool.query(
        `SELECT *
         FROM itens_carrinho
         WHERE id = $1
         AND carrinho_id = $2`,
        [itemId, carrinhoId]
    );

    return resultado.rows[0];
};

const adicionarItem = async (carrinhoId, produtoId, quantidade) => {
    const resultado = await pool.query(
        `INSERT INTO itens_carrinho
            (carrinho_id, produto_id, quantidade)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [carrinhoId, produtoId, quantidade]
    );

    return resultado.rows[0];
};

const atualizarQuantidade = async (itemId, quantidade) => {
    const resultado = await pool.query(
        `UPDATE itens_carrinho
         SET quantidade = $1
         WHERE id = $2
         RETURNING *`,
        [quantidade, itemId]
    );

    return resultado.rows[0];
};

const removerItem = async (itemId) => {
    const resultado = await pool.query(
        `DELETE FROM itens_carrinho
         WHERE id = $1
         RETURNING id`,
        [itemId]
    );

    return resultado.rows[0];
};

const limpar = async (carrinhoId) => {
    await pool.query(
        `DELETE FROM itens_carrinho
         WHERE carrinho_id = $1`,
        [carrinhoId]
    );
};

module.exports = {
    buscarOuCriar,
    listarItens,
    buscarItem,
    buscarItemDoCarrinho,
    adicionarItem,
    atualizarQuantidade,
    removerItem,
    limpar
};
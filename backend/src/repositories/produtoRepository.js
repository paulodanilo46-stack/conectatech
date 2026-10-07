const pool = require("../database/database");

const listar = async () => {
    const resultado = await pool.query(
        `SELECT 
            p.id,
            p.nome,
            p.descricao,
            p.preco,
            p.categoria_id,
            c.nome AS categoria,
            p.imagem,
            p.avaliacao,
            p.estoque,
            p.ativo,
            p.criado_em
         FROM produtos p
         LEFT JOIN categorias c
            ON c.id = p.categoria_id
         ORDER BY p.id`
    );

    return resultado.rows;
};

const buscarPorId = async (id) => {
    const resultado = await pool.query(
        `SELECT 
            p.id,
            p.nome,
            p.descricao,
            p.preco,
            p.categoria_id,
            c.nome AS categoria,
            p.imagem,
            p.avaliacao,
            p.estoque,
            p.ativo,
            p.criado_em
         FROM produtos p
         LEFT JOIN categorias c
            ON c.id = p.categoria_id
         WHERE p.id = $1`,
        [id]
    );

    return resultado.rows[0];
};

const criar = async (produto) => {
    const resultado = await pool.query(
        `INSERT INTO produtos
        (
            nome,
            descricao,
            preco,
            categoria_id,
            imagem,
            avaliacao,
            estoque,
            ativo
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
        [
            produto.nome,
            produto.descricao,
            produto.preco,
            produto.categoria_id,
            produto.imagem,
            produto.avaliacao,
            produto.estoque,
            true
        ]
    );

    return resultado.rows[0];
};

const atualizar = async (id, produto) => {
    const resultado = await pool.query(
        `UPDATE produtos
         SET nome = $1,
             descricao = $2,
             preco = $3,
             categoria_id = $4,
             imagem = $5,
             avaliacao = $6,
             estoque = $7,
             ativo = $8
         WHERE id = $9
         RETURNING *`,
        [
            produto.nome,
            produto.descricao,
            produto.preco,
            produto.categoria_id,
            produto.imagem,
            produto.avaliacao,
            produto.estoque,
            produto.ativo,
            id
        ]
    );

    return resultado.rows[0];
};

const atualizarEstoque = async (id, estoque) => {
    const resultado = await pool.query(
        `UPDATE produtos
         SET estoque = $1
         WHERE id = $2
         RETURNING *`,
        [estoque, id]
    );

    return resultado.rows[0];
};

const alterarAtivo = async (id, ativo) => {
    const resultado = await pool.query(
        `UPDATE produtos
         SET ativo = $1
         WHERE id = $2
         RETURNING *`,
        [ativo, id]
    );

    return resultado.rows[0];
};

const remover = async (id) => {
    const resultado = await pool.query(
        `DELETE FROM produtos
         WHERE id = $1
         RETURNING id`,
        [id]
    );

    return resultado.rows[0];
};

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    atualizarEstoque,
    alterarAtivo,
    remover
};
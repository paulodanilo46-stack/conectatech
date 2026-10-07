const pool = require("../database/database");

const listar = async () => {
    const resultado = await pool.query(
        `SELECT id, nome, descricao
         FROM categorias
         ORDER BY id`
    );

    return resultado.rows;
};

const buscarPorId = async (id) => {
    const resultado = await pool.query(
        `SELECT id, nome, descricao
         FROM categorias
         WHERE id = $1`,
        [id]
    );

    return resultado.rows[0];
};

const criar = async (categoria) => {
    const resultado = await pool.query(
        `INSERT INTO categorias (nome, descricao)
         VALUES ($1, $2)
         RETURNING id, nome, descricao`,
        [
            categoria.nome,
            categoria.descricao
        ]
    );

    return resultado.rows[0];
};

const atualizar = async (id, categoria) => {
    const resultado = await pool.query(
        `UPDATE categorias
         SET nome = $1,
             descricao = $2
         WHERE id = $3
         RETURNING id, nome, descricao`,
        [
            categoria.nome,
            categoria.descricao,
            id
        ]
    );

    return resultado.rows[0];
};

const remover = async (id) => {
    const resultado = await pool.query(
        `DELETE FROM categorias
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
    remover
};
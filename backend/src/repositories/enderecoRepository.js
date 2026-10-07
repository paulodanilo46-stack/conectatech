const pool = require("../database/database");

const criar = async (
    usuarioId,
    nome,
    telefone,
    cep,
    cidade,
    endereco,
    numero,
    complemento
) => {
    const resultado = await pool.query(
        `INSERT INTO enderecos
        (
            usuario_id,
            nome,
            telefone,
            cep,
            cidade,
            endereco,
            numero,
            complemento
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
        [
            usuarioId,
            nome,
            telefone,
            cep,
            cidade,
            endereco,
            numero,
            complemento
        ]
    );

    return resultado.rows[0];
};

const listarPorUsuario = async (usuarioId) => {
    const resultado = await pool.query(
        `SELECT *
         FROM enderecos
         WHERE usuario_id = $1
         ORDER BY id DESC`,
        [usuarioId]
    );

    return resultado.rows;
};

const buscarPorIdUsuario = async (enderecoId, usuarioId) => {
    const resultado = await pool.query(
        `SELECT *
         FROM enderecos
         WHERE id = $1
         AND usuario_id = $2`,
        [enderecoId, usuarioId]
    );

    return resultado.rows[0];
};

const atualizar = async (
    enderecoId,
    usuarioId,
    nome,
    telefone,
    cep,
    cidade,
    endereco,
    numero,
    complemento
) => {
    const resultado = await pool.query(
        `UPDATE enderecos
         SET
            nome = $1,
            telefone = $2,
            cep = $3,
            cidade = $4,
            endereco = $5,
            numero = $6,
            complemento = $7
         WHERE id = $8
         AND usuario_id = $9
         RETURNING *`,
        [
            nome,
            telefone,
            cep,
            cidade,
            endereco,
            numero,
            complemento,
            enderecoId,
            usuarioId
        ]
    );

    return resultado.rows[0];
};

const excluir = async (enderecoId, usuarioId) => {
    const resultado = await pool.query(
        `DELETE FROM enderecos
         WHERE id = $1
         AND usuario_id = $2
         RETURNING *`,
        [enderecoId, usuarioId]
    );

    return resultado.rows[0];
};

module.exports = {
    criar,
    listarPorUsuario,
    buscarPorIdUsuario,
    atualizar,
    excluir
};
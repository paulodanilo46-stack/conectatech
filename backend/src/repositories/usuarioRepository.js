const pool = require("../database/database");

const buscarPorEmail = async (email) => {
    const resultado = await pool.query(
        "SELECT * FROM usuarios WHERE email = $1",
        [email]
    );

    return resultado.rows[0];
};

const buscarPorId = async (id) => {
    const resultado = await pool.query(
        "SELECT id, nome, email, telefone, cpf, tipo, criado_em FROM usuarios WHERE id = $1",
        [id]
    );

    return resultado.rows[0];
};

const criar = async (usuario) => {
    const resultado = await pool.query(
        `INSERT INTO usuarios 
        (nome, email, telefone, cpf, senha, tipo)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, nome, email, telefone, cpf, tipo, criado_em`,
        [
            usuario.nome,
            usuario.email,
            usuario.telefone,
            usuario.cpf,
            usuario.senha,
            usuario.tipo
        ]
    );

    return resultado.rows[0];
};

const atualizar = async (id, dados) => {
    const resultado = await pool.query(
        `UPDATE usuarios
         SET nome = $1,
             telefone = $2,
             cpf = $3
         WHERE id = $4
         RETURNING id, nome, email, telefone, cpf, tipo, criado_em`,
        [
            dados.nome,
            dados.telefone,
            dados.cpf,
            id
        ]
    );

    return resultado.rows[0];
};

module.exports = {
    buscarPorEmail,
    buscarPorId,
    criar,
    atualizar
};
const pool = require("../database/database");

const criarPedido = async (
    usuarioId,
    enderecoId,
    formaPagamento,
    valorTotal,
    db = pool
) => {
    const resultado = await db.query(
        `INSERT INTO pedidos
        (usuario_id, endereco_id, forma_pagamento, status, valor_total)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [
            usuarioId,
            enderecoId,
            formaPagamento,
            "pendente",
            valorTotal
        ]
    );

    return resultado.rows[0];
};

const adicionarItem = async (
    pedidoId,
    produtoId,
    quantidade,
    precoUnitario,
    db = pool
) => {
    const resultado = await db.query(
        `INSERT INTO itens_pedido
        (pedido_id, produto_id, quantidade, preco_unitario)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [
            pedidoId,
            produtoId,
            quantidade,
            precoUnitario
        ]
    );

    return resultado.rows[0];
};

const listarPorUsuario = async (usuarioId) => {
    const resultado = await pool.query(
        `SELECT
            p.id,
            p.usuario_id,
            p.endereco_id,
            p.forma_pagamento,
            p.status,
            p.valor_total,
            p.criado_em
         FROM pedidos p
         WHERE p.usuario_id = $1
         ORDER BY p.criado_em DESC`,
        [usuarioId]
    );

    return resultado.rows;
};

const buscarPorId = async (id) => {
    const resultado = await pool.query(
        `SELECT
            p.id,
            p.usuario_id,
            p.endereco_id,
            p.forma_pagamento,
            p.status,
            p.valor_total,
            p.criado_em
         FROM pedidos p
         WHERE p.id = $1`,
        [id]
    );

    return resultado.rows[0];
};

const listarItens = async (pedidoId) => {
    const resultado = await pool.query(
        `SELECT
            ip.id,
            ip.produto_id,
            p.nome,
            ip.quantidade,
            ip.preco_unitario,
            (ip.quantidade * ip.preco_unitario) AS subtotal
         FROM itens_pedido ip
         INNER JOIN produtos p
             ON p.id = ip.produto_id
         WHERE ip.pedido_id = $1
         ORDER BY ip.id`,
        [pedidoId]
    );

    return resultado.rows;
};

const listarTodos = async () => {
    const resultado = await pool.query(
        `SELECT
            p.id,
            p.usuario_id,
            u.nome AS usuario_nome,
            u.email AS usuario_email,
            p.endereco_id,
            p.forma_pagamento,
            p.status,
            p.valor_total,
            p.criado_em
         FROM pedidos p
         INNER JOIN usuarios u
             ON u.id = p.usuario_id
         ORDER BY p.criado_em DESC`
    );

    return resultado.rows;
};

const buscarAdminPorId = async (id) => {
    const resultado = await pool.query(
        `SELECT
            p.id,
            p.usuario_id,
            u.nome AS usuario_nome,
            u.email AS usuario_email,
            p.endereco_id,
            p.forma_pagamento,
            p.status,
            p.valor_total,
            p.criado_em
         FROM pedidos p
         INNER JOIN usuarios u
             ON u.id = p.usuario_id
         WHERE p.id = $1`,
        [id]
    );

    return resultado.rows[0];
};

const atualizarStatus = async (id, status) => {
    const resultado = await pool.query(
        `UPDATE pedidos
         SET status = $1
         WHERE id = $2
         RETURNING *`,
        [status, id]
    );

    return resultado.rows[0];
};

module.exports = {
    criarPedido,
    adicionarItem,
    listarPorUsuario,
    buscarPorId,
    listarItens,
    listarTodos,
    buscarAdminPorId,
    atualizarStatus
};
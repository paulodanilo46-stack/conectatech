const pool = require("../database/database");

const obterResumo = async () => {
    const usuarios = await pool.query(
        `SELECT COUNT(*)::int AS total
         FROM usuarios`
    );

    const produtos = await pool.query(
        `SELECT
            COUNT(*)::int AS total,
            COUNT(*) FILTER (WHERE ativo = true)::int AS ativos,
            COUNT(*) FILTER (WHERE ativo = false)::int AS inativos,
            COUNT(*) FILTER (WHERE estoque <= 5 AND ativo = true)::int AS estoque_baixo
         FROM produtos`
    );

    const pedidos = await pool.query(
        `SELECT
            COUNT(*)::int AS total,
            COUNT(*) FILTER (
                WHERE status = 'pendente'
            )::int AS pendentes,
            COUNT(*) FILTER (
                WHERE status = 'processando'
            )::int AS processando,
            COUNT(*) FILTER (
                WHERE status = 'enviado'
            )::int AS enviados,
            COUNT(*) FILTER (
                WHERE status = 'entregue'
            )::int AS entregues,
            COUNT(*) FILTER (
                WHERE status = 'cancelado'
            )::int AS cancelados,
            COALESCE(
                SUM(valor_total)
                FILTER (WHERE status <> 'cancelado'),
                0
            ) AS valor_total
         FROM pedidos`
    );

    return {
        usuarios: usuarios.rows[0],
        produtos: produtos.rows[0],
        pedidos: pedidos.rows[0]
    };
};

module.exports = {
    obterResumo
};
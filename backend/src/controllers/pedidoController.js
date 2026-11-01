const pool = require("../database/database");

const carrinhoRepository = require("../repositories/carrinhoRepository");
const pedidoRepository = require("../repositories/pedidoRepository");
const enderecoRepository = require("../repositories/enderecoRepository");

const criar = async (req, res) => {
    const cliente = await pool.connect();
    let transacaoIniciada = false;

    try {
        const {
            endereco_id,
            forma_pagamento,
            itens
        } = req.body;

        // 1. Validar os dados recebidos
        if (
            !endereco_id ||
            !forma_pagamento ||
            !Array.isArray(itens) ||
            itens.length === 0
        ) {
            return res.status(400).json({
                mensagem:
                    "Endereço, forma de pagamento e itens selecionados são obrigatórios."
            });
        }

        const itensIds = itens.map(Number);

        if (
            itensIds.some(id => !Number.isInteger(id) || id <= 0) ||
            new Set(itensIds).size !== itensIds.length
        ) {
            return res.status(400).json({
                mensagem: "A seleção de itens é inválida."
            });
        }

        // 2. Verificar se o endereço pertence ao usuário
        const endereco =
            await enderecoRepository.buscarPorIdUsuario(
                endereco_id,
                req.usuario.id
            );

        if (!endereco) {
            return res.status(404).json({
                mensagem:
                    "Endereço não encontrado para este usuário."
            });
        }

        // 3. Buscar o carrinho do usuário
        const carrinho =
            await carrinhoRepository.buscarOuCriar(
                req.usuario.id
            );

        // 4. Iniciar a transação
        await cliente.query("BEGIN");
        transacaoIniciada = true;

        // 5. Buscar somente os itens selecionados
        const itensSelecionados =
            await carrinhoRepository.listarItensSelecionados(
                carrinho.id,
                itensIds,
                cliente
            );

        // Verificar se todos os IDs pertencem ao carrinho
        if (itensSelecionados.length !== itensIds.length) {
            throw new Error(
                "Um ou mais itens selecionados não foram encontrados no carrinho."
            );
        }

        // 6. Conferir disponibilidade, estoque e calcular o total
        let valorTotalCentavos = 0;

        for (const item of itensSelecionados) {
            const quantidade = Number(item.quantidade);
            const estoque = Number(item.estoque);
            const preco = Number(item.preco);

            if (!item.ativo) {
                throw new Error(
                    `O produto ${item.nome} não está disponível.`
                );
            }

            if (quantidade > estoque) {
                throw new Error(
                    `Estoque insuficiente para o produto ${item.nome}.`
                );
            }

            if (
                !Number.isFinite(preco) ||
                preco < 0 ||
                !Number.isInteger(quantidade) ||
                quantidade <= 0
            ) {
                throw new Error(
                    `Os dados do produto ${item.nome} são inválidos.`
                );
            }

            valorTotalCentavos +=
                Math.round(preco * 100) * quantidade;
        }

        const valorTotal = valorTotalCentavos / 100;

        // 7. Criar o pedido
        const pedido =
            await pedidoRepository.criarPedido(
                req.usuario.id,
                endereco_id,
                forma_pagamento,
                valorTotal,
                cliente
            );

        // 8. Registrar os produtos e atualizar o estoque
        for (const item of itensSelecionados) {
            await pedidoRepository.adicionarItem(
                pedido.id,
                item.produto_id,
                Number(item.quantidade),
                Number(item.preco),
                cliente
            );

            const atualizacaoEstoque = await cliente.query(
                `UPDATE produtos
                 SET estoque = estoque - $1
                 WHERE id = $2
                 AND estoque >= $1
                 RETURNING id`,
                [
                    Number(item.quantidade),
                    item.produto_id
                ]
            );

            if (atualizacaoEstoque.rowCount === 0) {
                throw new Error(
                    `Não foi possível atualizar o estoque do produto ${item.nome}.`
                );
            }
        }

        // 9. Remover somente os itens comprados
        await cliente.query(
            `DELETE FROM itens_carrinho
             WHERE carrinho_id = $1
             AND id = ANY($2::int[])`,
            [carrinho.id, itensIds]
        );

        // 10. Buscar os itens do pedido antes de finalizar a transação
        const itensPedido =
            await pedidoRepository.listarItens(
                pedido.id,
                cliente
            );

        // 11. Confirmar a transação
        await cliente.query("COMMIT");
        transacaoIniciada = false;

        return res.status(201).json({
            mensagem: "Pedido criado com sucesso.",
            pedido: {
                ...pedido,
                itens: itensPedido
            }
        });

    } catch (erro) {
        if (transacaoIniciada) {
            await cliente.query("ROLLBACK");
        }

        console.error(erro);

        return res.status(400).json({
            mensagem:
                erro.message ||
                "Erro ao criar pedido."
        });

    } finally {
        cliente.release();
    }
};

const listarMeusPedidos = async (req, res) => {
    try {
        const pedidos =
            await pedidoRepository.listarPorUsuario(
                req.usuario.id
            );

        return res.status(200).json(pedidos);

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao listar pedidos."
        });
    }
};

const buscarMeuPedido = async (req, res) => {
    try {
        const pedido =
            await pedidoRepository.buscarPorId(
                req.params.id
            );

        if (!pedido) {
            return res.status(404).json({
                mensagem: "Pedido não encontrado."
            });
        }

        if (pedido.usuario_id !== req.usuario.id) {
            return res.status(403).json({
                mensagem:
                    "Você não possui acesso a este pedido."
            });
        }

        const itens =
            await pedidoRepository.listarItens(
                pedido.id
            );

        return res.status(200).json({
            ...pedido,
            itens
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao buscar pedido."
        });
    }
};

module.exports = {
    criar,
    listarMeusPedidos,
    buscarMeuPedido
};
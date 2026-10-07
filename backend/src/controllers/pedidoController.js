const pool = require("../database/database");

const carrinhoRepository = require("../repositories/carrinhoRepository");
const produtoRepository = require("../repositories/produtoRepository");
const pedidoRepository = require("../repositories/pedidoRepository");
const enderecoRepository = require("../repositories/enderecoRepository");

const criar = async (req, res) => {
    const cliente = await pool.connect();

    try {
        const {
            endereco_id,
            forma_pagamento
        } = req.body;

        if (!endereco_id || !forma_pagamento) {
            return res.status(400).json({
                mensagem:
                    "Endereço e forma de pagamento são obrigatórios."
            });
        }

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

        const carrinho =
            await carrinhoRepository.buscarOuCriar(
                req.usuario.id
            );

        const itens =
            await carrinhoRepository.listarItens(
                carrinho.id
            );

        if (itens.length === 0) {
            return res.status(400).json({
                mensagem: "O carrinho está vazio."
            });
        }

        await cliente.query("BEGIN");

        let valorTotal = 0;
        const produtos = [];

        for (const item of itens) {
            const produto =
                await produtoRepository.buscarPorId(
                    item.produto_id
                );

            if (!produto) {
                throw new Error(
                    `Produto ${item.produto_id} não encontrado.`
                );
            }

            if (!produto.ativo) {
                throw new Error(
                    `O produto ${produto.nome} não está disponível.`
                );
            }

            if (item.quantidade > produto.estoque) {
                throw new Error(
                    `Estoque insuficiente para o produto ${produto.nome}.`
                );
            }

            const preco = Number(produto.preco);

            valorTotal += preco * item.quantidade;

            produtos.push({
                produto,
                quantidade: item.quantidade,
                preco
            });
        }

        const pedido =
            await pedidoRepository.criarPedido(
                req.usuario.id,
                endereco_id,
                forma_pagamento,
                valorTotal,
                cliente
            );

        for (const item of produtos) {
            const subtotal =
                item.preco * item.quantidade;

            await pedidoRepository.adicionarItem(
                pedido.id,
                item.produto.id,
                item.quantidade,
                item.preco,
                cliente
            );

            await cliente.query(
                `UPDATE produtos
                 SET estoque = estoque - $1
                 WHERE id = $2`,
                [
                    item.quantidade,
                    item.produto.id
                ]
            );
        }

        await cliente.query(
            `DELETE FROM itens_carrinho
             WHERE carrinho_id = $1`,
            [carrinho.id]
        );

        await cliente.query("COMMIT");

        const itensPedido =
            await pedidoRepository.listarItens(
                pedido.id
            );

        return res.status(201).json({
            mensagem: "Pedido criado com sucesso.",
            pedido: {
                ...pedido,
                itens: itensPedido
            }
        });

    } catch (erro) {

        await cliente.query("ROLLBACK");

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
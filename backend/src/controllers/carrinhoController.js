const carrinhoRepository = require("../repositories/carrinhoRepository");
const produtoRepository = require("../repositories/produtoRepository");

const listar = async (req, res) => {
    try {
        const carrinho = await carrinhoRepository.buscarOuCriar(
            req.usuario.id
        );

        const itens = await carrinhoRepository.listarItens(
            carrinho.id
        );

        const valorTotal = itens.reduce(
            (total, item) => total + Number(item.subtotal),
            0
        );

        return res.status(200).json({
            carrinho: {
                id: carrinho.id,
                usuario_id: carrinho.usuario_id,
                itens,
                quantidade_itens: itens.reduce(
                    (total, item) => total + item.quantidade,
                    0
                ),
                valor_total: valorTotal
            }
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao buscar carrinho."
        });
    }
};

const adicionarItem = async (req, res) => {
    try {
        const { produto_id, quantidade } = req.body;

        if (!produto_id || !quantidade) {
            return res.status(400).json({
                mensagem: "Produto e quantidade são obrigatórios."
            });
        }

        if (quantidade <= 0) {
            return res.status(400).json({
                mensagem: "A quantidade deve ser maior que zero."
            });
        }

        const produto = await produtoRepository.buscarPorId(produto_id);

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado."
            });
        }

        if (!produto.ativo) {
            return res.status(400).json({
                mensagem: "Este produto não está disponível."
            });
        }

        if (produto.estoque < quantidade) {
            return res.status(400).json({
                mensagem: "Quantidade solicitada maior que o estoque disponível."
            });
        }

        const carrinho = await carrinhoRepository.buscarOuCriar(
            req.usuario.id
        );

        const itemExistente = await carrinhoRepository.buscarItem(
            carrinho.id,
            produto_id
        );

        if (itemExistente) {
            const novaQuantidade =
                itemExistente.quantidade + quantidade;

            if (novaQuantidade > produto.estoque) {
                return res.status(400).json({
                    mensagem: "A quantidade total ultrapassa o estoque disponível."
                });
            }

            const item =
                await carrinhoRepository.atualizarQuantidade(
                    itemExistente.id,
                    novaQuantidade
                );

            return res.status(200).json({
                mensagem: "Quantidade do produto atualizada no carrinho.",
                item
            });
        }

        const item = await carrinhoRepository.adicionarItem(
            carrinho.id,
            produto_id,
            quantidade
        );

        return res.status(201).json({
            mensagem: "Produto adicionado ao carrinho.",
            item
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao adicionar produto ao carrinho."
        });
    }
};

const atualizarQuantidade = async (req, res) => {
    try {
        const { quantidade } = req.body;

        if (!quantidade || quantidade <= 0) {
            return res.status(400).json({
                mensagem: "A quantidade deve ser maior que zero."
            });
        }

        const carrinho = await carrinhoRepository.buscarOuCriar(
            req.usuario.id
        );

        const item = await carrinhoRepository.buscarItemDoCarrinho(
            req.params.id,
            carrinho.id
        );

        if (!item) {
            return res.status(404).json({
                mensagem: "Item não encontrado no seu carrinho."
            });
        }

        const produto = await produtoRepository.buscarPorId(
            item.produto_id
        );

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado."
            });
        }

        if (!produto.ativo) {
            return res.status(400).json({
                mensagem: "Este produto não está mais disponível."
            });
        }

        if (quantidade > produto.estoque) {
            return res.status(400).json({
                mensagem: "Quantidade maior que o estoque disponível."
            });
        }

        const itemAtualizado =
            await carrinhoRepository.atualizarQuantidade(
                item.id,
                quantidade
            );

        return res.status(200).json({
            mensagem: "Quantidade atualizada.",
            item: itemAtualizado
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao atualizar quantidade."
        });
    }
};

const removerItem = async (req, res) => {
    try {
        const carrinho = await carrinhoRepository.buscarOuCriar(
            req.usuario.id
        );

        const item = await carrinhoRepository.buscarItemDoCarrinho(
            req.params.id,
            carrinho.id
        );

        if (!item) {
            return res.status(404).json({
                mensagem: "Item não encontrado no seu carrinho."
            });
        }

        await carrinhoRepository.removerItem(item.id);

        return res.status(200).json({
            mensagem: "Item removido do carrinho."
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao remover item."
        });
    }
};
const limpar = async (req, res) => {
    try {
        const carrinho = await carrinhoRepository.buscarOuCriar(
            req.usuario.id
        );

        await carrinhoRepository.limpar(carrinho.id);

        return res.status(200).json({
            mensagem: "Carrinho esvaziado com sucesso."
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao limpar carrinho."
        });
    }
};

module.exports = {
    listar,
    adicionarItem,
    atualizarQuantidade,
    removerItem,
    limpar
};
const pedidoRepository =
    require("../repositories/pedidoRepository");

const listarTodos = async (req, res) => {
    try {
        const pedidos =
            await pedidoRepository.listarTodos();

        return res.status(200).json({
            pedidos
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao listar pedidos."
        });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const pedido =
            await pedidoRepository.buscarAdminPorId(
                req.params.id
            );

        if (!pedido) {
            return res.status(404).json({
                mensagem: "Pedido não encontrado."
            });
        }

        const itens =
            await pedidoRepository.listarItens(
                pedido.id
            );

        return res.status(200).json({
            pedido: {
                ...pedido,
                itens
            }
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao buscar pedido."
        });
    }
};

const atualizarStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                mensagem: "O status é obrigatório."
            });
        }

        const statusPermitidos = [
            "pendente",
            "processando",
            "enviado",
            "entregue",
            "cancelado"
        ];

        if (!statusPermitidos.includes(status)) {
            return res.status(400).json({
                mensagem:
                    "Status inválido."
            });
        }

        const pedido =
            await pedidoRepository.atualizarStatus(
                req.params.id,
                status
            );

        if (!pedido) {
            return res.status(404).json({
                mensagem: "Pedido não encontrado."
            });
        }

        return res.status(200).json({
            mensagem:
                "Status do pedido atualizado com sucesso.",
            pedido
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem:
                "Erro ao atualizar status do pedido."
        });
    }
};

module.exports = {
    listarTodos,
    buscarPorId,
    atualizarStatus
};
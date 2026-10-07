const produtoRepository =
    require("../repositories/produtoRepository");

const listar = async (req, res) => {
    try {
        const produtos =
            await produtoRepository.listar();

        return res.status(200).json({
            produtos
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao listar produtos."
        });
    }
};


const criar = async (req, res) => {
    try {
        const {
            nome,
            descricao,
            preco,
            categoria_id,
            imagem,
            avaliacao,
            estoque
        } = req.body;

        if (
            !nome ||
            preco === undefined ||
            categoria_id === undefined ||
            estoque === undefined
        ) {
            return res.status(400).json({
                mensagem:
                    "Nome, preço, categoria e estoque são obrigatórios."
            });
        }

        if (Number(preco) < 0) {
            return res.status(400).json({
                mensagem:
                    "O preço não pode ser negativo."
            });
        }

        if (!Number.isInteger(Number(estoque)) || Number(estoque) < 0) {
            return res.status(400).json({
                mensagem:
                    "O estoque deve ser um número inteiro maior ou igual a zero."
            });
        }

        const produto =
            await produtoRepository.criar({
                nome,
                descricao: descricao || null,
                preco: Number(preco),
                categoria_id: Number(categoria_id),
                imagem: imagem || null,
                avaliacao:
                    avaliacao === undefined
                        ? 0
                        : Number(avaliacao),
                estoque: Number(estoque)
            });

        return res.status(201).json({
            mensagem: "Produto criado com sucesso.",
            produto
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao criar produto."
        });
    }
};


const buscarPorId = async (req, res) => {
    try {
        const produto =
            await produtoRepository.buscarPorId(
                req.params.id
            );

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado."
            });
        }

        return res.status(200).json({
            produto
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao buscar produto."
        });
    }
};


const atualizar = async (req, res) => {
    try {
        const {
            nome,
            descricao,
            preco,
            categoria_id,
            imagem,
            avaliacao,
            estoque,
            ativo
        } = req.body;

        if (
            !nome ||
            preco === undefined ||
            categoria_id === undefined ||
            estoque === undefined ||
            ativo === undefined
        ) {
            return res.status(400).json({
                mensagem:
                    "Nome, preço, categoria, estoque e ativo são obrigatórios."
            });
        }

        if (Number(preco) < 0) {
            return res.status(400).json({
                mensagem:
                    "O preço não pode ser negativo."
            });
        }

        if (
            !Number.isInteger(Number(estoque)) ||
            Number(estoque) < 0
        ) {
            return res.status(400).json({
                mensagem:
                    "O estoque deve ser um número inteiro maior ou igual a zero."
            });
        }

        if (typeof ativo !== "boolean") {
            return res.status(400).json({
                mensagem:
                    "O campo ativo deve ser verdadeiro ou falso."
            });
        }

        const produto =
            await produtoRepository.atualizar(
                req.params.id,
                {
                    nome,
                    descricao: descricao || null,
                    preco: Number(preco),
                    categoria_id: Number(categoria_id),
                    imagem: imagem || null,
                    avaliacao:
                        avaliacao === undefined
                            ? 0
                            : Number(avaliacao),
                    estoque: Number(estoque),
                    ativo
                }
            );

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado."
            });
        }

        return res.status(200).json({
            mensagem:
                "Produto atualizado com sucesso.",
            produto
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao atualizar produto."
        });
    }
};


const atualizarEstoque = async (req, res) => {
    try {
        const { estoque } = req.body;

        if (
            estoque === undefined ||
            !Number.isInteger(Number(estoque)) ||
            Number(estoque) < 0
        ) {
            return res.status(400).json({
                mensagem:
                    "O estoque deve ser um número inteiro maior ou igual a zero."
            });
        }

        const produto =
            await produtoRepository.atualizarEstoque(
                req.params.id,
                Number(estoque)
            );

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado."
            });
        }

        return res.status(200).json({
            mensagem:
                "Estoque atualizado com sucesso.",
            produto
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem:
                "Erro ao atualizar estoque."
        });
    }
};


const alterarAtivo = async (req, res) => {
    try {
        const { ativo } = req.body;

        if (typeof ativo !== "boolean") {
            return res.status(400).json({
                mensagem:
                    "O campo ativo deve ser verdadeiro ou falso."
            });
        }

        const produto =
            await produtoRepository.alterarAtivo(
                req.params.id,
                ativo
            );

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado."
            });
        }

        return res.status(200).json({
            mensagem: ativo
                ? "Produto ativado com sucesso."
                : "Produto desativado com sucesso.",
            produto
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem:
                "Erro ao alterar situação do produto."
        });
    }
};


module.exports = {
    listar,
    criar,
    buscarPorId,
    atualizar,
    atualizarEstoque,
    alterarAtivo
};
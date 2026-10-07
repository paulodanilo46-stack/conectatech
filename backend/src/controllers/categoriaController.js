const categoriaRepository = require("../repositories/categoriaRepository");

const listar = async (req, res) => {
    try {
        const categorias = await categoriaRepository.listar();

        return res.status(200).json(categorias);
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao listar categorias."
        });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const categoria = await categoriaRepository.buscarPorId(
            req.params.id
        );

        if (!categoria) {
            return res.status(404).json({
                mensagem: "Categoria não encontrada."
            });
        }

        return res.status(200).json(categoria);
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao buscar categoria."
        });
    }
};

const criar = async (req, res) => {
    try {
        const { nome, descricao } = req.body;

        if (!nome) {
            return res.status(400).json({
                mensagem: "O nome da categoria é obrigatório."
            });
        }

        const categoria = await categoriaRepository.criar({
            nome,
            descricao
        });

        return res.status(201).json(categoria);
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao criar categoria."
        });
    }
};

const atualizar = async (req, res) => {
    try {
        const { nome, descricao } = req.body;

        if (!nome) {
            return res.status(400).json({
                mensagem: "O nome da categoria é obrigatório."
            });
        }

        const categoria = await categoriaRepository.atualizar(
            req.params.id,
            {
                nome,
                descricao
            }
        );

        if (!categoria) {
            return res.status(404).json({
                mensagem: "Categoria não encontrada."
            });
        }

        return res.status(200).json(categoria);
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao atualizar categoria."
        });
    }
};

const remover = async (req, res) => {
    try {
        const categoria = await categoriaRepository.remover(
            req.params.id
        );

        if (!categoria) {
            return res.status(404).json({
                mensagem: "Categoria não encontrada."
            });
        }

        return res.status(200).json({
            mensagem: "Categoria removida com sucesso."
        });
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao remover categoria."
        });
    }
};

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    remover
};
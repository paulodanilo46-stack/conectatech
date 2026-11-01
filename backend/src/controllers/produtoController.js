
const produtoRepository = require("../repositories/produtoRepository");
const supabase = require("../config/supabaseStorage");
const crypto = require("crypto");

const enviarImagemSupabase = async (arquivo) => {
    const extensoes = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/webp": "webp"
    };

    const extensao = extensoes[arquivo.mimetype];

    if (!extensao) {
        throw new Error("Formato de imagem não permitido.");
    }

    const nomeArquivo = `${crypto.randomUUID()}.${extensao}`;

    const { error } = await supabase.storage
        .from("produtos")
        .upload(nomeArquivo, arquivo.buffer, {
            contentType: arquivo.mimetype,
            upsert: false
        });

    if (error) {
        throw error;
    }

    const { data } = supabase.storage
        .from("produtos")
        .getPublicUrl(nomeArquivo);

    return data.publicUrl;
};

const listar = async (req, res) => {
    try {
        const produtos = await produtoRepository.listar();

        return res.status(200).json(produtos);
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao listar produtos."
        });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const produto = await produtoRepository.buscarPorId(
            req.params.id
        );

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado."
            });
        }

        return res.status(200).json(produto);
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao buscar produto."
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

        if (!nome || preco === undefined || estoque === undefined) {
            return res.status(400).json({
                mensagem: "Nome, preço e estoque são obrigatórios."
            });
        }

        let imagemUrl = imagem || null;

        if (req.file) {
            imagemUrl = await enviarImagemSupabase(req.file);
        }

        const produto = await produtoRepository.criar({
            nome,
            descricao,
            preco,
            categoria_id,
            imagem: imagemUrl,
            avaliacao,
            estoque
        });

        return res.status(201).json(produto);
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao criar produto."
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

        if (!nome || preco === undefined || estoque === undefined) {
            return res.status(400).json({
                mensagem: "Nome, preço e estoque são obrigatórios."
            });
        }

        const produtoAtual = await produtoRepository.buscarPorId(
            req.params.id
        );

        if (!produtoAtual) {
            return res.status(404).json({
                mensagem: "Produto não encontrado."
            });
        }

        let imagemUrl = imagem ?? produtoAtual.imagem;

        if (req.file) {
            imagemUrl = await enviarImagemSupabase(req.file);
        }

        const produto = await produtoRepository.atualizar(
            req.params.id,
            {
                nome,
                descricao,
                preco,
                categoria_id,
                imagem: imagemUrl,
                avaliacao,
                estoque,
                ativo
            }
        );

        return res.status(200).json(produto);
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao atualizar produto."
        });
    }
};

const remover = async (req, res) => {
    try {
        const produto = await produtoRepository.remover(
            req.params.id
        );

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado."
            });
        }

        return res.status(200).json({
            mensagem: "Produto removido com sucesso."
        });
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao remover produto."
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

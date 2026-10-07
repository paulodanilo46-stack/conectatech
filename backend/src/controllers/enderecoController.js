const enderecoRepository =
    require("../repositories/enderecoRepository");

const criar = async (req, res) => {
    try {
        const {
            nome,
            telefone,
            cep,
            cidade,
            endereco,
            numero,
            complemento
        } = req.body;

        if (
            !nome ||
            !telefone ||
            !cep ||
            !cidade ||
            !endereco ||
            !numero
        ) {
            return res.status(400).json({
                mensagem:
                    "Nome, telefone, CEP, cidade, endereço e número são obrigatórios."
            });
        }

        const novoEndereco =
            await enderecoRepository.criar(
                req.usuario.id,
                nome,
                telefone,
                cep,
                cidade,
                endereco,
                numero,
                complemento
            );

        return res.status(201).json({
            mensagem: "Endereço cadastrado com sucesso.",
            endereco: novoEndereco
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao cadastrar endereço."
        });
    }
};

const listar = async (req, res) => {
    try {
        const enderecos =
            await enderecoRepository.listarPorUsuario(
                req.usuario.id
            );

        return res.status(200).json({
            enderecos
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao listar endereços."
        });
    }
};

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nome,
            telefone,
            cep,
            cidade,
            endereco,
            numero,
            complemento
        } = req.body;

        if (
            !nome ||
            !telefone ||
            !cep ||
            !cidade ||
            !endereco ||
            !numero
        ) {
            return res.status(400).json({
                mensagem:
                    "Nome, telefone, CEP, cidade, endereço e número são obrigatórios."
            });
        }

        const enderecoAtualizado =
            await enderecoRepository.atualizar(
                id,
                req.usuario.id,
                nome,
                telefone,
                cep,
                cidade,
                endereco,
                numero,
                complemento
            );

        if (!enderecoAtualizado) {
            return res.status(404).json({
                mensagem: "Endereço não encontrado."
            });
        }

        return res.status(200).json({
            mensagem: "Endereço atualizado com sucesso.",
            endereco: enderecoAtualizado
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao atualizar endereço."
        });
    }
};

const excluir = async (req, res) => {
    try {
        const { id } = req.params;

        const enderecoExcluido =
            await enderecoRepository.excluir(
                id,
                req.usuario.id
            );

        if (!enderecoExcluido) {
            return res.status(404).json({
                mensagem: "Endereço não encontrado."
            });
        }

        return res.status(200).json({
            mensagem: "Endereço excluído com sucesso."
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao excluir endereço."
        });
    }
};

module.exports = {
    criar,
    listar,
    atualizar,
    excluir
};
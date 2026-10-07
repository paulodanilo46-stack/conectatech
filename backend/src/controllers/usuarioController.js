const usuarioRepository = require("../repositories/usuarioRepository");

const buscarPerfil = async (req, res) => {
    try {
        const usuario = await usuarioRepository.buscarPorId(
            req.usuario.id
        );

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });
        }

        return res.status(200).json({
            usuario
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao buscar perfil."
        });
    }
};

const atualizarPerfil = async (req, res) => {
    try {
        const { nome, telefone, cpf } = req.body;

        if (!nome) {
            return res.status(400).json({
                mensagem: "O nome é obrigatório."
            });
        }

        const usuario = await usuarioRepository.atualizar(
            req.usuario.id,
            {
                nome,
                telefone,
                cpf
            }
        );

        return res.status(200).json({
            mensagem: "Perfil atualizado com sucesso.",
            usuario
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao atualizar perfil."
        });
    }
};

module.exports = {
    buscarPerfil,
    atualizarPerfil
};
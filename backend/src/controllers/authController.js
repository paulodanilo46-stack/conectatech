const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usuarioRepository = require("../repositories/usuarioRepository");

const cadastrar = async (req, res) => {
    try {
        const {
            nome,
            email,
            telefone,
            cpf,
            senha
        } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: "Nome, email e senha são obrigatórios."
            });
        }

        const usuarioExistente = await usuarioRepository.buscarPorEmail(email);

        if (usuarioExistente) {
            return res.status(409).json({
                mensagem: "Este email já está cadastrado."
            });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await usuarioRepository.criar({
            nome,
            email,
            telefone,
            cpf,
            senha: senhaCriptografada,
            tipo: "cliente"
        });

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso.",
            usuario
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao cadastrar usuário."
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: "Email e senha são obrigatórios."
            });
        }

        const usuario = await usuarioRepository.buscarPorEmail(email);

        if (!usuario) {
            return res.status(401).json({
                mensagem: "Email ou senha inválidos."
            });
        }

        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaValida) {
            return res.status(401).json({
                mensagem: "Email ou senha inválidos."
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                tipo: usuario.tipo
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            mensagem: "Login realizado com sucesso.",
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro ao realizar login."
        });
    }
};

module.exports = {
    cadastrar,
    login
};
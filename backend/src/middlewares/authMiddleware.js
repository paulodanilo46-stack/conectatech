const jwt = require("jsonwebtoken");

const autenticar = (req, res, next) => {
    try {
        const cabecalho = req.headers.authorization;

        if (!cabecalho) {
            return res.status(401).json({
                mensagem: "Token não informado."
            });
        }

        const partes = cabecalho.split(" ");

        if (partes.length !== 2 || partes[0] !== "Bearer") {
            return res.status(401).json({
                mensagem: "Formato do token inválido."
            });
        }

        const token = partes[1];

        const dados = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = dados;

        next();

    } catch (erro) {
        return res.status(401).json({
            mensagem: "Token inválido ou expirado."
        });
    }
};

module.exports = autenticar;
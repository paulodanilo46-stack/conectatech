const autorizar = (tipoPermitido) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).json({
                mensagem: "Usuário não autenticado."
            });
        }

        if (req.usuario.tipo !== tipoPermitido) {
            return res.status(403).json({
                mensagem: "Acesso negado."
            });
        }

        next();
    };
};

module.exports = autorizar;
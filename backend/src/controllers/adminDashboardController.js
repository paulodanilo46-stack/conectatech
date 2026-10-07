const adminDashboardRepository =
    require("../repositories/adminDashboardRepository");

const resumo = async (req, res) => {
    try {
        const dados =
            await adminDashboardRepository.obterResumo();

        return res.status(200).json({
            dashboard: dados
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem:
                "Erro ao carregar dashboard administrativo."
        });
    }
};

module.exports = {
    resumo
};
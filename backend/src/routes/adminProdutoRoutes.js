const express = require("express");

const adminProdutoController =
    require("../controllers/adminProdutoController");

const autenticar =
    require("../middlewares/authMiddleware");

const autorizar =
    require("../middlewares/autorizar");

const router = express.Router();

router.get(
    "/",
    autenticar,
    autorizar("administrador"),
    adminProdutoController.listar
);

router.post(
    "/",
    autenticar,
    autorizar("administrador"),
    adminProdutoController.criar
);

router.get(
    "/:id",
    autenticar,
    autorizar("administrador"),
    adminProdutoController.buscarPorId
);

router.put(
    "/:id",
    autenticar,
    autorizar("administrador"),
    adminProdutoController.atualizar
);

router.put(
    "/:id/estoque",
    autenticar,
    autorizar("administrador"),
    adminProdutoController.atualizarEstoque
);

router.put(
    "/:id/ativo",
    autenticar,
    autorizar("administrador"),
    adminProdutoController.alterarAtivo
);

module.exports = router;
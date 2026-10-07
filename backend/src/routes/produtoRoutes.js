const express = require("express");

const produtoController = require("../controllers/produtoController");
const autenticar = require("../middlewares/authMiddleware");
const autorizar = require("../middlewares/autorizar");

const router = express.Router();

router.get("/", produtoController.listar);

router.get("/:id", produtoController.buscarPorId);

router.post(
    "/",
    autenticar,
    autorizar("administrador"),
    produtoController.criar
);

router.put(
    "/:id",
    autenticar,
    autorizar("administrador"),
    produtoController.atualizar
);

router.delete(
    "/:id",
    autenticar,
    autorizar("administrador"),
    produtoController.remover
);

module.exports = router;
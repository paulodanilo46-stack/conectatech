const express = require("express");

const produtoController = require("../controllers/produtoController");
const autenticar = require("../middlewares/authMiddleware");
const autorizar = require("../middlewares/autorizar");
const uploadImagem = require("../middlewares/uploadImagem");

const router = express.Router();

router.get("/", produtoController.listar);

router.get("/:id", produtoController.buscarPorId);

router.post(
    "/",
    autenticar,
    autorizar("administrador"),
    uploadImagem.single("imagem"),
    produtoController.criar
);

router.put(
    "/:id",
    autenticar,
    autorizar("administrador"),
    uploadImagem.single("imagem"),
    produtoController.atualizar
);

router.delete(
    "/:id",
    autenticar,
    autorizar("administrador"),
    produtoController.remover
);

module.exports = router;
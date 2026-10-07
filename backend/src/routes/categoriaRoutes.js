const express = require("express");

const categoriaController = require("../controllers/categoriaController");
const autenticar = require("../middlewares/authMiddleware");
const autorizar = require("../middlewares/autorizar");

const router = express.Router();

router.get("/", categoriaController.listar);

router.get("/:id", categoriaController.buscarPorId);

router.post(
    "/",
    autenticar,
    autorizar("administrador"),
    categoriaController.criar
);

router.put(
    "/:id",
    autenticar,
    autorizar("administrador"),
    categoriaController.atualizar
);

router.delete(
    "/:id",
    autenticar,
    autorizar("administrador"),
    categoriaController.remover
);

module.exports = router;
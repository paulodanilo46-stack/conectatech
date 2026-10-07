const express = require("express");

const enderecoController =
    require("../controllers/enderecoController");

const autenticar =
    require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
    "/",
    autenticar,
    enderecoController.criar
);

router.get(
    "/",
    autenticar,
    enderecoController.listar
);

router.put(
    "/:id",
    autenticar,
    enderecoController.atualizar
);

router.delete(
    "/:id",
    autenticar,
    enderecoController.excluir
);

module.exports = router;
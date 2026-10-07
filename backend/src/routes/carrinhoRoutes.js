const express = require("express");

const carrinhoController = require("../controllers/carrinhoController");
const autenticar = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
    "/",
    autenticar,
    carrinhoController.listar
);

router.post(
    "/itens",
    autenticar,
    carrinhoController.adicionarItem
);

router.put(
    "/itens/:id",
    autenticar,
    carrinhoController.atualizarQuantidade
);

router.delete(
    "/itens/:id",
    autenticar,
    carrinhoController.removerItem
);

router.delete(
    "/",
    autenticar,
    carrinhoController.limpar
);

module.exports = router;
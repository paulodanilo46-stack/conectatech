const express = require("express");

const pedidoController =
    require("../controllers/pedidoController");

const autenticar =
    require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
    "/",
    autenticar,
    pedidoController.criar
);

router.get(
    "/",
    autenticar,
    pedidoController.listarMeusPedidos
);

router.get(
    "/:id",
    autenticar,
    pedidoController.buscarMeuPedido
);

module.exports = router;
const express = require("express");

const adminPedidoController =
    require("../controllers/adminPedidoController");

const autenticar =
    require("../middlewares/authMiddleware");

const autorizar =
    require("../middlewares/autorizar");

const router = express.Router();

router.get(
    "/",
    autenticar,
    autorizar("administrador"),
    adminPedidoController.listarTodos
);

router.get(
    "/:id",
    autenticar,
    autorizar("administrador"),
    adminPedidoController.buscarPorId
);

router.put(
    "/:id/status",
    autenticar,
    autorizar("administrador"),
    adminPedidoController.atualizarStatus
);

module.exports = router;
const express = require("express");

const usuarioController = require("../controllers/usuarioController");
const autenticar = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
    "/perfil",
    autenticar,
    usuarioController.buscarPerfil
);

router.put(
    "/perfil",
    autenticar,
    usuarioController.atualizarPerfil
);

module.exports = router;
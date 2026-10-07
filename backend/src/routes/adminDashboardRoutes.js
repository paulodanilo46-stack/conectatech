const express = require("express");

const adminDashboardController =
    require("../controllers/adminDashboardController");

const autenticar =
    require("../middlewares/authMiddleware");

const autorizar =
    require("../middlewares/autorizar");

const router = express.Router();

router.get(
    "/",
    autenticar,
    autorizar("administrador"),
    adminDashboardController.resumo
);

module.exports = router;
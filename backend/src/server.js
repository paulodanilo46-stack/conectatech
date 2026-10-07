const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const indexRoutes = require("./routes/indexRoutes");
const authRoutes = require("./routes/authRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const adminRoutes = require("./routes/adminRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const carrinhoRoutes = require("./routes/carrinhoRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const enderecoRoutes = require("./routes/enderecoRoutes");
const adminPedidoRoutes = require("./routes/adminPedidoRoutes");
const adminProdutoRoutes = require("./routes/adminProdutoRoutes");
const adminDashboardRoutes = require("./routes/adminDashboardRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/produtos", produtoRoutes);
app.use("/api/carrinho", carrinhoRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/enderecos", enderecoRoutes);
app.use("/api/admin/pedidos", adminPedidoRoutes);
app.use("/api/admin/produtos", adminProdutoRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes
);

app.get("/", (req, res) => {
    res.json({
        mensagem: "API ConectaTech funcionando!"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
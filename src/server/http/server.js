import express from 'express'
import empresaRouter from './routes/empresaRouter.js'
import usuarioRouter from './routes/usuarioRouter.js'
import permissaoRouter from './routes/permissaoRouter.js'

const app = express();
app.use(express.json());

app.use("/empresas", empresaRouter);
app.use("/usuarios", usuarioRouter);
app.use("/permissoes", permissaoRouter);

export default app;
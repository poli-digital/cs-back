import express from 'express'
import empresaRouter from './routes/empresaRouter.js'
import usuarioRouter from './routes/usuarioRouter.js'
import permissaoRouter from './routes/permissaoRouter.js'
import authRouter from './routes/authRouter.js'
import buscaPemissoes from '../../controllers/validacaoController.js'

const app = express();
app.use(express.json());

app.use("/empresas", empresaRouter);
app.use("/usuarios", usuarioRouter);
app.use("/permissoes", permissaoRouter);
app.use("/auth", authRouter);

app.get("/teste", buscaPemissoes);

app.use((err, req, res, next) => {
    console.log('Algo deu errado nesta requisição! Bad Request ', err)
    res.status(500).send('Algo deu errado nesta requisição! Bad Request ')
});

export default app;
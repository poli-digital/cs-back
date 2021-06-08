import express from 'express'
import empresaRouter from './routes/empresaRouter.js'
import usuarioRouter from './routes/usuarioRouter.js'
import permissaoRouter from './routes/permissaoRouter.js'

const app = express();
app.use(express.json());

app.use("/empresas", empresaRouter);
app.use("/usuarios", usuarioRouter);
app.use("/permissoes", permissaoRouter);

app.use((err, req, res, next) => {
    console.log('Something went wrong! Bad Request ', err)
    res.status(500).send('Something went wrong! Bad Request ')
});

export default app;
import express from 'express'
import empresaRouter from './routes/empresaRouter.js'
import usuarioRouter from './routes/usuarioRouter.js'
import authRouter from './routes/authRouter.js'
import {podeCriarUmaEmpresa} from '../../controllers/validacaoController.js'
import {isAuth} from '../../controllers/authController.js'
import pluginRouter from './routes/pluginRouter.js'
import configPluginPipeRouter from './routes/configPluginPipeRouter.js'
import configPluginPoliRouter from './routes/configPluginPoliRouter.js'

const app = express();
app.use(express.json());

app.use("/auth", authRouter);

app.use("/empresas", isAuth, empresaRouter);
app.use("/usuarios", isAuth, usuarioRouter);
app.use("/plugins", pluginRouter);
app.use('/configPluginsPipe', configPluginPipeRouter);
app.use('/configPluginsPoli', configPluginPoliRouter);

app.get("/teste", isAuth, podeCriarUmaEmpresa);

app.use((err, req, res, next) => {
    console.log('Algo deu errado nesta requisição! Bad Request ', err)
    res.status(500).send('Algo deu errado nesta requisição! Bad Request ')
});

export default app;
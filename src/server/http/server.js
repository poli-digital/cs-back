import express from 'express'
import companyRouter from './routes/companyRouter.js'
import userRouter from './routes/userRouter.js'
import authRouter from './routes/authRouter.js'
import {canCreateACompany} from '../../controllers/validationController.js'
import {isAuth} from '../../controllers/authController.js'
import pluginRouter from './routes/pluginRouter.js'
import configPluginsRouter from './routes/configPluginRouter.js'

const app = express();
app.use(express.json());

app.use("/auth", authRouter);

app.use("/empresas", isAuth, companyRouter);
app.use("/usuarios", isAuth, userRouter);
app.use("/plugins", pluginRouter);
app.use('/configPlugins', isAuth, configPluginsRouter);

app.get("/teste", isAuth, canCreateACompany);

app.use((err, req, res, next) => {
    console.log('Algo deu errado nesta requisição! Bad Request ', err)
    res.status(500).send('Algo deu errado nesta requisição! Bad Request ')
});

export default app;
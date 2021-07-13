import express from 'express'
import companyRouter from './routes/companyRouter.js'
import userRouter from './routes/userRouter.js'
import authRouter from './routes/authRouter.js'
import {isAuth} from '../../controllers/authController.js'
import pluginRouter from './routes/pluginRouter.js'
import configPluginsRouter from './routes/configPluginRouter.js'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../../docs/openApi/documentation.js'
import configInstallRouter from './routes/configInstallRouter.js'
import roleRouter from './routes/roleRouter.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/configInstall', configInstallRouter);

app.use("/auth", authRouter);

app.use("/companies", isAuth, companyRouter);
app.use("/users", isAuth, userRouter);
app.use("/plugins", pluginRouter);
app.use('/configPlugins', isAuth, configPluginsRouter);
app.use('/roles', isAuth, roleRouter);

app.use((err, req, res, next) => {
    console.log('Algo deu errado nesta requisição! Bad Request ', err)
    res.status(500).send('Algo deu errado nesta requisição! Bad Request ')
});

export default app;
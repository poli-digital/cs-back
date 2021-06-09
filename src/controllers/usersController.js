import User from '../models/user.js'

async function insertOne(req, res, next) {
    try {
        const user = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            bloqueado: false,
            papelId: req.body.papelId,
            empresaId: req.body.empresaId
        };

        let result = await User.create(user);

        user.id = result.id;

        res.status(201).json(user);
    } catch (e) {
        next(e);
    }
}

async function findAll(req, res, next) {
    try {
        let user = await User.findAll();

        if (user.length > 0) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Usuário não encontrado!" });
        }
    } catch (e) {
        next(e);
    }
}

async function findOne(req, res, next) {
    const user_id = req.params.id;

    try {
        let user = await User.findByPk(user_id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Usuário não encontrado!" });
        }
    } catch (e) {
        next(e);
    }
}

async function findAllGroup(req, res, next) {
    try {
        let user = await User.findAll({
            offset: 5,
            limit: 20,
            group: "customer_id",
            order: [["name"], ["customer_id", "DESC"]],
        });

        if (user.length > 0) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Usuário não encontrado!" });
        }
    } catch (e) {
        next(e);
    }
}

async function updateOne(req, res, next) {
    const user_id = req.params.id;

    const newUser = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        bloqueado: req.body.bloqueado,
        papelId: req.body.papelId,
        empresaId: req.body.empresaId
    };

    try {
        let result = await User.update(newUser, { where: { id: user_id } });

        if (result > 0) {
            newUser.id = user_id;
            res.status(200).json(newUser);
        } else {
            res.status(404).json({ message: "Usuário não encontrado!" });
        }
    } catch (e) {
        next(e);
    }
}

async function destroyOne(req, res, next) {
    const user_id = req.params.id;

    try {
        let result = await User.destroy({ where: { id: user_id } });

        if (result > 0) {
            res.status(200).json({ message: "Usuário removido!" });
        } else {
            res.status(404).json({ message: "Usuário não encontrado!" });
        }
    } catch (e) {
        next(e);
    }
}

export { insertOne, findOne, findAll, updateOne, destroyOne, findAllGroup };

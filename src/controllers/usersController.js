import {User, Papel, Empresa} from '../models/index.js'
import bcrypt from 'bcryptjs'

async function insertOne(req, res, next) {
    try {
        const user = {
            nome: req.body.nome,
            email: req.body.email,
            senha: bcrypt.hashSync(req.body.senha),
            bloqueado: false,
            papel_id: req.body.idPapel,
            empresa_id: req.body.IdEmpresa
        };

        let result = await User.create(user, {include: [{ model: Papel, as: 'papel' }]});

        user.id = result.id;

        res.status(201).json(user);
    } catch (e) {
        next(e);
    }
}

async function findAll(req, res, next) {
    try {
        let user = await User.findAll({include: [{ model: Papel, as: 'papel' }, {model: Empresa, as: 'empresa'}]});

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
        let user = await User.findByPk(user_id, {include: [{ model: Papel, as: 'papel' }, {model: Empresa, as: 'empresa'}]});

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
        bloqueado: req.body.bloqueado,
        papel_id: req.body.idPapel,
        empresa_id: req.body.IdEmpresa
    };

    try {
        let result = await User.update(newUser, { where: { id: user_id }, include: [{ model: Papel, as: 'papel' }] });

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

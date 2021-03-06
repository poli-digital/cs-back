import {User, Role, Company} from '../models/index.js'
import bcrypt from 'bcryptjs'

async function insertOne(req, res, next) {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            blocked: req.body.blocked,
            role_id: req.body.role_id,
            company_id: req.body.company_id
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
        let user = await User.findAll({include: [{ model: Role, as: 'role' }, {model: Company, as: 'company'}]});

        if (user.length > 0) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Users not found!" });
        }
    } catch (e) {
        next(e);
    }
}

async function findOne(req, res, next) {
    const user_id = req.params.id;

    try {
        let user = await User.findByPk(user_id, {include: [{ model: Role, as: 'role' }, {model: Company, as: 'company'}]});

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found!" });
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
            res.status(404).json({ message: "User not found!" });
        }
    } catch (e) {
        next(e);
    }
}

async function updateOne(req, res, next) {
    const user_id = req.params.id;

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        blocked: req.body.blocked,
        role_id: req.body.role_id,
        company_id: req.body.company_id
    };

    //Object.assign(obj, {key3: "value3"});
    if(req.body.password != undefined){
        newUser.password = bcrypt.hashSync(req.body.password);
    }

    try {
        let result = await User.update(newUser, { where: { id: user_id }, include: [{ model: Role, as: 'role' }] });

        if (result > 0) {
            newUser.id = user_id;
            res.status(200).json(newUser);
        } else {
            res.status(404).json({ message: "User not found!" });
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
            res.status(200).json({ message: "user has been removed successfully!" });
        } else {
            res.status(404).json({ message: "User not found!" });
        }
    } catch (e) {
        next(e);
    }
}

export { insertOne, findOne, findAll, updateOne, destroyOne, findAllGroup };

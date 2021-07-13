import {Role} from '../models/index.js'

async function findAll(req, res, next) {
    try {
        let role = await Role.findAll();

        if (role.length > 0) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ message: "Role not found!" });
        }
    } catch (e) {
        next(e);
    }
}

export {findAll}
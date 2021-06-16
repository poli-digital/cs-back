import {Plugin} from '../models/index.js'

async function findAll(req, res, next) {
    try {
        let plugin = await Plugin.findAll();

        if (plugin.length > 0) {
            res.status(200).json(plugin);
        } else {
            res.status(404).json({ message: "Plugins not found!" });
        }
    } catch (e) {
        next(e);
    }
}

export {findAll}
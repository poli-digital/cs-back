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

async function findOneByName(req, res, next) {
    
    const namePlugin = req.params.name;

    try {

        let plugin = await Plugin.findOne({where: {name:namePlugin}});

        if (plugin) {
            res.status(200).json(plugin);
        } else {
            res.status(404).json({ message: "Plugin not found!" });
        }
    } catch (e) {
        next(e);
    }
}

export {findAll, findOneByName}
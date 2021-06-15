import {ConfigPlugins, Empresa, Plugin} from '../models/index.js'

async function findAll(req, res, next) {
    try {
        let configPlugins = await ConfigPlugins.findAll({include: [{ model: Empresa, as: 'config_plugins_company' }, {model: Plugin, as: 'config_plugins_plugin'}]});

        if (configPlugins.length > 0) {
            res.status(200).json(configPlugins);
        } else {
            res.status(404).json({ message: "Não foi encontrado nenhuma configuração de Plugins!" });
        }
    } catch (e) {
        next(e);
    }
}

async function insertOne(req, res, next) {
    try {
        const configPlugin = {
            token: req.body.token,
            visible: req.body.visible,
            title: req.body.title,
            use_accordion: req.body.use_accordion,
            field_id: req.body.field_id,
            field_activity: req.body.field_activity,
            field_title: req.body.field_title,
            field_notes: req.body.field_notes,
            field_creation: req.body.field_creation,
            field_owner: req.body.field_owner,
            field_stage: req.body.field_stage,
            field_funnel: req.body.field_funnel,
            field_status: req.body.field_status,
            field_id_contact: req.body.field_id_contact,
            field_name: req.body.field_name,
            field_number: req.body.field_number,
            field_company: req.body.field_company,
            field_talk: req.body.field_talk,
            company_id: req.body.company_id,
            plugin_id: req.body.plugin_id
        };

        let result = await ConfigPlugins.create(configPlugin);

        configPlugin.id = result.id;

        res.status(201).json(configPlugin);
    } catch (e) {
        next(e);
    }
}

async function findOne(req, res, next) {
    const configPlugin_id = req.params.id;

    try {
        let configPlugin = await ConfigPlugins.findByPk(configPlugin_id, {include: [{ model: Empresa, as: 'config_plugins_company' }, {model: Plugin, as: 'config_plugins_plugin'}]});

        if (configPlugin) {
            res.status(200).json(configPlugin);
        } else {
            res.status(404).json({ message: "A configuração de plugin não foi encontrada!" });
        }
    } catch (e) {
        next(e);
    }
}

async function updateOne(req, res, next) {
    const configPlugin_id = req.params.id;

    const newConfigPlugin = {
        token: req.body.token,
        visible: req.body.visible,
        title: req.body.title,
        use_accordion: req.body.use_accordion,
        field_id: req.body.field_id,
        field_activity: req.body.field_activity,
        field_title: req.body.field_title,
        field_notes: req.body.field_notes,
        field_creation: req.body.field_creation,
        field_owner: req.body.field_owner,
        field_stage: req.body.field_stage,
        field_funnel: req.body.field_funnel,
        field_status: req.body.field_status,
        field_id_contact: req.body.field_id_contact,
        field_name: req.body.field_name,
        field_number: req.body.field_number,
        field_company: req.body.field_company,
        field_talk: req.body.field_talk,
        company_id: req.body.company_id,
        plugin_id: req.body.plugin_id
    };

    try {
        let result = await ConfigPlugins.update(newConfigPlugin, { where: { id: configPlugin_id }});

        if (result > 0) {
            newConfigPlugin.id = configPlugin_id;
            res.status(200).json(newConfigPlugin);
        } else {
            res.status(404).json({ message: "A configuração de plugin não foi encontrada!" });
        }
    } catch (e) {
        next(e);
    }
}

async function destroyOne(req, res, next) {
    const configPlugin_id = req.params.id;

    try {
        let result = await ConfigPlugins.destroy({ where: { id: configPlugin_id } });

        if (result > 0) {
            res.status(200).json({ message: "A configuração do plugin foi removida!" });
        } else {
            res.status(404).json({ message: "A configuração de plugin não foi encontrada!" });
        }
    } catch (e) {
        next(e);
    }
}

export {findAll, insertOne, findOne, updateOne, destroyOne}
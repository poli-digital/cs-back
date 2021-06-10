import Empresa from '../models/empresa.js'

async function insertOne(req, res, next) {
    try {
        const empresa = {
            nome: req.body.nome,
            cnpj: req.body.cnpj,
        };

        let result = await Empresa.create(empresa);

        empresa.id = result.id;

        res.status(201).json(empresa);
    } catch (e) {
        next(e);
    }
}

async function findAll(req, res, next) {
    try {
        let empresa = await Empresa.findAll();

        if (empresa.length > 0) {
            res.status(200).json(empresa);
        } else {
            res.status(404).json({ message: "Empresa não encontrada!" });
        }
    } catch (e) {
        next(e);
    }
}

async function findOne(req, res, next) {
    const empresa_id = req.params.id;

    try {
        let empresa = await Empresa.findByPk(empresa_id);

        if (empresa) {
            res.status(200).json(empresa);
        } else {
            res.status(404).json({ message: "Empresa não encontrada!" });
        }
    } catch (e) {
        next(e);
    }
}

async function findAllGroup(req, res, next) {
    try {
        let empresa = await Empresa.findAll({
            offset: 5,
            limit: 20,
            group: "customer_id",
            order: [["name"], ["customer_id", "DESC"]],
        });

        if (empresa.length > 0) {
            res.status(200).json(empresa);
        } else {
            res.status(404).json({ message: "Empresa não encontrada!" });
        }
    } catch (e) {
        next(e);
    }
}

async function updateOne(req, res, next) {
    const empresa_id = req.params.id;

    const newEmpresa = {
        nome: req.body.nome,
        cnpj: req.body.cnpj,
    };

    try {
        let result = await Empresa.update(newEmpresa, { where: { id: empresa_id } });

        if (result > 0) {
            newEmpresa.id = empresa_id;
            res.status(200).json(newEmpresa);
        } else {
            res.status(404).json({ message: "Empresa não encontrada!" });
        }
    } catch (e) {
        next(e);
    }
}

async function destroyOne(req, res, next) {
    const empresa_id = req.params.id;

    try {
        let result = await Empresa.destroy({ where: { id: empresa_id } });

        if (result > 0) {
            res.status(200).json({ message: "Empresa Removida!" });
        } else {
            res.status(404).json({ message: "Empresa não encontrada!" });
        }
    } catch (e) {
        next(e);
    }
}

export { insertOne, findOne, findAll, updateOne, destroyOne, findAllGroup };

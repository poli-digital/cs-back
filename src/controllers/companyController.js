import {Company} from '../models/index.js'

async function insertOne(req, res, next) {
    try {
        const company = {
            name: req.body.name,
            cnpj: req.body.cnpj,
        };

        let result = await Company.create(company);

        company.id = result.id;

        res.status(201).json(company);
    } catch (e) {
        next(e);
    }
}

async function findAll(req, res, next) {
    try {
        let company = await Company.findAll();

        if (company.length > 0) {
            res.status(200).json(company);
        } else {
            res.status(404).json({ message: "Companies not found!" });
        }
    } catch (e) {
        next(e);
    }
}

async function findOne(req, res, next) {
    const company_id = req.params.id;

    try {
        let company = await Company.findByPk(company_id);

        if (company) {
            res.status(200).json(company);
        } else {
            res.status(404).json({ message: "Company not found!" });
        }
    } catch (e) {
        next(e);
    }
}

async function findAllGroup(req, res, next) {
    try {
        let company = await Company.findAll({
            offset: 5,
            limit: 20,
            group: "customer_id",
            order: [["name"], ["customer_id", "DESC"]],
        });

        if (company.length > 0) {
            res.status(200).json(company);
        } else {
            res.status(404).json({ message: "Company not found!" });
        }
    } catch (e) {
        next(e);
    }
}

async function updateOne(req, res, next) {
    const company_id = req.params.id;

    const newCompany = {
        name: req.body.name,
        cnpj: req.body.cnpj,
    };

    try {
        let result = await Company.update(newCompany, { where: { id: company_id } });

        if (result > 0) {
            newCompany.id = company_id;
            res.status(200).json(newCompany);
        } else {
            res.status(404).json({ message: "Company not found!" });
        }
    } catch (e) {
        next(e);
    }
}

async function destroyOne(req, res, next) {
    const company_id = req.params.id;

    try {
        let result = await Company.destroy({ where: { id: company_id } });

        if (result > 0) {
            res.status(200).json({ message: "Company Removed Successfully!" });
        } else {
            res.status(404).json({ message: "Company not found!" });
        }
    } catch (e) {
        next(e);
    }
}

export { insertOne, findOne, findAll, updateOne, destroyOne, findAllGroup };

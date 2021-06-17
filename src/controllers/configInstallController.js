async function firstConfig(req, res, next) {
    try {
        //TODO implementar
        res.send('Implementar')
    } catch (e) {
        next(e);
    }
}

export {firstConfig};
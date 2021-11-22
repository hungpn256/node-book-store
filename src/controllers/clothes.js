const ClothesDAO = require('../dao/ClothesDAO');
exports.getAll = async (req, res) => {
    const key = req.query.key || '';
    try {
        // Validate request
        const data = await ClothesDAO.getAll(key);
        res.send(data)
    }
    catch (err) {
        console.log('err', err);
        res.status(400).send(err)
    }

};
exports.getItemById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const data = await ClothesDAO.getById(id)
        res.send(data)
    }
    catch (err) {
        console.log('err', err);
        res.status(400).send(err)
    }
};
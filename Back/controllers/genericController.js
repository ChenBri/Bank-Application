const genericGetAll = (Model) => async (req, res) => {
    try {
        const items = await Model.find();
        if (!items || items.length === 0) {
            return res.status(404).json({ error: `No ${Model.modelName.toLowerCase()}s found` });
        }
        return res.status(200).json({ success: `${Model.modelName}s retrieved`, data: items });
    } catch (err) {
        return res.status(500).json({ error: `Failed to retrieve ${Model.modelName.toLowerCase()}s` });
    }
};

const genericGetById = (Model) => async (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const item = await Model.find().sort({ _id: -1 }).skip(userId - 1).limit(1);

        if (!item || item.length === 0) {
            return res.status(404).json({ error: `${Model.modelName} with ID ${userId} not found` });
        }
        return res.status(200).json({ success: `${Model.modelName} retrieved`, data: item[0] });
    } catch (err) {
        return res.status(500).json({ error: `Failed to retrieve ${Model.modelName.toLowerCase()}` });
    }
};

module.exports = {
    genericGetAll,
    genericGetById,
};

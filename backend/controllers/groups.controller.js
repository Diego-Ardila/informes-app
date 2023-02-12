const Group = require("../models/groups.model");

module.exports = {
  async createGroup(req, res) {
    const data = req.body;
    try {
      const groupDb = await Group.create(data);
      res.status(200).json(groupDb);
    } catch (err) {
      if (err?.errors?.group?.properties.message) {
        res.status(400).json(err.errors.group.properties.message);
      } else {
        res.status(400).json(err?.message);
      }
    }
  },

  getGroups: async function (req, res) {
    try {
      const groupsDb = await Group.find();
      if (!groupsDb) throw new Error("Busqueda invalida");
      res.status(200).json(groupsDb);
    } catch (err) {
      res.status(400).json(err.message);
    }
  },
};

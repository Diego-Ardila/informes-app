const Report = require("../models/report.model");

module.exports = {
  async createReport(req, res) {
    const data = req.body;
    try {
      const reportDb = await Report.create(data);
      res.status(200).json(reportDb);
    } catch (err) {
      if (err?.errors?.report?.properties.message) {
        res.status(400).json(err.errors.report.properties.message);
      } else {
        res.status(400).json(err?.message);
      }
    }
  },

  getReport: async function (req, res) {
    const { month, year, groupId } = req;
    try {
      const reportDb = await Report.find({
        month,
        year,
        ["groupId._id"]: groupId,
      });
      if (!reportDb) throw new Error("Busqueda invalida");
      res.status(200).json(reportDb);
    } catch (err) {
      res.status(400).json(err.message);
    }
  },
};

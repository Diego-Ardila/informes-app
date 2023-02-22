const Report = require("../models/report.model");
const exceljs = require("exceljs");
const mongoose = require("mongoose");
const Group = require("../models/groups.model");
const ObjectId = mongoose.Types.ObjectId;

const monthsList = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

module.exports = {
  async createReport(req, res) {
    const data = req.body;
    try {
      const reportDb = await Report.create(data);
      const groupDb = await Group.findById(req.body.groupId);
      groupDb.reportsId.push(reportDb._id);
      await groupDb.save();
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
    try {
      const { month, year, groupId } = req.query;
      const objectId = ObjectId(groupId);

      const reportDb = await Report.find({
        month: parseInt(month),
        year: parseInt(year),
        groupId: objectId,
      }).populate("groupId");

      if (!reportDb.length) throw new Error("No se encontraron registros");
      // Crear un nuevo libro de Excel
      const workbook = new exceljs.Workbook();
      const monthName = monthsList[month];
      const worksheet = workbook.addWorksheet(
        `Informe mes de ${monthName} grupo ${reportDb[0].groupId.number}`
      );

      // Agregar los encabezados de las columnas
      worksheet.columns = [
        { header: "Publicador", key: "name", width: 20 },
        { header: "Publicaciones", key: "publications", width: 10 },
        { header: "Videos", key: "videos", width: 10 },
        { header: "Horas", key: "hours", width: 10 },
        { header: "Revisitas", key: "revisits", width: 10 },
        { header: "Estudiantes", key: "students", width: 10 },
      ];

      // Agregar las filas de datos a partir de los documentos encontrados
      reportDb.forEach((document) => {
        worksheet.addRow({
          name: document.name,
          publications: document.publications,
          videos: document.videos,
          hours: document.hours,
          revisits: document.revisits,
          students: document.students,
        });
      });

      // Escribir el libro de Excel en un stream y enviarlo como respuesta
      res.attachment("nombre-archivo.xlsx");
      const buffer = await workbook.xlsx.writeBuffer();
      res.send(buffer);
    } catch (err) {
      res.status(400).json(err.message);
    }
  },
};

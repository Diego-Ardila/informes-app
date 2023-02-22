const { Schema, model } = require("mongoose");

const reportSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    publications: {
      type: Number,
      required: true,
    },
    videos: {
      type: Number,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    revisits: {
      type: Number,
      required: true,
    },
    students: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Group",
    },
  },
  {
    timestamps: true,
  }
);

const Report = new model("Report", reportSchema);

module.exports = Report;

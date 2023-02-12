const { Schema, model } = require("mongoose");

const groupSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    usersId: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    reportsId: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Reports",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Group = new model("Group", groupSchema);

module.exports = Group;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LecturerSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide lecturer title"],
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
      required: [true, "Please provide lecturer last name"],
    },
    expertise_areas: {
      type: Array,
      required: [true, "Please provide lecturer expertise areas"],
    },
    courses: [
      {
        id: String,
        title: String,
        code: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lecturer", LecturerSchema);

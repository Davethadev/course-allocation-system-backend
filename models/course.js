const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide course title"],
    },
    code: {
      type: Number,
      required: [true, "Please provide course code"],
    },
    level: {
      type: Number,
      required: [true, "Please provide course level"],
    },
    unit: {
      type: Number,
      required: [true, "Please provide course units"],
    },
    semester: {
      type: String,
      required: [true, "Please indicate whether first or second semester"],
    },
    required_expertise: [
      {
        keyword: {
          type: String,
          required: [true, "Please provide a keyword"],
        },
        weight: {
          type: Number,
          required: [true, "Please provide a weight for the specified keyword"],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);

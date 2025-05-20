const Course = require("../models/course");
const Lecturer = require("../models/lecturer");

const getTotal = async (req, res) => {
  const [total_courses, total_lecturers] = await Promise.all([
    await Course.countDocuments().exec(),
    await Lecturer.countDocuments().exec(),
  ]);
  res.status(200).json({ total_courses, total_lecturers });
};

module.exports = { getTotal };

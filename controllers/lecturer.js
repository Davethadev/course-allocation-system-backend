const Lecturer = require("../models/lecturer");

const getAllLecturers = async (req, res) => {
  const lecturers = await Lecturer.find().sort({ createdAt: -1 });
  res.status(200).json({ lecturers });
};

const getLecturer = async (req, res) => {
  const { id: lecturerId } = req.params;
  const lecturer = await Lecturer.findById(lecturerId);
  if (!lecturer)
    throw new NotFoundError(`No lecturer with id : ${lecturerId} found`);
  res.status(200).json({ lecturer });
};

const addNewLecturer = async (req, res) => {
  const lecturer = await Lecturer.create({ ...req.body });
  res.status(200).json({ lecturer });
};

const updateLecturerDetails = async (req, res) => {
  const { id: lecturerId } = req.params;
  const lecturer = await Lecturer.findByIdAndUpdate(lecturerId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!lecturer)
    throw new NotFoundError(`No lecturer with id : ${lecturerId} found`);
  res.status(200).json({ lecturer });
};

const removeLecturer = async (req, res) => {
  const { id: lecturerId } = req.params;
  const lecturer = await Lecturer.findByIdAndRemove(lecturerId).exec();
  if (!lecturer)
    throw new NotFoundError(`No lecturer with id : ${lecturerId} found`);
  res.sendStatus(200);
};

module.exports = {
  getAllLecturers,
  getLecturer,
  addNewLecturer,
  updateLecturerDetails,
  removeLecturer,
};

const Course = require("../models/course");
const Lecturer = require("../models/lecturer");
const { allocateCourses } = require("../utils/allocateCourses");

const { BadRequestError, NotFoundError } = require("../errors");

const getAllCourses = async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.status(200).json({ courses });
};

const getCourse = async (req, res) => {
  const { id: courseId } = req.params;
  const course = await Course.findById(courseId);
  if (!course) throw new NotFoundError(`No course with id : ${courseId} found`);
  res.status(200).json({ course });
};

const addNewCourse = async (req, res) => {
  const foundCourse = await Course.findOne({ title: req.body.title });
  if (foundCourse) {
    res.status(409).json({ msg: "Course already exists" });
    return;
  }
  const course = await Course.create({ ...req.body });
  res.status(200).json({ course });
};

const updateCourse = async (req, res) => {
  const { id: courseId } = req.params;
  const course = await Course.findByIdAndUpdate(courseId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) throw new NotFoundError(`No course with id : ${courseId} found`);
  res.status(200).json({ course });
};

const deleteCourse = async (req, res) => {
  const { id: courseId } = req.params;
  try {
    // Find the course by id and delete it
    const course = await Course.findByIdAndDelete(courseId).exec();
    if (!course) {
      throw new NotFoundError(`No course with id : ${courseId} found`);
    }
    // Update lecturers who were previously assigned the deleted course
    await Lecturer.updateMany(
      { "courses.id": courseId },
      { $pull: { courses: { id: courseId } } }
    );
    res.status(200).json({ status: true, msg: "Action was successful" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const allocateCoursesToLecturers = async (req, res) => {
  const courses = await Course.find();
  const lecturers = await Lecturer.find();
  try {
    const allocatedCourses = allocateCourses(lecturers, courses);
    // Iterate through allocated courses
    // Filter unique courses
    const uniqueCourses = allocatedCourses.filter(
      (course, index, self) =>
        index ===
        self.findIndex(
          (c) => c._id.toString() === course._id.toString() // Check if the course ID is unique
        )
    );

    // Update lecturer(s) data with allocated courses
    for (const course of uniqueCourses) {
      for (const lecturerId of course.matchingLecturersDetails.map(
        (lecturer) => lecturer.id
      )) {
        const lecturer = await Lecturer.findById(lecturerId);
        if (lecturer) {
          // Check if the course is already in the lecturer's courses array
          const existingCourseIndex = lecturer.courses.findIndex(
            (existingCourse) => existingCourse._id.equals(course._id)
          );

          if (existingCourseIndex === -1) {
            // Add allocated course to lecturer's courses array
            lecturer.courses.push({
              id: course._id,
              title: course.title,
              code: course.code,
            });
            // Save the updated lecturer document
            await lecturer.save();
          }
        }
      }
    }

    // Prepare response containing course details and assigned lecturer information
    const response = allocatedCourses.map((course) => ({
      title: course.title,
      code: course.code,
      unit: course.unit,
      level: course.level,
      semester: course.semester,
      required_expertise: course.required_expertise,
      ...(course.matchingLecturersDetails
        ? { lecturer: course.matchingLecturersDetails }
        : {}),
    }));
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred during course allocation");
  }
};

module.exports = {
  getAllCourses,
  getCourse,
  addNewCourse,
  updateCourse,
  deleteCourse,
  allocateCoursesToLecturers,
};

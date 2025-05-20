const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  getCourse,
  addNewCourse,
  updateCourse,
  deleteCourse,
  allocateCoursesToLecturers,
} = require("../controllers/course");

router.route("/").get(getAllCourses).post(addNewCourse);
router.route("/allocate").get(allocateCoursesToLecturers);
router.route("/:id").get(getCourse).patch(updateCourse).delete(deleteCourse);

module.exports = router;

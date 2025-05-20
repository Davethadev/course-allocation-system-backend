const express = require("express");
const router = express.Router();

const {
  getAllLecturers,
  getLecturer,
  addNewLecturer,
  updateLecturerDetails,
  removeLecturer,
} = require("../controllers/lecturer");

router.route("/").get(getAllLecturers).post(addNewLecturer);
router
  .route("/:id")
  .get(getLecturer)
  .patch(updateLecturerDetails)
  .delete(removeLecturer);

module.exports = router;

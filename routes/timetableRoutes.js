const express = require("express");
const router = express.Router();
const timetableController = require("../controllers/timetableController");

router.post("/generate", timetableController.generateTimetable);
router.get("/timetables", timetableController.getTimetables);
router.delete("/timetable/:id", timetableController.deleteTimetable);

module.exports = router;
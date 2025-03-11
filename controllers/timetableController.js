const Timetable = require("../models/timetableModel");
const PDFDocument = require("pdfkit");
const fs = require("fs");

exports.generateTimetable = (req, res) => {
  const { subjects } = req.body;
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  if (!subjects || subjects.length === 0) {
      return res.status(400).json({ message: "Subjects list cannot be empty" });
  }

  let timetable = {};
  let availableSubjects = [...subjects];

  days.forEach((day) => {
      if (availableSubjects.length < 2) {
          // If not enough unique subjects, refill the list
          availableSubjects = [...subjects];
      }

      // Shuffle the available subjects
      availableSubjects.sort(() => Math.random() - 0.5);

      // Assign two unique subjects for the day
      timetable[day] = availableSubjects.splice(0, 2);
  });

  // Generate PDF
  const doc = new PDFDocument();
  const filePath = `uploads/timetable_${Date.now()}.pdf`;
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);
  doc.fontSize(16).text("Generated Timetable", { align: "center" }).moveDown(2);
  
  Object.keys(timetable).forEach(day => {
      doc.fontSize(14).text(`${day}: ${timetable[day].join(" | ")}`).moveDown(1);
  });

  doc.end();

  writeStream.on("finish", () => {
      Timetable.generateTimetable(subjects, timetable, filePath, (err) => {
          if (err) return res.status(500).json({ message: "Database error" });
          res.json({ message: "Timetable saved", pdf_url: filePath });
      });
  });
};


exports.getTimetables = (req, res) => {
    Timetable.gettimetables((err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(results);
    });
};

exports.deleteTimetable = (req, res) => {
    const { id } = req.params;
    Timetable.deletetimetable(id, (err) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json({ message: "Timetable deleted" });
    });
};
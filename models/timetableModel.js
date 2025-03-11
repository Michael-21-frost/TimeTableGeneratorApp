const db = require("../db");

const Timetable = {
    // Create and Save a Timetable
    generateTimetable: (subjects, days, pdf_path, callback) => {
        db.query(
            "INSERT INTO timetables (subjects, days, pdf_path, created_at) VALUES (?, ?, ?, NOW())",
            [JSON.stringify(subjects), JSON.stringify(days), pdf_path],
            (err, result) => {
                if (err) {
                    console.error("Database Insertion Error:", err);
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            }
        );
    },

    // Get All Timetables
    gettimetables: (callback) => {
        db.query("SELECT * FROM timetables ORDER BY created_at DESC", (err, results) => {
            if (err) {
                console.error("Database Fetch Error:", err);
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    // Delete a Timetable
    deletetimetable: (id, callback) => {
        db.query("DELETE FROM timetables WHERE id = ?", [id], (err, result) => {
            if (err) {
                console.error("Database Deletion Error:", err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
};

module.exports = Timetable;

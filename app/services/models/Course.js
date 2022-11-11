import { mongoose } from "~/services/db.server";

const CourseSchema = new mongoose.Schema({
  owner: String,
  name: String,
  objective: String,
  notes: [String],
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
});

const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema);

export default Course;

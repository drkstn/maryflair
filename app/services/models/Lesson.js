import { mongoose } from "~/services/db.server";

const LessonSchema = new mongoose.Schema({
  owner: String,
  name: String,
  materials: [String],
  assignments: [String],
  tags: [String],
  notes: [String],
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
});

const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema);

export default Lesson;

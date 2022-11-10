import { mongoose } from "~/services/db.server";

const LessonSchema = new mongoose.Schema({
  owner: String,
  name: String,
  notes: [String],
  unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },
});

const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema);

export default Lesson;

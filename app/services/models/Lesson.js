import { mongoose } from "~/services/db.server";

const LessonSchema = new mongoose.Schema({
  owner: String,
  header: String,
  resource: { type: mongoose.Schema.Types.ObjectId, ref: "Resource" },
  notes: [String],
});

const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema);

export default Lesson;

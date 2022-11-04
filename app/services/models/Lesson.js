import { mongoose } from "~/services/db.server";

const LessonSchema = new mongoose.Schema({
  owner: String,
  title: String,
  description: String,
  tags: [String],
});

const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema);

export default Lesson;

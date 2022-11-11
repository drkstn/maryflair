import { mongoose } from "~/services/db.server";
import slugGenerator from "mongoose-slug-generator/lib/slug-generator";
import { nanoid } from "nanoid";
mongoose.plugin(slugGenerator);

const CourseSchema = new mongoose.Schema({
  nanoid: { type: String, unique: true, default: nanoid(10) },
  owner: String,
  name: String,
  slug: { type: String, slug: "name" },
  objective: String,
  notes: [String],
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
});

const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema);

export default Course;

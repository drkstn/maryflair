import { mongoose } from "~/services/db.server";
import slugGenerator from "mongoose-slug-generator/lib/slug-generator";
import { customAlphabet } from "nanoid";
mongoose.plugin(slugGenerator);

const alphabet = "0123456789ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 10);

const LessonSchema = new mongoose.Schema({
  name: String,
  materials: [String],
  assignments: [String],
  notes: [String],
  tags: [String],
});

const CourseSchema = new mongoose.Schema({
  nanoid: {
    type: String,
    unique: true,
    required: true,
    default: () => nanoid(),
  },
  owner: String,
  name: String,
  slug: { type: String, slug: "name" },
  objective: String,
  notes: [String],
  lessons: [LessonSchema],
});

const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema);

export default Course;

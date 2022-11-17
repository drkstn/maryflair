import { mongoose } from "~/services/db.server";
import slugGenerator from "mongoose-slug-generator/lib/slug-generator";
import { customAlphabet } from "nanoid";
mongoose.plugin(slugGenerator);

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEF";
const nanoid = customAlphabet(alphabet, 10);

const LessonSchema = new mongoose.Schema({
  name: String,
  date: String,
  materials: [String],
  assignments: [String],
  notes: [String],
  tags: [String],
});

const CourseSchema = new mongoose.Schema({
  name: String,
  frequency: [Number],
  objective: String,
  notes: [String],
  lessons: [LessonSchema],
});

const ScheduleSchema = new mongoose.Schema({
  nanoid: {
    type: String,
    unique: true,
    required: true,
    default: () => nanoid(),
  },
  owner: String,
  name: String,
  slug: { type: String, slug: "name" },
  calendar: {
    period: String,
    start: String,
    end: String,
    exclude: {
      holidays: [String],
      weekends: [String],
      misc: [String],
    },
    weeks: [String],
    dates: [String],
  },
  courses: [CourseSchema],
});

const Schedule =
  mongoose.models.Schedule || mongoose.model("Schedule", ScheduleSchema);

export default Schedule;

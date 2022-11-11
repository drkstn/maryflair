import { mongoose } from "~/services/db.server";
import slugGenerator from "mongoose-slug-generator/lib/slug-generator";
import { nanoid } from "nanoid";
mongoose.plugin(slugGenerator);

const ScheduleSchema = new mongoose.Schema({
  nanoid: { type: String, unique: true, default: nanoid(10) },
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
  courses: [
    {
      name: String,
      objective: String,
      frequency: [Number],
      notes: [String],
      lessons: [
        {
          name: String,
          date: String,
          materials: [String],
          assignments: [String],
          tags: [String],
          notes: [String],
        },
      ],
    },
  ],
});

const Schedule =
  mongoose.models.Schedule || mongoose.model("Schedule", ScheduleSchema);

export default Schedule;

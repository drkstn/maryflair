import { mongoose } from "~/services/db.server";

const ScheduleSchema = new mongoose.Schema({
  owner: String,
  name: String,
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

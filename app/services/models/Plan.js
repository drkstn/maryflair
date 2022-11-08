import { mongoose } from "~/services/db.server";

const PlanSchema = new mongoose.Schema({
  owner: String,
  title: String,
  slug: String,
  calendar: {
    timePeriod: String,
    startDate: String,
    endDate: String,
    blockOut: {
      holidays: Boolean,
      weekends: Boolean,
      dates: [String],
    },
    weeks: [String],
    dates: [String],
  },
  subjects: [
    {
      frequency: [Number],
      subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    },
  ],
  resources: [
    {
      startDate: String,
      resource: { type: mongoose.Schema.Types.ObjectId, ref: "Resource" },
    },
  ],
  lessons: [
    {
      date: String,
      lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
    },
  ],
});

const Plan = mongoose.models.Plan || mongoose.model("Plan", PlanSchema);

export default Plan;

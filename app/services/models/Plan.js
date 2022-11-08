import { mongoose } from "~/services/db.server";

const PlanSchema = new mongoose.Schema({
  owner: String,
  title: String,
  slug: String,
  calendar: {
    type: String,
    start_date: String,
    end_date: String,
    block_out: {
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
      start_date: String,
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

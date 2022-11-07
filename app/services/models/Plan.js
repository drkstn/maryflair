import { mongoose } from "~/services/db.server";

const PlanSchema = new mongoose.Schema({
  owner: String,
  title: String,
  slug: String,
  type: String,
  startDate: String,
  endDate: String,
  blockOut: {
    holidays: Boolean,
    weekends: Boolean,
    dates: [String],
  },
  weeks: [String],
  days: [String],
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
});

const Plan = mongoose.models.Plan || mongoose.model("Plan", PlanSchema);

export default Plan;

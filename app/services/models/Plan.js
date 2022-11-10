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
      name: String,
      frequency: [Number],
      notes: [String],
      units: [
        {
          name: String,
          startDate: String,
          notes: [String],
          lessons: [
            {
              name: String,
              date: String,
              notes: [String],
            },
          ],
        },
      ],
    },
  ],
});

const Plan = mongoose.models.Plan || mongoose.model("Plan", PlanSchema);

export default Plan;

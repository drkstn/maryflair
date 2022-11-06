import { mongoose } from "~/services/db.server";

const CalendarSchema = new mongoose.Schema({
  owner: String,
  title: String,
  slug: String,
  startDate: String,
  endDate: String,
  blockOut: {
    holidays: Boolean,
    weekends: Boolean,
    dates: [String],
  },
  weeks: [String],
  days: [String],
});

const Calendar =
  mongoose.models.Calendar || mongoose.model("Calendar", CalendarSchema);

export default Calendar;

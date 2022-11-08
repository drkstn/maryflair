import { mongoose } from "~/services/db.server";

const UnitSchema = new mongoose.Schema({
  owner: String,
  name: String,
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  lessons: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
  notes: [String],
});

const Unit = mongoose.models.Unit || mongoose.model("Unit", UnitSchema);

export default Unit;

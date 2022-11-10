import { mongoose } from "~/services/db.server";

const SubjectSchema = new mongoose.Schema({
  owner: String,
  name: String,
  notes: [String],
  units: [{ type: mongoose.Schema.Types.ObjectId, ref: "Unit" }],
});

const Subject =
  mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);

export default Subject;

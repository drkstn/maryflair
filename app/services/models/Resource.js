import { mongoose } from "~/services/db.server";

const ResourceSchema = new mongoose.Schema({
  owner: String,
  title: String,
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  notes: [String],
});

const Resource =
  mongoose.models.Resource || mongoose.model("Resource", ResourceSchema);

export default Resource;

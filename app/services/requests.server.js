import { mongoose } from "~/services/db.server";

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export async function getUsers() {
  const res = await User.find();
  return res;
}

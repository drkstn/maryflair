import { mongoose } from "~/services/db.server";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  givenName: String,
  familyName: String,
  googleId: String,
  accessToken: String,
  refreshToken: String,
  timeZone: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;

import User from "./models/User";

export async function getUsers() {
  const res = await User.find();
  return res;
}

export async function getUser(email) {
  const res = await User.findOne({ email });
  return res;
}

export async function createUser(email, name) {
  const res = await User.create({ email, name });
  return res;
}

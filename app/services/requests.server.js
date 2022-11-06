import User from "./models/User";
import Lesson from "./models/Lesson";
import Calendar from "./models/Calendar";

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

export async function createLesson(data) {
  const res = await Lesson.create(data);
  return res;
}

export async function deleteLesson(_id) {
  const res = await Lesson.deleteOne({ _id });
  return res;
}

export async function getLessons(owner) {
  const res = await Lesson.find({ owner });
  return res;
}

// CALENDAR Requests

export async function getCalendars(owner) {
  const res = await Calendar.find({ owner });
  return res;
}

export async function getCalendar(id) {
  const res = await Calendar.findById(id);
  return res;
}

export async function createCalendar(data) {
  const res = await Calendar.create(data);
  return res;
}

export async function deleteCalendar(_id) {
  const res = await Calendar.deleteOne({ _id });
  return res;
}

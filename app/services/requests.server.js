import User from "./models/User";
import Lesson from "./models/Lesson";
import Schedule from "./models/Schedule";
import Course from "./models/Course";

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

// SCHEDULE Requests

export async function getSchedules(owner) {
  const res = await Schedule.find({ owner });
  return res;
}

export async function getSchedule(nanoid, owner) {
  const res = await Schedule.findOne({ nanoid, owner });
  return res;
}

export async function createSchedule(data) {
  const res = await Schedule.create(data);
  return res;
}

export async function deleteSchedule(nanoid) {
  const res = await Schedule.deleteOne({ nanoid });
  return res;
}

// COURSE Requests

export async function getCourses(owner) {
  const res = await Course.find({ owner });
  return res;
}

export async function getCourse(nanoid, owner) {
  const res = await Course.findOne({ nanoid, owner });
  return res;
}

export async function createCourse(data) {
  const res = await Course.create(data);
  return res;
}

export async function deleteCourse(nanoid) {
  const res = await Course.deleteOne({ nanoid });
  return res;
}

// LESSON Requests

export async function getLessons(owner) {
  const res = await Lesson.find({ owner });
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

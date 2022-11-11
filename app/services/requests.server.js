import User from "./models/User";
import Lesson from "./models/Lesson";
import Plan from "./models/Plan";
import Subject from "./models/Subject";
import Unit from "./models/Unit";
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

// PLAN Requests

export async function getPlans(owner) {
  const res = await Plan.find({ owner });
  return res;
}

export async function getPlan(_id, owner) {
  const res = await Plan.findOne({ _id, owner });
  return res;
}

export async function createPlan(data) {
  const res = await Plan.create(data);
  return res;
}

export async function deletePlan(_id) {
  const res = await Plan.deleteOne({ _id });
  return res;
}

// SUBJECT Requests

export async function getSubjects(owner) {
  const res = await Subject.find({ owner });
  return res;
}

export async function createSubject(data) {
  const res = await Subject.create(data);
  return res;
}

export async function applySubject(data) {
  const res = await Plan.create(data);
  return res;
}

// Unit Requests

export async function getUnits(owner) {
  const res = await Unit.find({ owner });
  return res;
}

export async function createUnit(data) {
  const res = await Unit.create(data);
  return res;
}

// SCHEDULE Requests

export async function getSchedules(owner) {
  const res = await Schedule.find({ owner });
  return res;
}

export async function getSchedule(_id, owner) {
  const res = await Schedule.findOne({ _id, owner });
  return res;
}

export async function createSchedule(data) {
  const res = await Schedule.create(data);
  return res;
}

export async function deleteSchedule(_id) {
  const res = await Schedule.deleteOne({ _id });
  return res;
}

// COURSE Requests

export async function getCourses(owner) {
  const res = await Course.find({ owner });
  return res;
}

export async function getCourse(_id, owner) {
  const res = await Course.findOne({ _id, owner });
  return res;
}

export async function createCourse(data) {
  const res = await Course.create(data);
  return res;
}

export async function deleteCourse(_id) {
  const res = await Course.deleteOne({ _id });
  return res;
}

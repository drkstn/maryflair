import User from "./models/User";
import Lesson from "./models/Lesson";
import Plan from "./models/Plan";
import Subject from "./models/Subject";
import Resource from "./models/Resource";

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

// RESOURCE Requests

export async function getResources(owner) {
  const res = await Resource.find({ owner });
  return res;
}

export async function createResource(data) {
  const res = await Resource.create(data);
  return res;
}

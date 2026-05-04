import { json } from "../libs/response";
import { store } from "../libs/store";
import { checkAuth } from "../libs/auth";

export const createTask = async (event: any) => {
  if (!checkAuth(event.headers)) {
    return json(401, { message: "Unauthorized" });
  }

  const body = JSON.parse(event.body || "{}");

  if (!body.title || typeof body.title !== "string") {
    return json(400, { message: "Invalid title" });
  }

  const task = store.create(body.title);
  return json(201, task);
};

export const getTasks = async (event: any) => {
  if (!checkAuth(event.headers)) {
    return json(401, { message: "Unauthorized" });
  }

  return json(200, store.getAll());
};

export const updateTask = async (event: any) => {
  if (!checkAuth(event.headers)) {
    return json(401, { message: "Unauthorized" });
  }
  const id = event.pathParameters?.id;
  const body = JSON.parse(event.body || "{}");

  if (typeof body.completed !== "boolean") {
    return json(400, { message: "Invalid completed flag" });
  }

  const task = store.update(id, body.completed);
  if (!task) {
    return json(404, { message: "Task not found" });
  }

  return json(200, task);
};
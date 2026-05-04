import { health } from "./handlers/health";
import { createTask, getTasks, updateTask } from "./handlers/task";
import { json } from "./libs/response";

const getMethod = (event: any) =>
  event.httpMethod || event.requestContext?.http?.method;

const getPath = (event: any) =>
  event.path || event.rawPath;

export const handler = async (event: any) => {
  const method = getMethod(event)
  const path = getPath(event)

  if (method === "GET" && path === "/health") {
    return health();
  }

  if (method === "POST" && path === "/tasks") {
    return createTask(event);
  }

  if (method === "GET" && path === "/tasks") {
    return getTasks(event);
  }

  if (method === "PATCH" && path.startsWith("/tasks/")) {
    const id = path.split("/")[2];
    event.pathParameters = { id };
    return updateTask(event);
  }

  return json(404, { message: "Not Found" });
};

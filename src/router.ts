import { health } from "./handlers/health";
import { createTask, getTasks, updateTask } from "./handlers/task";
import { json } from "./libs/response";

export const handler = async (event: any) => {
  const { httpMethod, path } = event;

  if (httpMethod === "GET" && path === "/health") {
    return health();
  }

  if (httpMethod === "POST" && path === "/tasks") {
    return createTask(event);
  }

  if (httpMethod === "GET" && path === "/tasks") {
    return getTasks(event);
  }

  if (httpMethod === "PATCH" && path.startsWith("/tasks/")) {
    const id = path.split("/")[2];
    event.pathParameters = { id };
    return updateTask(event);
  }

  return json(404, { message: "Not Found" });
};

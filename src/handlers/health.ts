import { json } from "../libs/response";

export const health = async () => {
  return json(200, { status: "ok" });
};
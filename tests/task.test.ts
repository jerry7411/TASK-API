import { handler } from "../src/router";

const token = "test-token";
process.env.API_TOKEN = token;

const authHeader = {
  Authorization: `Bearer ${token}`,
};

describe("Task API", () => {
  it("should return health", async () => {
    const res = await handler({
      httpMethod: "GET",
      path: "/health",
    });

    expect(res.statusCode).toBe(200);
  });

  it("should create a task", async () => {
    const res = await handler({
      httpMethod: "POST",
      path: "/tasks",
      headers: authHeader,
      body: JSON.stringify({ title: "Buy milk" }),
    });

    expect(res.statusCode).toBe(201);
    const body = JSON.parse(res.body);
    expect(body.title).toBe("Buy milk");
  });

  it("should reject unauthorized", async () => {
    const res = await handler({
      httpMethod: "GET",
      path: "/tasks",
      headers: {},
    });

    expect(res.statusCode).toBe(401);
  });
});
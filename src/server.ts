import express from "express";
import { handler } from "./router";

const app = express();
app.use(express.json());

app.use(async (req, res) => {
  const event = {
    httpMethod: req.method,
    path: req.path,
    headers: req.headers as Record<string, string>,
    body: req.body ? JSON.stringify(req.body) : undefined,
  };

  const result = await handler(event);

  res
    .status(result.statusCode)
    .set(result.headers)
    .send(result.body);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
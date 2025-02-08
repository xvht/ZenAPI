import { Hono } from "hono";
import router from "./routes/v1";

const app = new Hono();

app.route("/v1", router);

app.get("*", (c) => {
  c.status(404);
  return c.json({ error: true, code: 404, data: "Invalid endpoint" });
});

export default app;

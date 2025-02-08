import type { Context, Next } from "hono";

export function authenticate() {
  return async (c: Context, next: Next) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
      return c.json({ error: true, code: 401, data: "Unauthorized" }, 401);
    }

    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer") {
      return c.json({ error: true, code: 401, data: "Unauthorized" }, 401);
    }

    if (token !== c.env.AUTH_TOKEN) {
      return c.json({ error: true, code: 401, data: "Unauthorized" }, 401);
    }

    await next();
  };
}

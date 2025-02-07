import { Hono } from "hono";
import { sha256 } from "./lib/crypto";
import { BucketResponse, Env } from "./typings/env";

const authenticate = () => async (c: any, next: any) => {
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

const app = new Hono<{ Bindings: Env }>();

app.get("/*", async (c) => {
  try {
    const key = c.req.path.slice(1);
    if (!key) {
      return c.json({ error: true, code: 400, data: "Key is required" }, 400);
    }

    const resultObject = (await c.env.BUCKET.get(
      key
    )) as unknown as BucketResponse;

    if (!resultObject) {
      return c.json({ error: true, code: 404, data: "Not found" }, 404);
    }

    return c.json(
      {
        error: false,
        code: 200,
        data: {
          key, // unique key
          url: `https://zen.xvh.lol/${key}`, // public URL
          size: resultObject.size, // bytes
          uploaded: resultObject.uploaded, // timestamp
          checksums: resultObject.checksums, // sha256 & md5
          metadata: {
            contentType: resultObject.httpMetadata?.contentType, // application/json, image/png, etc.
            storageClass: resultObject.storageClass, // Standard, ReducedRedundancy, Glacier
          },
        },
      },
      200
    );
  } catch (error) {
    console.error("Error in GET:", error);
    return c.json(
      { error: true, code: 500, data: "Internal server error" },
      500
    );
  }
});

app.put("/*", authenticate(), async (c) => {
  try {
    const key = c.req.path.slice(1);
    if (!key) {
      return c.json({ error: true, code: 400, data: "Key is required" }, 400);
    }

    const body = await c.req.raw.arrayBuffer();

    if (!body) {
      return c.json({ error: true, code: 400, data: "Body is required" }, 400);
    }

    const resultObject = await c.env.BUCKET.put(key, body, {
      sha256: await sha256(body),
    });

    // we don't get content type on upload result
    const contentType =
      c.req.header("Content-Type") || "application/octet-stream";

    return c.json(
      {
        error: false,
        code: 200,
        data: {
          key, // unique key
          url: `https://zen.xvh.lol/${key}`, // public URL
          size: resultObject.size, // bytes
          uploaded: resultObject.uploaded, // timestamp
          checksums: resultObject.checksums, // sha256 & md5
          metadata: {
            contentType, // application/json, image/png, etc.
            storageClass: resultObject.storageClass, // Standard, ReducedRedundancy, Glacier
          },
        },
      },
      200
    );
  } catch (error) {
    console.error("Error in PUT:", error);
    return c.json(
      { error: true, code: 500, data: "Internal server error" },
      500
    );
  }
});

app.delete("/*", authenticate(), async (c) => {
  try {
    const key = c.req.path.slice(1);
    if (!key) {
      return c.json({ error: true, code: 400, data: "Key is required" }, 400);
    }

    await c.env.BUCKET.delete(key);

    return c.json(
      {
        error: false,
        code: 200,
        data: `${key} has been deleted`,
      },
      200
    );
  } catch (error) {
    console.error("Error in DELETE:", error);
    return c.json(
      { error: true, code: 500, data: "Internal server error" },
      500
    );
  }
});

app.all("*", (c) => {
  return c.json({ error: true, code: 405, data: "Method not allowed" }, 405);
});

export default app;

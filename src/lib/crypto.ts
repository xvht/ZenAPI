import crypto from "crypto";
import { customAlphabet } from "nanoid";

export function generateKey() {
  return customAlphabet(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    15
  )();
}

export async function sha1(data: ArrayBuffer): Promise<string> {
  try {
    const hashObj = crypto.createHash("sha1");
    hashObj.update(Buffer.from(data));
    return hashObj.digest("hex");
  } catch (error) {
    console.error("Error in sha1:", error);
    throw error;
  }
}

export async function md5(data: ArrayBuffer): Promise<string> {
  try {
    const hashObj = crypto.createHash("md5");
    hashObj.update(Buffer.from(data));
    return hashObj.digest("hex");
  } catch (error) {
    console.error("Error in md5:", error);
    throw error;
  }
}

export async function sha256(data: ArrayBuffer): Promise<string> {
  try {
    const hashObj = crypto.createHash("sha256");
    hashObj.update(Buffer.from(data));
    return hashObj.digest("hex");
  } catch (error) {
    console.error("Error in sha256:", error);
    throw error;
  }
}

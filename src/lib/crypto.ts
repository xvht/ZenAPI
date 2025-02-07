import crypto from "crypto";
import hash from "hash.js";
import SparkMD5 from "spark-md5";

export async function sha1(data: ArrayBuffer): Promise<string> {
  try {
    const hashObj = hash.sha1();
    hashObj.update(Buffer.from(data));
    return hashObj.digest("hex");
  } catch (error) {
    console.error("Error in sha1:", error);
    throw error;
  }
}

export async function md5(data: ArrayBuffer): Promise<string> {
  try {
    const spark = new SparkMD5.ArrayBuffer();
    spark.append(data);
    return spark.end(false);
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

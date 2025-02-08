import { R2Bucket } from "@cloudflare/workers-types";

export type Env = {
  BUCKET: R2Bucket;
  AUTH_TOKEN: string;
};

export type BucketResponse = {
  storageClass: string;
  range: {
    offset: number;
    length: number;
  };
  customMetadata: Record<string, string>;
  httpMetadata: Record<string, string>;
  uploaded: string;
  checksums: {
    md5: string;
  };
  httpEtag: string;
  etag: string;
  size: number;
  version: string;
  key: string;
};

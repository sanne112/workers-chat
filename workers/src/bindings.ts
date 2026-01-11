import { D1Database } from '@cloudflare/workers-types';
import { R2Bucket } from '@cloudflare/workers-types';

export interface Env {
    D1_DATABASE: D1Database;
    IMAGE_BUCKET: R2Bucket;
    KV_STORE: KVNamespace;
}
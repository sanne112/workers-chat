import { R2Bucket } from '@cloudflare/workers-types';

export interface Env {
    IMAGE_BUCKET: R2Bucket;
}

export default {
    async fetch(request: Request, env: Env) {
        if (request.method === 'POST') {
            const formData = await request.formData();
            const file = formData.get('file') as File;

            if (!file) {
                return new Response('No file uploaded', { status: 400 });
            }

            const fileName = file.name;
            const fileBuffer = await file.arrayBuffer();

            await env.IMAGE_BUCKET.put(fileName, fileBuffer, {
                httpMetadata: {
                    contentType: file.type,
                },
            });

            return new Response('File uploaded successfully', { status: 200 });
        }

        return new Response('Method not allowed', { status: 405 });
    }
};
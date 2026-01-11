# R2 Storage Setup for Cloudflare Chat Application

This document provides instructions for setting up and using R2 storage in the Cloudflare Chat Application.

## Overview

R2 is a scalable object storage solution provided by Cloudflare. It allows you to store and serve large amounts of data, such as images and files, efficiently. In this chat application, R2 is used to handle image uploads from users.

## Prerequisites

- A Cloudflare account with access to R2.
- The Cloudflare Chat Application project set up on your local machine.

## Setting Up R2

1. **Create an R2 Bucket:**
   - Log in to your Cloudflare dashboard.
   - Navigate to the R2 section.
   - Click on "Create Bucket" and provide a name for your bucket (e.g., `chat-images`).

2. **Configure Bucket Permissions:**
   - Set the appropriate permissions for your bucket to allow read and write access as needed by the chat application.

3. **Obtain R2 Credentials:**
   - After creating the bucket, you will need the Access Key ID and Secret Access Key to configure your application.
   - Store these credentials securely.

## Integrating R2 with the Chat Application

1. **Update Environment Variables:**
   - In your project, create a `.env` file (if not already present) in the root directory.
   - Add the following variables:
     ```
     R2_ACCESS_KEY_ID=your_access_key_id
     R2_SECRET_ACCESS_KEY=your_secret_access_key
     R2_BUCKET_NAME=chat-images
     ```

2. **Modify the Upload Handler:**
   - In `workers/src/upload.ts`, ensure that the upload logic uses the R2 bucket to store images. You can use the Cloudflare R2 SDK to interact with the bucket.

3. **Testing Image Uploads:**
   - Start your Cloudflare Worker and test the image upload functionality from the chat interface.
   - Ensure that images are being stored in your R2 bucket and can be retrieved correctly.

## Conclusion

By following these steps, you will have successfully set up R2 storage for your Cloudflare Chat Application. This will enable users to upload and share images seamlessly within the chat. For further customization and advanced features, refer to the Cloudflare R2 documentation.
# Cloudflare Chat App
（由ai生成，我也不知道有没有效😋）
Welcome to the Cloudflare Chat App! This project is a serverless chat application built using Cloudflare Workers and Pages. It allows users to chat in real-time, upload images, and authenticate using GitHub.

## Features

- Real-time chat functionality
- Image upload capability
- GitHub OAuth authentication
- Display of online user count

## Project Structure

```
cloudflare-chat-app
├── README.md
├── .gitignore
├── package.json
├── tsconfig.json
├── wrangler.toml
├── scripts
│   └── deploy.sh
├── db
│   └── migrations
│       └── init.sql
├── workers
│   ├── src
│   │   ├── index.ts
│   │   ├── bindings.ts
│   │   ├── github_oauth.ts
│   │   ├── upload.ts
│   │   └── durable_objects
│   │       └── chat_room.ts
│   └── package.json
├── pages
│   ├── package.json
│   ├── tsconfig.json
│   ├── public
│   │   └── _headers
│   └── src
│       ├── main.tsx
│       ├── App.tsx
│       ├── components
│       │   ├── Chat.tsx
│       │   ├── Message.tsx
│       │   ├── ImageUpload.tsx
│       │   ├── LoginWithGitHub.tsx
│       │   └── OnlineCount.tsx
│       ├── hooks
│       │   └── useWebSocket.ts
│       └── styles
│           └── global.css
├── infra
│   ├── r2
│   │   └── README.md
│   └── d1
│       └── schema.sql
└── types
    └── index.d.ts
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/cloudflare-chat-app.git
   cd cloudflare-chat-app
   ```

2. **Install dependencies:**
   Navigate to both the `workers` and `pages` directories and run:
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Set up your GitHub OAuth application and add the necessary environment variables in your Cloudflare dashboard.

4. **Deploy the application:**
   Use the provided deployment script:
   ```bash
   ./scripts/deploy.sh
   ```

## Usage

- Access the chat application via the URL provided after deployment.
- Users can log in using their GitHub accounts.
- Once logged in, users can send messages, upload images, and see the number of online users.

## Contributing

Feel free to submit issues or pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License. See the LICENSE file for details.

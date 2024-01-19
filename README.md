## AI Samples

This project has some GPT integration samples and is meant to experiment with and extend these ideas. The project structure is definitely subject to change. The `Pages` so far are

- Home (there's nothing on it)
- Basic Chat (where GPT is allowed to just be itself)
- Basic RAG Chat (where GPT is given some "about us" text for a fake business and is tasked with answering questions about that business)

The chat pages talk to the pages/api routes by the same names. Those api routess are just handler functions that use a "service class" we've called `Chatter`. The difference in GPT's behavior is determined solely by the prompts fed to the `ConversationChain` that uses a `MemoryBuffer` as described here [Langchain Buffer Docs](https://js.langchain.com/docs/modules/memory/types/buffer).

To get it working locally, one will need a `.env.local` file with this variable set:

```bash
OPENAI_API_KEY=<SOME_API_KEY>
```

The UI and styles are pretty wonky so far but it's using material-ui, so people who know what they're doing could probably make it look nice.

### NextJS README:

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

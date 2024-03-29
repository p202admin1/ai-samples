## AI Samples

This project has some GPT integration samples and is meant to experiment with and extend these ideas. The project structure is definitely subject to change. Note, we're using `yarn` not `npm`.
The `Pages` so far are

- Home (there's nothing on it)
- Basic Chat (where GPT is allowed to just be itself)
- Basic RAG Chat (where GPT is given some "about us" text for a fake business and is tasked with answering questions about that business)
- Web Agent (uses a langchain agent, a webpage scraper and a memory vector store to do RAG)
- Web Search Agent (uses an agent and a search engine called "tavily" to do RAG)
- Web Not Agent (like Web Agent, but just uses a ConversationChain rather than an agent)

### Services

The structure is a little helter skelter because we're still getting a feel for what these objects are but useful code lives here:
-app

--services

----chat [has the various chat related classes and functions in cluding the "agent"]

----vectors [creates and exports the vector store]

----webloading [web scraper thingies]

### UI

-app
./layout.tsx ["root" of the app]

./page.tsx [empty home page]

--components [questionable components live here]

--basic-chat

--basic-rag

--web-agent

--web-not-agent

--web-search-agent

--hooks [questionable hooks live here]

The chat pages talk to the pages/api routes by the same names. Those api routes are just handler functions that use a "service class" we've called `Chatter`. The difference in GPT's behavior is determined solely by the prompts fed to the `ConversationChain` that uses a `MemoryBuffer` as described here [Langchain Buffer Docs](https://js.langchain.com/docs/modules/memory/types/buffer).

To get it working locally, one will need a `.env.local` file with this variable set:

```bash
NEXT_PUBLIC_BASIC_CHAT_URL="http://localhost:3000/api/basic-chat"
NEXT_PUBLIC_BASIC_RAG_URL="http://localhost:3000/api/basic-rag"
TAVILY_API_KEY=XXXX #(ask for this if you want the web search to work, it's not exciting)
AZURE_OPENAI_API_KEY=XXXX
AZURE_OPENAI_API_INSTANCE_NAME=XXXX
AZURE_OPENAI_CHAT_MODEL="gpt-35-turbo"
AZURE_OPENAI_API_VERSION="2023-12-01-preview"
AZURE_OPENAI_ENDPOINT="https://XXXX.openai.azure.com/"
AZURE_OPENAI_EMBEDDING_MODEL="text-embedding-ada-002" #(needed for the "agent" and "noagent" flows)
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

// I"m just putting random scripts in here for experiments...
const {readFileSync} = require("fs");
// const OpenAI = require("openai");
const {AzureChatOpenAI, ChatOpenAI } = require("@langchain/openai");
const { OpenAIEmbeddings } = require('@langchain/openai');
const { MemoryVectorStore } = require('langchain/vectorstores/memory');
const { ConversationChain } = require("langchain/chains");
const { BufferMemory } = require("langchain/memory");
const {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} = require("@langchain/core/prompts");
const { Document } = require("langchain/document");

const doc = new Document({ pageContent: "foo" });

/********************
ENV VARS NEEDED IN .env.local:

NEXT_PUBLIC_BASIC_CHAT_URL="http://localhost:3000/api/basic-chat"
NEXT_PUBLIC_BASIC_RAG_URL="http://localhost:3000/api/basic-rag"
TAVILY_API_KEY=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
AZURE_OPENAI_API_KEY=XXXX
AZURE_OPENAI_API_INSTANCE_NAME=XXXX
AZURE_OPENAI_CHAT_MODEL="gpt-35-turbo"
AZURE_OPENAI_API_VERSION="2023-12-01-preview"
AZURE_OPENAI_ENDPOINT="https://XXXX.openai.azure.com/"
AZURE_OPENAI_EMBEDDING_MODEL="text-embedding-ada-002"
*/

const openAIApiKey = "";
const embeddingModel = "text-embedding-ada-002";
const chatModel = "gpt-35-turbo"
const openAIBasePath = ""
const openAIApiVersion = "2023-12-01-preview"

function getConversationChain(template, llm) {
  return new ConversationChain({
    llm,
    memory: new BufferMemory({ returnMessages: true, memoryKey: "history", inputKey: "message" }),
    prompt: ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(template),
      new MessagesPlaceholder("history"),
      HumanMessagePromptTemplate.fromTemplate("{message}"),
    ])
  });
}

async function getInMemoryVectorStore(documents) {
  const vectorstore = await MemoryVectorStore.fromDocuments(
    documents,
    new OpenAIEmbeddings({
      modelName: "text-embedding-ada-002",
      azureOpenAIApiKey: openAIApiKey,
      azureOpenAIApiInstanceName: "agileassist-openai",
      azureOpenAIApiDeploymentName: "text-embedding-ada-002",
      azureOpenAIApiVersion: openAIApiVersion,
    }),
  );
  return vectorstore.asRetriever();
}
// https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#rest-api-versioning
//"https://agileassist-openai.openai.azure.com/",

(async () => {
  try {
    const azureChatOpenAI = new AzureChatOpenAI({
      openAIApiKey,
      openAIBasePath,
      deploymentName: chatModel,
      openAIApiVersion,
      verbose: true,
    });
    
    const azureEmbeddingModel = new AzureChatOpenAI({
      openAIApiKey,
      openAIBasePath,
      deploymentName: embeddingModel,
      openAIApiVersion,
      verbose: true,
    });

    const chain = getConversationChain("You are gpt, be yourself when answering questions", azureChatOpenAI);
    const res = await chain.call({message: "what is openai?"});
    console.log(res);

    const documents = [new Document({pageContent: "lol test"})];
    const vectorStore = await getInMemoryVectorStore(documents);
    console.log(vectorStore);
  } catch(e) {
    console.error(e);
  }
})();

/*
const openai = new OpenAI({
      apiKey,
      baseURL: `https://${resource}.openai.azure.com/openai/deployments/${model}`,
      defaultQuery: { 'api-version': apiVersion },
      defaultHeaders: { 'api-key': apiKey },
    });

    const responsePromise = openai.embeddings.create({
      input: 'The quick brown fox jumped over the lazy dog',
      model,
    });
    const response = await responsePromise;
    console.log(response);
*/
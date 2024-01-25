import { AzureChatOpenAI } from "@langchain/openai";

// export const chatOpenAI = new ChatOpenAI({ 
//   modelName: "gpt-3.5-turbo",
//   temperature: 0,
//   openAIApiKey: process.env.OPENAI_API_KEY,
// });

console.log("env: ", process.env.AZURE_OPENAI_CHAT_MODEL)
export const azureChatOpenAI = new AzureChatOpenAI({
  openAIApiKey: process.env.AZURE_OPENAI_API_KEY,
  openAIBasePath: process.env.AZURE_OPENAI_ENDPOINT,
  deploymentName: process.env.AZURE_OPENAI_CHAT_MODEL,
  openAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
  verbose: true,
  // azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_CHAT_MODEL,
});

// we don't actually use this model for embeddings, see app/services/vectors/index.ts
// maybe we never will use this directly
// export const azureEmbeddingModel = new AzureChatOpenAI({
//   openAIApiKey: process.env.AZURE_OPENAI_API_KEY,
//   openAIBasePath: process.env.AZURE_OPENAI_ENDPOINT,
//   deploymentName: process.env.AZURE_OPENAI_EMBEDDING_MODEL,
//   openAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
// });


// regular completions model. not using yet.
// export const azureOpenAI = new AzureOpenAI({
//   openAIApiKey: process.env.AZURE_OPENAI_API_KEY || "lol-oops",
//   openAIBasePath: process.env.AZURE_OPENAI_ENDPOINT || "lol-oops",
//   deploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
//   openAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
// });

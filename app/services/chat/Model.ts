import { /*AzureChatOpenAI, AzureOpenAI,*/ ChatOpenAI } from "@langchain/openai";

export const chatOpenAI = new ChatOpenAI({ 
  modelName: "gpt-3.5-turbo",
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY || "lol-oops",
});
/*
export const azureChatOpenAI = new AzureChatOpenAI({
  openAIApiKey: process.env.AZURE_OPENAI_API_KEY || "lol-oops",
  openAIBasePath: process.env.AZURE_OPENAI_ENDPOINT || "lol-oops",
  deploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
  openAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
});

export const azureOpenAI = new AzureOpenAI({
  openAIApiKey: process.env.AZURE_OPENAI_API_KEY || "lol-oops",
  openAIBasePath: process.env.AZURE_OPENAI_ENDPOINT || "lol-oops",
  deploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
  openAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
});
*/
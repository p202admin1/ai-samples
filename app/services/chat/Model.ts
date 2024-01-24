import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({ 
  modelName: "gpt-3.5-turbo",
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY || "lol-oops",
});

export default model;
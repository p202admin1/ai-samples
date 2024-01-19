import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({ temperature: 0, openAIApiKey: process.env.OPENAI_API_KEY || "lol-oops" });
export default model;
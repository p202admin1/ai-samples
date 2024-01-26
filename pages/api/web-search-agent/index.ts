import type { NextApiRequest, NextApiResponse } from "next";
import { err, info } from "@/app/logging";
import { getSearchAgentTemplate } from "@/app/services/chat/BasicAgent";
import { azureChatOpenAI } from "@/app/services/chat/Model";
import { createOpenAIFunctionsAgent, AgentExecutor } from 'langchain/agents';
import {TavilySearchResults} from "@langchain/community/tools/tavily_search"
import { AppChatMessage } from '@/app/types/Chat';


export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    info(`${req.method} ${req.url}`);
    const response = await tryTavilySearch(JSON.parse(req.body));
    info("response from search: ", response);

    res.status(200).json({text: response.output, source: "search"});
  } catch(e) {
    err(`error in web search "handler": ${e}`);
    res.status(500).json({error: (e as unknown as any).message});
  }
}
/**
 * 
 * This requires the `TAVILY_API_KEY` environment variable to be set, or passed into `TavilySearchResults` as `apiKey`
 */
async function tryTavilySearch(message: AppChatMessage) {
  try {
    const tools = [new TavilySearchResults({ maxResults: 2 })];
    const prompt = getSearchAgentTemplate();
    const agent = await createOpenAIFunctionsAgent({llm: azureChatOpenAI!, tools, prompt});
    const agentExecutor = new AgentExecutor({agent, tools});
    return await agentExecutor.invoke({input: message.text});

  } catch (e) {
    err(`error searching web ${e}`);
    throw e;
  }
}
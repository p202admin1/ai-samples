import type { NextApiRequest, NextApiResponse } from "next";
import BasicAgentRunner, {getDefaultAgentTemplate, getFunctionsAgentExecutor} from "@/app/services/chat/BasicAgent";
import {chatOpenAI} from "@/app/services/chat/Model";
import { err, info } from "@/app/logging";
import { getVectorStoreRetrieverTool } from '@/app/services/vectors';
import { getSplitDocuments } from '@/app/services/webloading';
import { AgentChatMessage, AgentSite, Chatters } from '@/app/types/Chat';
import { BaseMessage } from 'langchain/schema';

const defaultTemplate = getDefaultAgentTemplate();
const defaultChatHistory: BaseMessage[] = [];
let agentRunner: BasicAgentRunner | null  = null;


export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    info(`${req.method} ${req.url}`);
    const {text, selectedSite, userName}: AgentChatMessage = JSON.parse(req.body);
    if (!selectedSite || !userName) {
      return res.status(200).json({
        text: "Give yourself a name and select a site first, please.", source: Chatters.WebAgent});
    }
    const agentRunner = await getAgentRunner(selectedSite);
    const chainValues = await agentRunner.invoke(text);
  
    res.status(200).json({text: chainValues.output, source: Chatters.WebAgent});
  } catch(e) {
    err(`error in basic-chat "handler": ${e}`);
    res.status(500).json({error: (e as unknown as any).message});
  }
}

async function getAgentRunner({url, name}: AgentSite): Promise<BasicAgentRunner> {
  if (agentRunner !== null) {
    info(`using cached agent runner`);
    return agentRunner;
  }
  info(`initializing agent runner.`);
  const splitWebDocuments = await getSplitDocuments(url)
  const vectorStoreRetrieverTool = await getVectorStoreRetrieverTool(
    splitWebDocuments,
    "web_tool",
    `Search ${name} docs page. For any questions about ${name}, you must use this tool.`,
  );

  const executor = await getFunctionsAgentExecutor(
    chatOpenAI,
    [vectorStoreRetrieverTool],
    defaultTemplate,
  );
  return new BasicAgentRunner(executor, defaultChatHistory);
}
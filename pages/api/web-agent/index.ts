import type { NextApiRequest, NextApiResponse } from "next";
import BasicAgentRunner, {getDefaultAgentTemplate, getFunctionsAgentExecutor} from "@/app/services/chat/BasicAgent";
import model from "@/app/services/chat/Model";
import { err, info } from "@/app/logging";
import { getVectorStoreRetrieverTool } from '@/app/services/vectors';
import { getSplitDocuments } from '@/app/services/webloading';
import { AppChatMessage, Chatters } from '@/app/types/Chat';
import { BaseMessage } from 'langchain/schema';

const url = "https://js.langchain.com/docs/get_started/introduction";
const defaultTemplate = getDefaultAgentTemplate();
const defaultChatHistory: BaseMessage[] = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    info(`${req.method} ${req.url}`);
    const message: AppChatMessage = JSON.parse(req.body);

    const splitWebDocuments = await getSplitDocuments(url)
    const vectorStoreRetrieverTool = await getVectorStoreRetrieverTool(
      splitWebDocuments,
      "web_tool",
      "Search LangChain docs page. For any questions about LangChain, you must use this tool.",
    );

    const executor = await getFunctionsAgentExecutor(
      model,
      [vectorStoreRetrieverTool],
      defaultTemplate,
    );
    const agentRunner = new BasicAgentRunner(executor, defaultChatHistory);
    const chainValues = await agentRunner.invoke(message.text);

    res.status(200).json({text: chainValues.output, source: Chatters.WebAgent});
  } catch(e) {
    err(`error in basic-chat "handler": ${e}`);
    res.status(500).json({error: (e as unknown as any).message});
  }
}
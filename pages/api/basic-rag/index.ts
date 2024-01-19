import type { NextApiRequest, NextApiResponse } from "next";
import BasicChatter from "@/app/services/chat/BasicChatter";
import { getContextFromText } from "@/app/services/chat/getContext";
import getConversationChain from "@/app/services/chat/getConversationChain";
import { err, info } from "@/app/logging";

const context = getContextFromText("./app/texts/about.txt");
const template = `You are a chatbot that answers questions about the business described the following context: ${context}.
If a question cannot be answered based on this text, let the user know.
`;
const basicChat = new BasicChatter(getConversationChain(template));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    info(`${req.method} ${req.url}`);
    
    const response = await basicChat.handleMessage(JSON.parse(req.body));
    res.status(200).json(response);
  } catch(e) {
    err(`error in basic-chat "handler": ${e}`);
    res.status(500).json({error: (e as unknown as any).message});
  }
}
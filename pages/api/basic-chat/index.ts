import type { NextApiRequest, NextApiResponse } from "next";
import BasicChatter from "@/app/services/chat/BasicChatter";
import getConversationChain from "@/app/services/chat/getConversationChain";
import { err, info } from "@/app/logging";

const template = `You're GPT, be yourself when answering questions.`;
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
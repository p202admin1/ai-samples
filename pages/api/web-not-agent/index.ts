import { err, info } from "@/app/logging";
import {getInMemoryVectorStore} from "@/app/services/vectors/index";
import { NextApiRequest, NextApiResponse } from "next";
import { getSplitDocuments } from "@/app/services/webloading";
import NotAgent from "@/app/services/chat/NotAnAgent";


export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    info(`${req.method} ${req.url}`);
    const body = JSON.parse(req.body);
    const {text, selectedSite: {url}} = body;
    const docs = await getSplitDocuments(url);
    const vectorstore = await getInMemoryVectorStore(docs);
    const notAgent = new NotAgent(vectorstore);

    const aiResults = await notAgent.handleQuery(text);
  
    res.status(200).json({text: aiResults.response});
  } catch(e) {
    err(`error in basic-chat "handler": ${e}`);
    res.status(500).json({error: (e as unknown as any).message});
  }
}

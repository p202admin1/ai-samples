import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { ChatPromptTemplate, SystemMessagePromptTemplate, MessagesPlaceholder } from "langchain/prompts";
import { VectorStoreRetriever } from "langchain/vectorstores/base";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { azureChatOpenAI } from "./Model";
import { err } from "@/app/logging";

export default class NotAgent {
  template = `You are a chat assistant who answers questions about the document given in the following context: 
{context}.
---
{question}`;
  chain: ConversationChain;
  constructor(private vectorstore: VectorStoreRetriever<MemoryVectorStore>) {
    this.chain = new ConversationChain({
      llm: azureChatOpenAI,
      memory: new BufferMemory({ returnMessages: true, memoryKey: "history", inputKey: "question" }),
      prompt: ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(this.template),
        new MessagesPlaceholder("history"),
      ])
    });
  }

  async handleQuery(question: string) {
    try {
      const documents = await this.vectorstore.getRelevantDocuments(question);
      const context = documents.map((d) => `\n${d.pageContent}`).join("");
      const results = await this.chain.call({context, question});
      return results;
    } catch (e) {
      err(`error in "handleQuery" ${e}`);
      throw e;
    }
  }
}
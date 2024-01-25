import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import {azureChatOpenAI} from "@/app/services/chat/Model";

export default function getConversationChain(template: string): ConversationChain {
  return new ConversationChain({
    llm: azureChatOpenAI,
    memory: new BufferMemory({ returnMessages: true, memoryKey: "history", inputKey: "message" }),
    prompt: ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(template),
      new MessagesPlaceholder("history"),
      HumanMessagePromptTemplate.fromTemplate("{message}"),
    ])
  });
}
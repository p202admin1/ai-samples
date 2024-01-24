import { err } from "@/app/logging";
import { StructuredToolInterface } from "@langchain/core/tools";
import { AzureChatOpenAI, ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import {
  ChatPromptTemplate, 
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import { ChainValues, BaseMessage, HumanMessage, AIMessage } from "langchain/schema";


export default class BasicAgentRunner {
  constructor(private agentExecutor: AgentExecutor, private chatHistory: BaseMessage[]){}

  getHistory() {
    return this.chatHistory;
  }

  updateHistory(userInput: string, aiOutput: string) {
    this.chatHistory.push(
      new HumanMessage(userInput),
      new AIMessage(aiOutput),
    );
  }

  resetHistory() {
    this.chatHistory = [];
  }

  async invoke(input: string): Promise<ChainValues> {
    try {
      const values = await this.agentExecutor.invoke({input, history: this.chatHistory});
      this.updateHistory(input, values.output);
      return values;
    } catch (e) {
      err(`error invoking agent in "BasicAgent" ${e}`);
      throw e;
    }
  }
}
/**
 * 
 * This creates the AgentExecutor.
 * Main gambit: 
 * - Grab an llm, 
 * - tools (like our vector store in app/services/vectors)
 * - a prompt (like the "Default prompt" below)
 * - feed the result of this func and a list of things like HumanMessage, AIMessage, SystemMessage to 
 *   the BasicAgentRunner above and call invoke with query we"re calling "input"
 * 
 * I have no idea how much of these abstractions are useful, necessary or what. 
 * A temporary vanilla js example is in pages/api/web/index.js. Seems to work, but doesn"t blow me away.
 * We reserve the right to toss all of this in the recycle bin
 */
export async function getFunctionsAgentExecutor(
  llm: ChatOpenAI | AzureChatOpenAI,
  tools: StructuredToolInterface[],
  prompt: ChatPromptTemplate,
): Promise<AgentExecutor> {
  try {
      const agent = await createOpenAIFunctionsAgent({llm, tools, prompt});
      return new AgentExecutor({agent, tools});
  } catch(e) {
      err(`error creating agent executor in "getFunctionsAgentExecutor" ${e}`);
      throw e;
  }
}
/**
 * "DefaultAgentTemplate" comes from here:
 * //https://smith.langchain.com/hub/hwchase17/openai-functions-agent
 * It looks like this in plain string form:
`
SYSTEM
You are a helpful assistant

PLACEHOLDER
chat_history

HUMAN
{input}

PLACEHOLDER
agent_scratchpad
`
 *
 */
export function getDefaultAgentTemplate() {
  return ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant`),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
    new MessagesPlaceholder("agent_scratchpad"),
  ]);
}

export function getSearchAgentTemplate() {
  return ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant`),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
    new MessagesPlaceholder("agent_scratchpad"),
  ]);
}
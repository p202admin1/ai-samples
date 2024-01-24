// I'm just putting random scripts in here for experiments...

const { TavilySearchResults } =  require("@langchain/community/tools/tavily_search");
const { AgentExecutor, createOpenAIFunctionsAgent } = require("langchain/agents");
// const { pull } = require("langchain/hub"); // this never seems to work
const { ChatOpenAI } = require("@langchain/openai");
const { 
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} = require( "@langchain/core/prompts");

(async() => {

  const llm = new ChatOpenAI({
    modelName: "gpt-3.5-turbo-1106",
    temperature: 0,
  });
  
  // Define the tools the agent will have access to.
  const tools = [new TavilySearchResults({ maxResults: 2 })];
  
  const prompt = getDefaultAgentTemplate();
  
  const agent = await createOpenAIFunctionsAgent({
    llm,
    tools,
    prompt,
  });
  
  const agentExecutor = new AgentExecutor({
    agent,
    tools,
  });
  
  const result = await agentExecutor.invoke({
    input: "what teams are in the AFC championship game this year?" //"what is LangChain?",
  });
  
  console.log(result);

})();

function getDefaultAgentTemplate() {
  return ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant`),
    // new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
    new MessagesPlaceholder("agent_scratchpad"),
  ]);
}

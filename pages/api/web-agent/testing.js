// I'm just putting random scripts in here for experiments...
const {readFileSync} = require("fs");
const { TavilySearchResults } =  require("@langchain/community/tools/tavily_search");
const { AgentExecutor, createOpenAIFunctionsAgent } = require("langchain/agents");
// const { pull } = require("langchain/hub"); // this never seems to work
const { ChatOpenAI, AzureChatOpenAI, AzureOpenAI } = require("@langchain/openai");
const { 
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
  HumanMessage,
} = require( "@langchain/core/prompts");

(async() => {



  const llm = new AzureChatOpenAI({
    openAIApiKey: "",
    openAIBasePath: "https://*-openai.openai.azure.com/",
    deploymentName: "gpt-35-turbo",
    openAIApiVersion: "2023-12-01-preview"
  });

  const context = readFileSync("./app/texts/gnus.txt").toString("utf-8");

  const question = "what happened in this story?";
  const template = `
SYSTEM
You are a helpful assistant. Use the context to answer questions:
${context}
HUMAN
${question}
`;

  const r = await llm.invoke(template);
  console.log(r);
})();
// const template = `
// SYSTEM
// You are a helpful assistant who answers questions about the following news article:
// ${context}
// HUMAN
// ${question}
// `;
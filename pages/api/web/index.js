const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { CheerioWebBaseLoader } = require("langchain/document_loaders/web/cheerio");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { OpenAIEmbeddings } =  require("@langchain/openai");
const { createRetrieverTool } =  require("langchain/tools/retriever");
const { ChatOpenAI } = require("@langchain/openai");
const { 
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} = require("@langchain/core/prompts");
const { AIMessage, HumanMessage } = require("@langchain/core/messages");
const { AgentExecutor, createOpenAIFunctionsAgent } = require("langchain/agents");


async function getWebText() {
  const loader = new CheerioWebBaseLoader(
    "https://js.langchain.com/docs/get_started/introduction"
  );
  const rawDocs = await loader.load();
  return rawDocs;
}

async function splitText(rawDocs, chunkSize, chunkOverlap) {
  const splitter = new RecursiveCharacterTextSplitter({chunkSize, chunkOverlap});
  const docs = await splitter.splitDocuments(rawDocs);
  return docs;
}

(async () => {
  const rawDocs = await getWebText();
  const splitDocs = await splitText(rawDocs, 1000, 200);

  const vectorstore = await MemoryVectorStore.fromDocuments(splitDocs, new OpenAIEmbeddings());
  const retriever = vectorstore.asRetriever();
  
  // retriever can be used directly like this:
  // const retrieverResult = await retriever.getRelevantDocuments("what is langchain?");

  const retrieverTool = createRetrieverTool(retriever, {
    name: "langchain_search",
    description: "Search Langchain docs page. For any questions about Langchain, you must use this tool.",
  });
  const tools = [retrieverTool];

  const llm = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
  });

  const question = "what is LangChain?";

  const prompt = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant`),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
    new MessagesPlaceholder("agent_scratchpad"),
  ]);
  
  const agent = await createOpenAIFunctionsAgent({llm, tools, prompt});
  const agentExecutor = new AgentExecutor({agent, tools});

  const result = await agentExecutor.invoke({
    input: question,
    history: [
      new HumanMessage("hi! my name is Ken"),
      new AIMessage("Hello Ken! How can I assist you today?"),
    ]
  });

  console.log("result: ", result);

})();


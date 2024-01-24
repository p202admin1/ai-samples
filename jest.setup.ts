// these packages are evil and we get Reference Error: ReadableStream is not defined everywhere that uses them.
// so we get them our of our tests here.
jest.mock("langchain/document_loaders/base", () => {
  return {__esModule: true, BaseDocumentLoader: {}};
})
jest.mock("langchain/document_loaders/web/cheerio", () => {
  return {__esModule: true, CheerioWebBaseLoader: {}};
});
jest.mock("langchain/text_splitter", () => {
  class MockRCTS{}
  class MockTS{}
  return {__esModule: true, RecursiveCharacterTextSplitter: MockRCTS, TextSplitter: MockTS};
});
jest.mock("langchain/agents", () => {
  class MockExec{}
  return {__esModule: true, AgentExecutor: MockExec, createOpenAIFunctionsAgent: jest.fn()};
});


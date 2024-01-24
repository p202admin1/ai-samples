import { AgentExecutor } from 'langchain/agents';
import BasicAgentRunner from './BasicAgent';

jest.mock("@langchain/core/prompts", () => {
  class MockMPH {}
  return {
    __esModule: true,
    ChatPromptTemplate: {}, 
    HumanMessagePromptTemplate: {},
    MessagesPlaceholder: MockMPH,
    SystemMessagePromptTemplate: {},
  };
});
jest.mock("langchain/schema", () => {
  const mockCv = {}
  class MockBM {}
  class MockHM {
    constructor(public value: string) {}
  }
  class MockAM {
    constructor(public value: string) {}
  }

  return {
    __esModule: true,
    ChainValues: mockCv,
    BaseMessage: MockBM,
    HumanMessage: MockHM,
    AIMessage: MockAM,
  };
});

const humanMessage1 = "Hello";
const aiMessage1 = "Mr. Anderson...";
const humanMessage2 = "There is no spoon";
const aiMessage2 = "The future is our time";

const mockErr = new Error("test error");
const mockInvoke = jest.fn();
const mockExecutor = {
  invoke: mockInvoke
} as unknown as AgentExecutor;

afterAll(jest.clearAllMocks);
const basicAgent = new BasicAgentRunner(mockExecutor, []);

describe("BasicAgentRunner class", () => {
  it("should delegate the invoke method of the executor and update history", async () => {
    mockInvoke.mockResolvedValueOnce({output: aiMessage1});
    const res1 = await basicAgent.invoke(humanMessage1);
    expect(mockInvoke).toHaveBeenCalledTimes(1);
    expect(res1.output).toBe(aiMessage1);
    expect(basicAgent.getHistory().length).toBe(2);
  });

  it("should delegate the invoke method of the executor and update history", async () => {
    mockInvoke.mockResolvedValueOnce({output: aiMessage2});
    const res = await basicAgent.invoke(humanMessage2);
    expect(mockInvoke).toHaveBeenCalledTimes(2);
    expect(res.output).toBe(aiMessage2);
    expect(basicAgent.getHistory().length).toBe(4);
  });

  it("should throw on failure", async () => {
    mockInvoke.mockRejectedValueOnce(mockErr);
    expect(() => basicAgent.invoke("system failure")).rejects.toThrow(mockErr);
  });
});
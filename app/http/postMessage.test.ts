import { AppChatMessage } from '../types/Chat';
import {postMessage} from "./postMessage";

jest.mock("./makeFetchRequest", () => {
  class MockRequest {
    constructor(public url: string, public config: any) {}
  }
  
  (global as any).Request = MockRequest;

  const mockMakeFetch = jest.fn();
  mockMakeFetch.mockImplementation((req: MockRequest) => {
    return new Promise((resolve, reject) => {
      if (req.url === "good.com") {
        resolve({text: "lol"});
      } else {
        reject(new Error("fail fail"));
      }
    })
  })
  const mockCreateRequest = jest.fn();
  mockCreateRequest.mockImplementation((url: string, msg: AppChatMessage) => {
    return new MockRequest(url, {});
  });
  return {__esModule: true, default: mockMakeFetch, createRequest: mockCreateRequest};
});

describe("'postMessage' function", () => {
  it("should resolve", async () => {
    const res = await postMessage("good.com", {text: "test text", source: "test"});
    expect(res.text).toBe("lol");
  });

  it("should reject", async () => {
    return expect(() => postMessage("bad.com", {text: "test text", source: "test"}))
      .rejects.toThrow(new Error("fail fail"));
  });
});
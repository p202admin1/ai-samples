import type { NextApiRequest, NextApiResponse } from "next";
import handler from "./";
import { AppChatMessage } from '../../../app/types/Chat';

const mockChatterRes = {source: "bot", text: "success text"}
const mockSuccessReq = {
  url: "test",
  method: "POST",
  body: `{"source": "success", "text": "testing"}`
};

const mockErrorReq = {
  url: "test",
  method: "POST",
  body: `{"source": "fail", "text": "testing"}`
};

const mockJsonFunc = jest.fn();

const mockRes: jest.Mocked<NextApiResponse> = {
  status: jest.fn().mockReturnValue({json: mockJsonFunc}),
} as unknown as jest.Mocked<NextApiResponse>;

jest.mock("../../../app/services/chat/getConversationChain", () => {
  return { __esModule: true, default: (args: any) => ""};
});

jest.mock("../../../app/services/chat/BasicChatter", () => {
  class MockChatter {
    constructor(args: any) {}
    async handleMessage(msg: AppChatMessage): Promise<AppChatMessage> {
      if (msg.source === "success") {
        return mockChatterRes;
      }
      throw new Error("test error");
    }
  }
  return { __esModule: true, default: MockChatter};
});

describe("basic handler function", () => {
  it("should succeed", async () => {
    await handler(
      mockSuccessReq as unknown as NextApiRequest,
      mockRes as unknown as NextApiResponse);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockJsonFunc).toHaveBeenCalledWith(mockChatterRes);
  });

  it("should fail with 500", async () => {
    await handler(
      mockErrorReq as unknown as NextApiRequest,
      mockRes as unknown as NextApiResponse);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockJsonFunc).toHaveBeenCalledWith({error: "test error"});
  });
});
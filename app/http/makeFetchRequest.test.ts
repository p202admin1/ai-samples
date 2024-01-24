import makeFetchRequest, { createRequest } from './makeFetchRequest';

const goodUrl = "good.com";
const badUrl = "bad.com";
const goodData = {data: "good fetch"};
const mockJson = jest.fn();
mockJson.mockResolvedValueOnce(goodData);
const mockGoodResponse = {json: mockJson};
const mockErr = new Error("stop trying to make fetch happen");
class MockRequest {
  constructor(public url: string, public config: any) {}
}

(global as any).fetch = jest.fn((request: MockRequest) => {
  return new Promise((resolve, reject) => {
    if (request.url === goodUrl) {
      resolve(mockGoodResponse);
    } else {
      reject(mockErr);
    }
  });
});

(global as any).Request = MockRequest;

describe("fetch wrapper function 'makeFetchRequest'", () => {
  it("should resolve", async () => {
    const goodRequest = createRequest(goodUrl, "POST", "");
    const res = await makeFetchRequest(goodRequest);
    expect(res).toEqual(goodData);
  });

  it("should reject", async () => {
    const badRequest = createRequest(badUrl, "POST", "");

    expect(() => makeFetchRequest(badRequest)).rejects.toThrow(mockErr);
  });
});
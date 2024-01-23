import { Document } from 'langchain/document';
import { getWebText } from ".";
import { BaseDocumentLoader } from "langchain/document_loaders/base";

const successDotCom = "success.com";
const failDotCom = "fail.com";
const mockDocument = {page_content: "lol test"};
const testError = new Error("test error");

class MockLoader {
  constructor(private url: string) {}
  async load() {
    if (this.url === successDotCom) {
      return [mockDocument as unknown as Document<Record<string, any>>];
    }
    throw testError;
  }
}

describe("getWebText function", () => {
  it("should successfully invoke load method", async () => {
    const results = await getWebText(MockLoader as unknown as new (s: string) => BaseDocumentLoader, successDotCom);
    expect(results).toEqual([mockDocument]);
  });

  it("should fail and be the end of all things", async () => {
    expect(() => getWebText(MockLoader as unknown as new (s: string) => BaseDocumentLoader, failDotCom))
      .rejects.toThrow(testError);
  });
});
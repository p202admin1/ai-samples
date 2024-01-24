import { Document } from 'langchain/document';
import { getWebText, splitDocuments } from ".";
import { BaseDocumentLoader } from "langchain/document_loaders/base";
import { TextSplitter } from 'langchain/text_splitter';

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

const mockSplitDocuments = jest.fn();
const mockTextSplitter = {
  splitDocuments: mockSplitDocuments
};

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

describe("splitDocuments function", () => {
  it("should invoke the splitDocuments function appropriately", async () => {
    mockSplitDocuments.mockImplementationOnce((docs: Document[]) => {
      const d = docs[0];
      const [content1, content2] = (d as unknown as any).page_content.split(" ");
      return [{page_content: content1}, {page_content: content2}];
    });

    const testResults = await splitDocuments(
      [mockDocument as unknown as Document], 
      mockTextSplitter as unknown as TextSplitter,
    );
    
    expect(mockSplitDocuments).toHaveBeenCalledWith([mockDocument]);
    expect((testResults[0] as any).page_content).toBe("lol");
    expect((testResults[1] as any).page_content).toBe("test");
  });
});
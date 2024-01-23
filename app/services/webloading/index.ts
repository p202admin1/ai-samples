import { BaseDocumentLoader } from 'langchain/document_loaders/base';
import { TextSplitter } from 'langchain/text_splitter';
import { err } from '@/app/logging';
import { LangChainDocument } from '@/app/types/LangChain';

export async function getWebText(
  loaderType: new (s: string) => BaseDocumentLoader,
  url: string): Promise<LangChainDocument[]> {
  try {
    const loader = new loaderType(url);
    return await loader.load();
  } catch (e) {
    err(`error scraping web text ${e}`);
    throw e;
  }
}

export async function splitDocuments<T extends TextSplitter>(
  documents: LangChainDocument[],
  textSplitter: T): Promise<LangChainDocument[]> {
    try {
      return textSplitter.splitDocuments(documents);
    } catch (e) {
      err(`error splitting text {e}`);
      throw e;
    }
}
import { OpenAIEmbeddings } from '@langchain/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { LangChainDocument } from '@/app/types/LangChain';
import { err } from '@/app/logging';
import { VectorStoreRetriever } from 'langchain/vectorstores/base';
import { createRetrieverTool } from 'langchain/tools/retriever';


export async function getInMemoryVectorStore(
  documents: LangChainDocument[],
): Promise<VectorStoreRetriever<MemoryVectorStore>> {
  try {
    const vectorstore = await MemoryVectorStore.fromDocuments(documents, new OpenAIEmbeddings());
    return vectorstore.asRetriever();
  } catch (e) {
    err(`error in getInMemoryVectorStore ${e}`);
    throw e;
  }
}

// this return type is next level silliness
export function getRetrieverTool(
  retriever: VectorStoreRetriever<MemoryVectorStore>,
  name: string,
  description: string) {
  return createRetrieverTool(retriever, {name, description});
}
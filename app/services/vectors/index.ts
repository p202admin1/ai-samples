import { OpenAIEmbeddings } from '@langchain/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { LangChainDocument } from '@/app/types/LangChain';
import { err } from '@/app/logging';
import { VectorStoreRetriever } from 'langchain/vectorstores/base';
import { createRetrieverTool } from 'langchain/tools/retriever';

export async function getInMemoryVectorStore(
  documents: LangChainDocument[],
): Promise<VectorStoreRetriever<MemoryVectorStore>> {
  const vectorstore = await MemoryVectorStore.fromDocuments(
    documents,
    new OpenAIEmbeddings({
      modelName: process.env.AZURE_OPENAI_EMBEDDING_MODEL,
      azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
      azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
      azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_EMBEDDING_MODEL,
      azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
    }),
  );
  return vectorstore.asRetriever();
}


export async function getVectorStoreRetrieverTool(
  documents: LangChainDocument[],
  name: string,
  description: string,
) {
  try {
    const retriever = await getInMemoryVectorStore(documents);
    return createRetrieverTool(retriever, {name, description});
  } catch (e) {
    err(`error in 'getVectorStoreRetrieverTool' ${e}`);
    throw e;
  }
}
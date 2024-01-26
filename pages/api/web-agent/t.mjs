import fs from "fs";
import https from "https";
import { PdfReader } from "pdfreader";
import {createWriteStream} from 'node:fs';
import {pipeline} from 'node:stream';
import {promisify} from 'node:util'
import fetch from 'node-fetch';
import {AzureChatOpenAI } from "@langchain/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";

const openAIApiKey = "0c96f62ac80c49839dd14a209b3276d5";
const embeddingModel = "text-embedding-ada-002";
const chatModel = "gpt-35-turbo";
const openAIBasePath = "https://agileassist-openai.openai.azure.com/";
const openAIApiVersion = "2023-12-01-preview";

const azureChatOpenAI = new AzureChatOpenAI({
  openAIApiKey,
  openAIBasePath,
  deploymentName: chatModel,
  openAIApiVersion,
  // verbose: true,
});

function getConversationChain(template, llm) {
  return new ConversationChain({
    llm,
    memory: new BufferMemory({ returnMessages: true, memoryKey: "history", inputKey: "page" }),
    prompt: ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(template),
      new MessagesPlaceholder("history"),
      HumanMessagePromptTemplate.fromTemplate("{page}"),
    ])
  });
}


(async () => {
  try {
    const tempfile = "/tmp/paper.pdf"
    const url = "https://arxiv.org/pdf/2201.07311v1.pdf";
    const reader = new PdfReader();
    
    // await fetchText(fetch, url, tempfile);
    // const jackedText = await parsePdf(tempfile, reader);
    // const pages = jackedText.split("\n\n");
    // await haveGPTFixJackedText(pages[1]);

    const prompt = `You are a React and Typescript expert. Write a unit test using react testing library and the jest unit testing framework for the following React component. Please only show the code, no explanation:
<CODE_HERE>
    `;

    const resp = await azureChatOpenAI.invoke(prompt);
    fs.writeFileSync("app/hooks/useChat.test.tsx", resp.content.replace("+", ""));


  } catch (e) {
    console.error(e);
  }
})();

async function haveGPTFixJackedText(pageText) {
  const template = `You are an expert proofreader. You will be given a page of text from a research document, but the spaces have been lost from the text.
  Please reinsert the spaces where they should be and return the result (See EXAMPLE). The paper is wirtten in English.
  EXAMPLE:
  An input like this: "DatasheetforthePile"
  Should be output like this: "Datasheet for the Pile"
  `;
  const chain = getConversationChain(template, azureChatOpenAI);

  const res = await chain.call({page: pageText});
  console.log(res);
}

async function fetchText(fetchFunc, url, filePath) {
  const response = await fetchFunc(url);
  const streamPipeline = promisify(pipeline);
  await streamPipeline(response.body, createWriteStream(filePath));
}

function parsePdf(filePath, reader) {
  return new Promise((resolve, reject) => {
    let text = "";
    reader.parseFileItems(filePath, (err, item) => {
      if (err) {reject(err);}
      if (!item) {
        resolve(text);
      } else if (item.page) {
        text += "\n\n";
      } else if(item.text) {
        text += item.text;
      }
    });
  });
}

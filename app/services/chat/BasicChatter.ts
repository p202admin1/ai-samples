import { ConversationChain } from "langchain/chains";
import { AppChatMessage, Chatters } from '@/app/types/Chat';
import { err, info } from '@/app/logging';

export default class BasicChatter {
  constructor(private chain: ConversationChain) {}

  async handleMessage(chatMsg: AppChatMessage): Promise<AppChatMessage> {
    try {
      info(`sending message ${chatMsg.text} in BasicChatter 'handleMessage'`);
      const received = await this.chain.call({message: chatMsg.text});
      return {text: received.response, source: Chatters.Basic};
    } catch (e) {
      err(`error in BasicChatter 'handleMessage': ${e}`);
      throw e;
    }
  }
}
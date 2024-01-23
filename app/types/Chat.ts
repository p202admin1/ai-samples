export interface AppChatMessage {
  text: string;
  source: string;
}

export enum Chatters {
  UI = "You",
  Basic = "Basic Bot",
  BasicRag = "Basic RAG Bot",
  WebAgent = "Agent Smith"
}
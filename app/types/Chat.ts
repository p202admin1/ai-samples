export interface AppChatMessage {
  message: string;
  source: string;
}

export enum Chatters {
  UI = "You",
  Basic = "Basic Bot"
}
export interface AppChatMessage {
  text: string;
  source: string;
}

export interface AgentSite {
  name: string;
  url: string;
}

export interface AgentUIConfig {
  userName: string;
  selectedSite: AgentSite | null
}

export type AgentChatMessage = AppChatMessage & {
  userName?: string;
  selectedSite?: AgentSite
};

export enum Chatters {
  UI = "You",
  Basic = "Basic Bot",
  BasicRag = "Basic RAG Bot",
  WebAgent = "Agent Smith"
}
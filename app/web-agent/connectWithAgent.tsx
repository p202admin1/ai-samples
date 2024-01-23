import { Box } from '@mui/material';
import { FC, Component, ChangeEvent } from 'react';
import { webAgentUrl } from '../http/urls';
import { AgentUIConfig } from '../types/Chat';

const agentSites = [
  {name: "Llama2", url: "https://ai.meta.com/research/publications/llama-2-open-foundation-and-fine-tuned-chat-models/"},
  {name: "LangChain", url: "https://js.langchain.com/docs/get_started/introduction"},
  {name: "Pinecone", url: "https://docs.pinecone.io/docs/overview"},
  {name: "LlamaIndex", url: "https://www.llamaindex.ai/"},
];

type AgentChildProps = {url: string} & AgentUIConfig;

export default function connectWithAgent(Child: FC<AgentChildProps>) {
  class AgentConfigForm extends Component<{}, AgentUIConfig> {
    constructor(props: any) {
      super(props);
      this.state = {
        selectedSite: null,
        userName: ""
      };
    }

    handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      this.setState((prevState) => ({...prevState, userName: e.target.value}));
    };

    handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const newSelected =  agentSites.find((site) => site.url === e.target.value);
      if (newSelected != null) {
        this.setState((prevState) => ({...prevState, selectedSite: newSelected}));
      }
    };


    render() {
      const {userName, selectedSite} = this.state;
      const siteOptions = [<option key="empty"></option>].concat(agentSites.map(({name, url}) => {
        return <option key={name} value={url}>{name}</option>;
      }));
      const childProps: AgentChildProps = {selectedSite, url: webAgentUrl, userName};
      return(
        <Box>
          <form>
          <label htmlFor="userName">
            User Name:
            <input onChange={this.handleInputChange} id="userName"/>
          </label>
          <select onChange={this.handleSelectChange}>
            {siteOptions}
          </select>
          {selectedSite != null && <p>{selectedSite.name}</p>}
        </form>
          <Child {...childProps} />
        </Box>
      );
    }
  }
  return AgentConfigForm;
}

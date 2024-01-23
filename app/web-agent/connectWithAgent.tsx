import { FC, Component, ChangeEvent } from 'react';
import { 
  Box,
  TextField,
  Select,
  SelectChangeEvent,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
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

    handleSelectChange = (e: SelectChangeEvent) => {
      const newSelected =  agentSites.find((site) => site.url === e.target.value);
      if (newSelected != null) {
        this.setState((prevState) => ({...prevState, selectedSite: newSelected}));
      }
    };

    render() {
      const {userName, selectedSite} = this.state;
      const selectValue = selectedSite?.url ? selectedSite.url : "";
      const siteOptions = [<MenuItem disabled key="empty" value=""></MenuItem>].concat(
        agentSites.map(({name, url}) => (<MenuItem key={name} value={url}>{name}</MenuItem>)
      ));
      const childProps: AgentChildProps = {selectedSite, url: webAgentUrl, userName};
      
      return(
        <Box>
          <form>
            <TextField sx={{ m: .3 }} onChange={this.handleInputChange} label="User Name" value={userName} />
            <FormControl fullWidth variant="filled" sx={{ m: .8, minWidth: 150 }}>
              <InputLabel id="demo-simple-select-label">Site to Query</InputLabel>
              <Select  
                value={selectValue}
                id="site-selector"
                label="Site to Query"
                onChange={this.handleSelectChange}
              >
                {siteOptions}
              </Select>
            </FormControl>
            {selectedSite != null && <Typography>{`You're chatting about: ${selectedSite.name}`}</Typography>}
          </form>
          <Child {...childProps} />
        </Box>
      );
    }
  }
  return AgentConfigForm;
}

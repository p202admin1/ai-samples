import { Box, TextField, Button, Typography } from "@mui/material";
import { webSearchAgentUrl } from "../http/urls";
import { postMessage } from "../http/postMessage";
import Interstitial from '../components/Interstitial';
import useSearch from '../hooks/useSearch';


export default function WebSearchForm() {
  const {handleChange, interstitialText, searchInput, searchResults, submitSearch} = useSearch(
    webSearchAgentUrl,
    postMessage,
  );

  return (
    <Box>
      <TextField fullWidth value={searchInput} onChange={handleChange} />
      <div style={{textAlign: "center", margin: "1em 0"}}>
        <Button variant="outlined" onClick={submitSearch}>
          Search
        </Button>
      </div>
      {interstitialText !== "" && <Interstitial text={interstitialText} />}
      {searchResults !== "" && <Typography>{searchResults}</Typography>}
    </Box>
  );
}
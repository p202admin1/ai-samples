import { useState, ChangeEvent } from 'react';
import { err } from '../logging';
import { AppChatMessage, Chatters } from '../types/Chat';

export default function useSearch(url: string, postFunc: (url: string, msg: AppChatMessage) => Promise<AppChatMessage>) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchError, setSearchError] = useState<Error | null>(null);
  const [interstitialText, setInterstitialText] = useState("");
  const [searchResults, setSearchResults] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const submitSearch = async () => {
    try {
      const queryToPost = searchInput;
      setInterstitialText(`Searching for "${queryToPost} ..."`);
      setSearchInput("");
      setIsSearching(true);
      const results = await postFunc(url, {text: queryToPost, source: Chatters.UI});
      setIsSearching(false);
      setInterstitialText("");
      setSearchResults(results.text);
    } catch(e) {
      err(`error searching ${e}`);
      setSearchError(e as Error);
    }
  };
  return {handleChange, interstitialText, searchInput, searchResults, submitSearch};
}
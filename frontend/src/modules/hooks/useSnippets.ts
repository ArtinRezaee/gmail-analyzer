import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiPaths } from '../../paths';
import { environment } from '../../environment';

export type SnippetsResult = {
  snippets: string[];
  loading: boolean;
};

export const useSnippets = (): SnippetsResult => {
  const [snippets, setSnippets] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const messages = JSON.parse(
      window.sessionStorage.getItem('snippets') ?? '[]'
    );

    if (messages.length > 0) {
      setSnippets(messages ?? []);
      setLoading(false);
    } else {
      axios
        .get(`${environment.SERVER_BASE_URL}${apiPaths.GET_SNIPPETS}`)
        .then((response) => {
          const { data } = response;
          const { messages } = data;
          setSnippets(messages);
          window.sessionStorage.setItem('snippets', JSON.stringify(messages));
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setSnippets([]);
        });
    }
  }, []);

  return {
    snippets,
    loading,
  };
};

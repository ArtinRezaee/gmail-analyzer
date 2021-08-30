import React, { useCallback, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import { useSnippets } from '../hooks';
import { Toolbar } from '../common';
import SnippetsSkeleton from './snippetsSkeleton';
import SnippetList from './snippetList';

export const Snippets: React.FC = () => {
  const { loading, snippets } = useSnippets();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onCloseSnackbar = useCallback(() => {
    setOpenSnackbar(false);
  }, []);

  return (
    <>
      <Toolbar title="Snippets" showNavigation />
      {loading && <SnippetsSkeleton />}
      {!loading && (
        <SnippetList snippets={snippets} openSnackbar={setOpenSnackbar} />
      )}
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        message="Copied to clipboard!"
        autoHideDuration={3000}
        onClose={onCloseSnackbar}
      />
    </>
  );
};

export default Snippets;

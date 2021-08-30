import React, { useCallback, useState } from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useGmail } from '../hooks';
import { LoadingDialog } from '../common';
import { ReactComponent as AnalyzeIcon } from './assets/analyze.svg';

const useStyles = makeStyles((theme) => ({
  app: {
    textAlign: 'center',
    height: '100%',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    height: '70%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    marginBottom: theme.spacing(5),
  },
}));

export const Home: React.FC = () => {
  const [openLoading, setOpenLoading] = useState(false);
  const classes = useStyles();
  const { authenticateGmail, getEmails } = useGmail();
  const history = useHistory();

  const authorizeAndGetEmails = useCallback(async () => {
    setOpenLoading(true);
    const { data } = await authenticateGmail();
    const { authorizationUrl } = data;

    if (authorizationUrl) {
      window.open(authorizationUrl);
    }

    const { status } = await getEmails();

    if (status === 200) {
      setOpenLoading(false);
      history.push('/snippets');
    }
  }, [authenticateGmail, getEmails, history]);

  return (
    <>
      <div className={classes.app}>
        <div className={classes.container}>
          <div className={classes.title}>
            <AnalyzeIcon />
            <Typography variant="h3">Gmail Analyzer</Typography>
            <Typography variant="h5">
              Get snippets of your most frequnely sent emails
            </Typography>
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={authorizeAndGetEmails}>
            Get Started
          </Button>
        </div>
      </div>
      <LoadingDialog
        open={openLoading}
        title="Fetching your data..."
        setOpen={setOpenLoading}
      />
    </>
  );
};

export default Home;

import React, { useCallback } from 'react';
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

export type ToolbarProps = {
  title: string;
  showNavigation?: boolean;
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    padding: theme.spacing(2),
  },
  title: {
    paddingLeft: theme.spacing(2),
  },
}));

export const Toolbar: React.FC<ToolbarProps> = ({
  title,
  showNavigation = false,
}: ToolbarProps) => {
  const classes = useStyles();
  const history = useHistory();

  const onNavigation = useCallback(() => {
    if (!showNavigation) {
      return;
    }
    history.goBack();
  }, [history, showNavigation]);

  return (
    <div className={classes.container}>
      {showNavigation && (
        <IconButton size="small" onClick={onNavigation}>
          <ArrowBackIcon />
        </IconButton>
      )}
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
    </div>
  );
};

export default Toolbar;

import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  text: {
    marginTop: theme.spacing(1),
  },
}));

export const SnippetsSkeleton: React.FC = () => {
  return (
    <List>
      <SnippetSkeleton />
      <SnippetSkeleton />
      <SnippetSkeleton />
      <SnippetSkeleton />
      <SnippetSkeleton />
    </List>
  );
};

const SnippetSkeleton: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <ListItem>
        <ListItemText>
          <Skeleton
            variant="rect"
            width={'95%'}
            height={16}
            className={classes.text}
          />
          <Skeleton
            variant="rect"
            width={'65%'}
            height={16}
            className={classes.text}
          />
          <Skeleton
            variant="rect"
            width={'45%'}
            height={16}
            className={classes.text}
          />
        </ListItemText>
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </>
  );
};

export default SnippetsSkeleton;

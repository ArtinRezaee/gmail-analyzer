import React, { useCallback } from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  Button,
  makeStyles,
} from '@material-ui/core';

export type SnippetListProps = {
  snippets: string[];
  openSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
};

const useStyles = makeStyles((theme) => ({
  text: {
    width: '80%',
    maxWidth: '80%',
    diplay: 'flex',
    overflowWrap: 'anywhere',
  },
  noData: {
    padding: theme.spacing(2),
    fontStyle: 'italic',
  },
}));

export const SnippetList: React.FC<SnippetListProps> = ({
  snippets,
  openSnackbar,
}: SnippetListProps) => {
  const classes = useStyles();

  const onCopy = useCallback(
    (snippet: string) => {
      navigator.clipboard.writeText(snippet);
      openSnackbar(true);
    },
    [openSnackbar]
  );

  return snippets.length > 0 ? (
    <List>
      {snippets.map((snippet, index) => (
        <>
          <ListItem key={index}>
            <ListItemText
              primary={
                <Typography className={classes.text} variant="body1">
                  {snippet}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                startIcon={<FileCopyIcon />}
                onClick={() => onCopy(snippet)}>
                Copy
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant="fullWidth" component="li" />
        </>
      ))}
    </List>
  ) : (
    <Typography
      variant="body1"
      className={classes.noData}
      color="textSecondary">
      No snippets to show
    </Typography>
  );
};

export default SnippetList;

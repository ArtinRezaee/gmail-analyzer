import React, { useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
} from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

export type LoadingDialogProps = {
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: theme.spacing(12.5),
    paddingTop: 0,
    placeItems: 'center',
  },
}));

export const LoadingDialog: React.FC<LoadingDialogProps> = ({
  title,
  open,
  setOpen,
}: LoadingDialogProps) => {
  const classes = useStyles();
  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Dialog fullWidth open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className={classes.content}>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;

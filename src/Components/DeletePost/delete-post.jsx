import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { CheckCircleOutline, Delete, HighlightOff } from "@mui/icons-material";
import { deletePost } from "../../services/posts";

const DeletePost = ({ idPost }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [response, setResponse] = useState("");

  const handleClose = () => setOpenDialog(false);
  const deleteThisPost = () => {
    deletePost({ id: idPost })
      .then((data) => {
        setOpenDialog(true);
        setResponse(data?.status);
      })
      .catch((error) => {
        setOpenDialog(true);
        setResponse(error);
      });
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleClose} maxWidth="md">
        <DialogContent>
          {response === 200 ? (
            <Typography variant="h6" align="center">
              <CheckCircleOutline color="success" fontSize="large" />
              <br />
              El post fue eliminado correctamente
            </Typography>
          ) : (
            <Typography variant="h6" align="center">
              <HighlightOff color="error" />
              <br />
              Ocurrio un error, el post no se pudo eliminar
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <Tooltip title="Eliminar post" placement="top">
        <IconButton onClick={deleteThisPost}>
          <Delete />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default DeletePost;

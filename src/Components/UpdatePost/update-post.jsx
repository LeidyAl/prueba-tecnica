import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid2,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { CheckCircleOutline, Edit, HighlightOff } from "@mui/icons-material";

import { useFormik } from "formik";

import { updatePost } from "../../services/posts";

const UpdatePost = ({ idPost, title, body }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openResponse, setOpenResponse] = useState(false);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpenDialog(false);
  const handleOpen = () => setOpenDialog(true);
  const handleCloseResponse = () => setOpenResponse(false);

  const updateThisPost = () => {
    setLoading(true);
    updatePost({
      id: idPost,
      title: formik.values.title,
      body: formik.values.body,
    })
      .then((data) => {
        setResponse(data?.status);
        setOpenResponse(true);
        setOpenDialog(false);
        setLoading(false);
      })
      .catch((error) => {
        setResponse(error);
        setOpenDialog(false);
        setOpenResponse(true);
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      title: title ?? "",
      body: body ?? "",
    },

    onSubmit: (values) => {
      updateThisPost();
    },
  });

  return (
    <>
      <Dialog open={openResponse} onClose={handleCloseResponse} maxWidth="md">
        <DialogContent>
          {response === 200 ? (
            <Typography variant="h6" align="center">
              <CheckCircleOutline color="success" fontSize="large" align />
              <br />
              El post fue actualizado correctamente
            </Typography>
          ) : (
            <Typography variant="h6" align="center">
              <HighlightOff color="error" />
              <br />
              Ocurrio un error, el post no se pudo actualizar
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseResponse}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Typography variant="h6" align="center">
              Actualizar el post con el id {idPost}
            </Typography>
            <Grid2 container spacing={2} mt={2}>
              <Grid2 size={12}>
                <TextField
                  label="Título del Post"
                  value={formik.values.title}
                  name="title"
                  onChange={formik.handleChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid2>
              <Grid2 size={12}>
                <TextField
                  label="Contenido del Post"
                  value={formik.values.body}
                  name="body"
                  onChange={formik.handleChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  multiline
                  minRows={2}
                />
              </Grid2>
            </Grid2>
          </DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              endIcon={loading && <CircularProgress size={20} />}
            >
              Actualizar
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancelar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <IconButton onClick={handleOpen}>
        <Edit />
      </IconButton>
    </>
  );
};

export default UpdatePost;

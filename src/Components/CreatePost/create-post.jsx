import { useState } from "react";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { Add, CheckCircleOutline, HighlightOff } from "@mui/icons-material";

import { useFormik } from "formik";
import { createPost } from "../../services/posts";

const CreatePost = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openResponse, setOpenResponse] = useState(false);
  const [response, setResponse] = useState("");

  const handleOpen = () => setOpenDialog(true);
  const handleCloseResponse = () => setOpenResponse(false);
  const handleClose = () => {
    formik.resetForm();
    setOpenDialog(false);
  };

  const newPost = () => {
    setLoading(true);
    createPost({
      title: formik.values.title,
      body: formik.values.body,
    })
      .then((data) => {
        setResponse(data?.status);
        setOpenResponse(true);
        setOpenDialog(false);
        setLoading(false);
        formik.resetForm();
      })
      .catch((error) => {
        setResponse(error);
        setOpenResponse(true);
        setOpenDialog(false);
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      newPost();
    },
  });

  return (
    <>
      <Dialog open={openResponse} onClose={handleCloseResponse} maxWidth="md">
        <DialogContent>
          {response === 201 ? (
            <Typography variant="h6" align="center">
              <CheckCircleOutline color="success" fontSize="large" />
              <br />
              El post fue creado correctamente
            </Typography>
          ) : (
            <Typography variant="h6" align="center">
              <HighlightOff color="error" />
              <br />
              Ocurrio un error, el post no se pudo crear
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
              Crear nuevo Post
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
              Crear
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancelar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
        Crear Post
      </Button>
    </>
  );
};

export default CreatePost;

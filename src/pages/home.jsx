import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { getAllPost } from "../services/posts";
import DeletePost from "../Components/DeletePost/delete-post";

const Home = () => {
  const [rows, setRows] = useState([]);

  const getposts = async () => {
    await getAllPost()
      .then((data) => {
        setRows(data);
      })
      .catch((error) => console.log(error));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Título del post",
      width: 200,
    },
    {
      field: "body",
      headerName: "Contenido del post",
      width: 350,
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => (
        <Box>
          <DeletePost idPost={params?.row?.id}/>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    getposts();
  }, []);

  return (
    <Box padding={2} bgcolor="primary.50">
      <Typography color="primary.800" variant="h2">
        Listado de post
      </Typography>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          r
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
        />
      </Box>
    </Box>
  );
};

export default Home;

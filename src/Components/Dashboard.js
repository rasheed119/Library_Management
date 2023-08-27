import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";

function Dashboard() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [data, setdata] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getdata = async () => {
      const student_data = await axios.get(
        "https://64eae537e51e1e82c576d438.mockapi.io/Library/library"
      );
      setdata(student_data.data);
    };
    getdata();
  }, []);
  const deletebook = async (book_id, book_name) => {
    await axios.delete(
      `https://64eae537e51e1e82c576d438.mockapi.io/Library/library/${book_id}`
    );
    const remaining_book = data.filter((book_obj) => book_obj.id !== book_id);
    setdata(remaining_book);
    setSnackbarSeverity("error");
    setSnackbarMessage(`${book_name} data was deleted Successfully`);
    setSnackbarOpen(true);
  };
  function handleCloseSnackbar() {
    setSnackbarOpen(false);
  }
  const editbook = (book_name, book_author, book_img_url, book_id) => {
    const encodedBookName = encodeURIComponent(book_name);
    const encodedBookAuthor = encodeURIComponent(book_author);
    const encodedBookImageUrl = encodeURIComponent(book_img_url);
    const bookId = book_id;
    navigate(
      `/editbooks/${encodedBookName}/${encodedBookAuthor}/${encodedBookImageUrl}/${bookId}`
    );
  };
  return (
    <Base>
      <Box sx={{ marginTop: 15 }}>
        <Container fixed>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container xs={12} sx={{ mt: 2, mb: 2 }}>
              <Grid item xs={4} />
              <Grid item xs={4} />
              <Grid item xs={4}>
                <Paper elevation={3}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    textAlign="center"
                    sx={{ pt: 2, pb: 2 }}
                  >
                    Total Books : {data && data.length}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {data && data.length === 0 ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              ) : (
                data &&
                data.map((obj, index) => (
                  <Grid
                    item
                    sx={{ display: "flex", justifyContent: "center" }}
                    xs={12}
                    sm={4}
                    md={4}
                    key={index}
                  >
                    <Card sx={{ minWidth: 290 }}>
                      <CardContent>
                        <img
                          src={obj.book_img_url}
                          style={{ width: 250, height: 320 }}
                          alt={obj.book_name}
                        />
                        <Typography
                          variant="h5"
                          sx={{ mt: 2, mb: 2 }}
                          textAlign="center"
                          component="div"
                        >
                          {obj.book_name}
                        </Typography>
                        <Typography paragraph textAlign="center">
                          by
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ mt: 2, mb: 2 }}
                          textAlign="center"
                          component="div"
                        >
                          {obj.book_author}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mb: 2,
                        }}
                      >
                        <Button
                          size="small"
                          onClick={() =>
                            editbook(
                              obj.book_name,
                              obj.book_author,
                              obj.book_img_url,
                              obj.id
                            )
                          }
                          variant="outlined"
                        >
                          Edit Book
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() => deletebook(obj.id, obj.book_name)}
                        >
                          Delete
                        </Button>
                        <Snackbar
                          open={snackbarOpen}
                          autoHideDuration={4000}
                          onClose={handleCloseSnackbar}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <MuiAlert
                            elevation={6}
                            variant="filled"
                            onClose={handleCloseSnackbar}
                            severity={snackbarSeverity}
                          >
                            {snackbarMessage}
                          </MuiAlert>
                        </Snackbar>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Container>
      </Box>
    </Base>
  );
}

export default Dashboard;

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

function Dashboard() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [data, setdata] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getdata = async () => {
      const student_data = await axios.get(
        "https://64e0a57850713530432c87de.mockapi.io/users"
      );
      setdata(student_data.data);
    };
    getdata();
  }, []);
  const deleteStudent = async (student_id, student_name) => {
    await axios.delete(
      `https://64e0a57850713530432c87de.mockapi.io/users/${student_id}`
    );
    const remaining_student = data.filter(
      (student_obj) => student_obj._id !== student_id
    );
    setdata(remaining_student);
    setSnackbarSeverity("error");
    setSnackbarMessage(`${student_name} data was deleted Successfully`);
    setSnackbarOpen(true);
  };
  function handleCloseSnackbar() {
    setSnackbarOpen(false);
  }
  return (
    <Base>
      <Box sx={{ marginTop: 15 }}>
        <Container fixed>
          <Box sx={{ flexGrow: 1 }}>
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
                        <Typography
                          variant="h5"
                          sx={{ mt: 2, mb: 2 }}
                          textAlign="center"
                          component="div"
                        >
                          Name : {obj.name}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ mt: 2, mb: 2 }}
                          textAlign="center"
                          component="div"
                        >
                          Qualification : {obj.qualification}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ mt: 2, mb: 2 }}
                          textAlign="center"
                          component="div"
                        >
                          Gender : {obj.gender}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ mt: 2, mb: 1 }}
                          textAlign="center"
                          component="div"
                        >
                          Batch : {obj.batch}
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
                          onClick={() => navigate(`/editstudents/${obj._id}`)}
                          variant="outlined"
                        >
                          Edit Student
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() => deleteStudent(obj._id, obj.name)}
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

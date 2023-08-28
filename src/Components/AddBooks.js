import React from "react";
import Base from "../Base/Base";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const add_book_validation_schema = yup.object({
  book_name: yup.string().required("Book Name is Required"),
  book_author: yup.string().required("Author Name is Required"),
  book_img_url: yup.string().required("Book Image Url is required"),
});

function AddBooks() {
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        book_name: "",
        book_author: "",
        book_img_url: "",
      },
      validationSchema: add_book_validation_schema,
      onSubmit: async (book_data) => {
        await axios.post(
          `https://64eae537e51e1e82c576d438.mockapi.io/Library/library`,
          book_data
        );
        navigate("/");
      },
    });
  return (
    <Base>
      <Box sx={{ marginTop: 15 }}>
        <Container fixed>
          <form onSubmit={handleSubmit}>
            <Grid container xs={12}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {touched.book_name && errors.book_name ? (
                  <TextField
                    required
                    error
                    id="outlined-required"
                    label="Book Name"
                    value={values.book_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="book_name"
                    helperText={errors.book_name}
                    sx={{ width: 300, mb: 3 }}
                  />
                ) : (
                  <TextField
                    required
                    id="outlined-required"
                    label="Book Name"
                    value={values.book_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="book_name"
                    sx={{ width: 300, mb: 3 }}
                  />
                )}
                {touched.book_author && errors.book_author ? (
                  <TextField
                    required
                    error
                    id="outlined-required"
                    label="Book Author"
                    value={values.book_author}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="book_author"
                    helperText={errors.book_author}
                    sx={{ width: 300, mb: 3 }}
                  />
                ) : (
                  <TextField
                    required
                    id="outlined-required"
                    label="Book Author"
                    value={values.book_author}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="book_author"
                    sx={{ width: 300, mb: 3 }}
                  />
                )}
                {touched.book_img_url && errors.book_img_url ? (
                  <TextField
                    required
                    error
                    id="outlined-required"
                    label="Book Url"
                    value={values.book_img_url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="book_img_url"
                    helperText={errors.book_img_url}
                    sx={{ width: 300, mb: 3 }}
                  />
                ) : (
                  <TextField
                    required
                    id="outlined-required"
                    label="Book Url"
                    value={values.book_img_url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="book_img_url"
                    sx={{ width: 300, mb: 3 }}
                  />
                )}
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 3 }}
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </Base>
  );
}

export default AddBooks;

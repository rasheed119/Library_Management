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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";

const add_student_validation_schema = yup.object({
  name: yup
    .string()
    .matches(
      /^([aA-zZ]|[ ])+$/,
      "Name should not Contain numbers or special characters"
    )
    .required("Name is Required"),
  batch: yup
    .string()
    .matches(/^([aA-zZ]|[0-9])+$/, "Invalid Batch")
    .required("Batch is Required")
    .max(5, "Batch Should Contain 5 Characters"),
  qualification: yup
    .string()
    .matches(
      /^([aA-zZ]|[.])+$/,
      "Qualification should not Contain numbers or special characters"
    )
    .required("Qualification is required"),
  gender: yup.string().required("Gender is Required"),
});

function AddStudents({ student, setstudent }) {
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        qualification: "",
        batch: "",
        gender: "",
      },
      validationSchema: add_student_validation_schema,
      onSubmit: async (student_data) => {
        await axios.post(
          `https://64e0a57850713530432c87de.mockapi.io/users`,
          student_data
        );
        setstudent([...student]);
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
                {touched.name && errors.name ? (
                  <TextField
                    required
                    error
                    id="outlined-required"
                    label="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="name"
                    helperText={errors.name}
                    sx={{ width: 300, mb: 3 }}
                  />
                ) : (
                  <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="name"
                    sx={{ width: 300, mb: 3 }}
                  />
                )}
                {touched.batch && errors.batch ? (
                  <TextField
                    required
                    error
                    id="outlined-required"
                    label="Batch"
                    value={values.batch}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="batch"
                    helperText={errors.batch}
                    sx={{ width: 300, mb: 3 }}
                  />
                ) : (
                  <TextField
                    required
                    id="outlined-required"
                    label="Batch"
                    value={values.batch}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="batch"
                    sx={{ width: 300, mb: 3 }}
                  />
                )}
                {touched.qualification && errors.qualification ? (
                  <TextField
                    required
                    error
                    id="outlined-required"
                    label="Qualification"
                    value={values.qualification}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="qualification"
                    helperText={errors.qualification}
                    sx={{ width: 300, mb: 3 }}
                  />
                ) : (
                  <TextField
                    required
                    id="outlined-required"
                    label="Qualification"
                    value={values.qualification}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="qualification"
                    sx={{ width: 300, mb: 3 }}
                  />
                )}
                <FormControl sx={{ mt: 3 }}>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
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

export default AddStudents;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import AddStudents from "./Components/AddStudents";
import EditStudents from "./Components/EditStudents";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [student, setstudent] = useState("");
  useEffect(() => {
    const getdata = async () => {
      const student_data = await axios.get(
        "https://64e0a57850713530432c87de.mockapi.io/users"
      );
      setstudent(student_data.data);
    };
    getdata();
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard student={student} setstudent={setstudent} />}
      />
      <Route
        path="/addstudents"
        element={<AddStudents student={student} setstudent={setstudent} />}
      />
      <Route
        path="/editstudents/:id"
        element={<EditStudents student={student} setstudent={setstudent} />}
      />
    </Routes>
  );
}

export default App;

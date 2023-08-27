import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import AddBooks from "./Components/AddBooks";
import EditBooks from "./Components/EditBooks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/addbooks" element={<AddBooks />} />
      <Route
        path="/editbooks/:book_name/:book_author/:book_img_url/:book_id"
        element={<EditBooks />}
      />
    </Routes>
  );
}

export default App;

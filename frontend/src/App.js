import { Route, Routes } from "react-router-dom";
import GetUser from "./component/getuser/getuser";
import { AddUser } from "./component/adduser/adduser";
import { EditUser } from "./component/edituser/edituser";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<GetUser />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;

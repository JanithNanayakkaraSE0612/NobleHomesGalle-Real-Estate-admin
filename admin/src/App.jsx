import { Routes, Route} from "react-router-dom";
import AdminPannal from "./Pages/dashboard/AdminPannal";
import SignIn from "./Pages/Login/SignIn";
import SignUp from "./Pages/Login/SignUp";



function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminPannal />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  );
}

export default App;

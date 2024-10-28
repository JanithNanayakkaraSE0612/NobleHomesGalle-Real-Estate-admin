import { Routes, Route} from "react-router-dom";
import AdminPannal from "./Pages/dashboard/AdminPannal";
import SignIn from "./Pages/Login/SignIn";
import SignUp from "./Pages/Login/SignUp";
import HouseProperty from "./Pages/property/houseproperty";
import LandProperty from "./Pages/property/landproperty";




function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminPannal />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/home-preview" element={<HouseProperty />} />
      <Route path="/land-preview" element={<LandProperty />} />
    </Routes>
  );
}

export default App;

import { Routes, Route} from "react-router-dom";
import AdminPannal from "./Pages/dashboard/AdminPannal";
import SignIn from "./Pages/Login/SignIn";
import HouseProperty from "./Pages/property/houseproperty";
import LandProperty from "./Pages/property/landproperty";
import Dashboard from "./Components/Dashboard";




function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/login" element={<AdminPannal />} />
      <Route path="/home-preview" element={<HouseProperty />} />
      <Route path="/land-preview" element={<LandProperty />} />
      <Route path="/admin" element={<Dashboard />} />


    </Routes>
  );
}

export default App;

import { Routes, Route} from "react-router-dom";
import AdminPannal from "./Pages/dashboard/AdminPannal";
import Admin from "@/Pages/admin/Admin.jsx";
import NewAdmin from "@/Pages/admin/NewAdmin.jsx";



function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminPannal/>}/>
        <Route path="/admin" element={<Admin />} />
        <Route path="/new-admin" element={<NewAdmin />} />
    </Routes>
  );
}

export default App;

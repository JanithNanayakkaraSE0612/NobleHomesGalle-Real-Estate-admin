import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import NewAdmin from "@/Pages/admin/NewAdmin.jsx";



function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
        <Route path="/new-admin" element={<NewAdmin />} />
    </Routes>
  );
}

export default App;

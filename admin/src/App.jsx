import { Routes, Route} from "react-router-dom";
import AdminPannal from "./Pages/dashboard/AdminPannal";



function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminPannal/>}/>
    </Routes>
  );
}

export default App;

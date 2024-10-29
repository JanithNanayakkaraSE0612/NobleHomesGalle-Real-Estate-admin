import { Routes, Route} from "react-router-dom";
import AdminPannal from "./Pages/dashboard/AdminPannal";
import SignIn from "./Pages/Login/SignIn";
import SignUp from "./Pages/Login/SignUp";
import HouseProperty from "./Pages/property/houseproperty";
import LandProperty from "./Pages/property/landproperty";
import CustomerOverviewTable from "./Pages/Customer/customerOverview";
import AddNewCustomer from "./Pages/Customer/AddNewCustomer";




function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminPannal />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/home-preview" element={<HouseProperty />} />
      <Route path="/land-preview" element={<LandProperty />} />
      <Route path="/customer-overview" element={<CustomerOverviewTable />} />
      <Route path="/add-new-customer" element={<AddNewCustomer />} />
    </Routes>
  );
}

export default App;

import { Routes, Route} from "react-router-dom";
import AdminPannal from "./Pages/dashboard/AdminPannal";
import SignIn from "./Pages/Login/SignIn";
// import SignUp from "./Pages/Login/SignUp";
import HouseProperty from "./Pages/property/houseproperty";
import LandProperty from "./Pages/property/landproperty";
import CustomerOverviewTable from "./Pages/Customer/customerOverview";
import AddNewCustomer from "./Pages/Customer/AddNewCustomer";
import ListHomes from "./Pages/property/ListHomes";
import ListLands from "./Pages/property/ListLands";





function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPannal />} />
      <Route path="/" element={<SignIn />} />
      {/* <Route path="/register" element={<SignUp />} /> */}
      <Route path="/home-preview" element={<HouseProperty />} />
      <Route path="/land-preview" element={<LandProperty />} />
      <Route path="/customer-overview" element={<CustomerOverviewTable />} />
      <Route path="/new-customer" element={<AddNewCustomer />} />
      <Route path="/list-homes" element={<ListHomes />} />
      <Route path="/list-lands" element={<ListLands />} />
    </Routes>
  );
}

export default App;

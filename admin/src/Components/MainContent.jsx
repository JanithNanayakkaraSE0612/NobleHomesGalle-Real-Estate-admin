import React from "react";
import Overview from "../Pages/dashboard/Overview";
import HouseProperty from "@/Pages/property/HouseProperty"; // Renamed to follow React naming convention
import CustomerDetailsOverview from "../Pages/Customer/customerOverview";

const MainContent = ({ selectedPage }) => {
  const renderContent = () => {
    switch (selectedPage) {
      case "Overview":
        return <Overview />;
      case "Property":
        return <HouseProperty />; // Updated to use the correct component
      case "Customers":
        return <CustomerDetailsOverview/>;
      case "Agents":
        return <div>Agents Content</div>;
      case "Messages":
        return <div>Messages Content</div>;
      case "Log Out":
        return <div>Logging Out...</div>; 
      default:
        return <div>Main content</div>;
    }
  };

  return <div className="p-5">{renderContent()}</div>;
};

export default MainContent;

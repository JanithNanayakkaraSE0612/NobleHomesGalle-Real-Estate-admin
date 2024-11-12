import React from "react";
import Overview from "../Pages/dashboard/Overview";
import HouseProperty from "@/Pages/property/HouseProperty"; 
import SignIn from "@/Pages/Login/SignIn";
const MainContent = ({ selectedPage }) => {
  const renderContent = () => {
    switch (selectedPage) {
      case "Overview":
        return <Overview />;
      case "Property":
        return <HouseProperty />;
      case "Log Out":
        return <SignIn/>; 
      default:
        return <Overview />;
    }
  };

  return <div className="p-5">{renderContent()}</div>;
};

export default MainContent;


import React from "react";
import Overview from "../Pages/Overview";

const MainContent = ({ selectedPage }) => {
  const renderContent = () => {
    switch (selectedPage) {
      case "Overview":
        return <Overview />;
      case "Property":
        return <div>Property Content</div>;
      case "Customers":
        return <div>Customers Content</div>;
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

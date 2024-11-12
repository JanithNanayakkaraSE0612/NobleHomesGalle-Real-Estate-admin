import React, { useEffect, useState } from "react";
import { FaChartLine, FaBuilding, FaUsers, FaEnvelope } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import axios from "axios";

const Overview = () => {

  const [totalPropertiesCount, setTotalPropertiesCount] = useState(0);
  const [totalHousesCount, setTotalHousesCount] = useState(0);
  const [totalLandsCount, setTotalLandsCount] = useState(0);

  //get all house properties
  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/property/");
      const allProperties = response.data.data;

      const totalPropertiesCount = allProperties.length;
      const totalHousesCount = allProperties.filter(
        (property) => property.type === "house",
      ).length;
      const totalLandsCount = allProperties.filter(
        (property) => property.type === "land",
      ).length;

      setTotalPropertiesCount(totalPropertiesCount);
      setTotalHousesCount(totalHousesCount);
      setTotalLandsCount(totalLandsCount);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };


  // Call fetchProperties initially in useEffect
  useEffect(() => {
    fetchProperties();
  }, []);

  const overviewData = [
    {
      total: totalPropertiesCount,
      color: "#FCDCDC",
      icon: <FaChartLine className="w-8 h-8 text-red-500" />,
      title: "Total Properties",
      description: "+8% from yesterday",
    },
    {
      total: totalLandsCount,
      color: "#FFF4DE",
      icon: <FaBuilding className="w-8 h-8 text-yellow-500" />,
      title: "Total Lands",
      description: "+5% from yesterday",
    },
    {
      total: totalHousesCount,
      color: "#DCFCE7",
      icon: <FaHouse className="w-8 h-8 text-green-500" />,
      title: "Total Houses",
      description: "+1.2% from yesterday",
    },
    {
      total: "2,500", 
      color: "#F3E8FF",
      icon: <FaUsers className="w-8 h-8 text-purple-500" />,
      title: "Customers",
      description: "0.5% from yesterday",
    },
  ];


  return (
    <div className="p-5">
      <div className="shadow p-5 text-2xl font-bold rounded-md">
        <h2 className="mb-4">Sales Overview</h2>

        <div className="flex flex-wrap gap-4">
          {overviewData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-4 rounded-md shadow flex-1 min-w-[200px]"
              style={{ backgroundColor: item.color }}
            >
              <div className="flex justify-end">{item.icon}</div>
              <h2 className="text-4xl font-bold text-center mb-3">
                {item.total}
              </h2>
              <div className="mt-2 text-center ">
                <h3 className="mb-2 font-medium">{item.title}</h3>
                <p className="text-sm mb-2 font-medium">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-4 shadow rounded-md bg-white">
        <h2 className="text-xl font-semibold mb-2">Location Overview</h2>

        <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center">
          <span className="text-gray-500">Map will be displayed here</span>
        </div>
      </div>
    </div>
  );
};

export default Overview;

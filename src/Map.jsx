import React, { useState } from "react";
import { SVGMap } from "react-svg-map";
import SriLanka from "@svg-maps/sri-lanka";
import "react-svg-map/lib/index.css";

const Map = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtData, setDistrictData] = useState(null);

  const handleClick = (event) => {
    const districtName = event.target.attributes.name.value;
    setSelectedDistrict(districtName);

    // Fetch data for the selected district from the API endpoint
    fetch(`http://localhost:8010/districts/${districtName}`)
      .then((response) => response.json())
      .then((data) => {
        // Set the district data state
        setDistrictData(data);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };

  const boxStyle = {
    position: "absolute",
    top: 20,
    right: 20,
    maxHeight: "90vh", // Set maximum height to 90% of the viewport height
    overflowY: "auto", // Add scrollbar if content exceeds the maximum height
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    zIndex: 100,
    width: "300px", // Set width to control the box size
  };

  const listItemStyle = {
    marginBottom: "10px",
    padding: "5px",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
  };

  const mapStyle = {
    "& path": {
      fill: "green", // Default fill color
    },
    width: "300px", // Set width to 300 pixels
    height: "300px", // Set height to 300 pixels
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <div style={mapStyle}>
        <SVGMap
          style={{ height: "100%", width: "auto" }} // Adjust height using CSS
          map={SriLanka}
          onLocationClick={handleClick}
        />
      </div>
      <div style={boxStyle}>
        <h2 style={{ marginBottom: "15px" }}>{selectedDistrict}</h2>
        {districtData && (
          <div>
            <p style={{ marginBottom: "10px", fontWeight: "bold" }}>Data:</p>
            {districtData.map((item, index) => (
              <div
                style={{
                  flex: 1,
                  textAlign: "left",
                  gap: "20px",
                  marginBottom: "10px",
                  flexDirection: "column",
                  marginTop: index !== 0 ? "20px" : "0",
                  padding: "10px",
                }}
              >
                <div style={{ gap: "100px" }}>
                  <strong>District :</strong> {item.location} <br />
                  <strong>Condition :</strong> {item.condition} <br />
                  <strong>Temperature :</strong> {item.temperature.toFixed(2)}
                  {" `C"}
                  <br />
                  <strong>Rainfall:</strong> {item.rainfall.toFixed(2)} % <br />
                  <strong>Humidity:</strong> {item.humidity.toFixed(2)} <br />
                  <strong>Reported Time:</strong>{" "}
                  {new Date(item.reported_time).toLocaleString()} <br />
                  <strong>Air Pressure:</strong> {item.air_pressure.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;

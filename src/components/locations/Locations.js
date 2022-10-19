import "./Locations.css";
import { useState, useEffect } from "react";

export const Locations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8088/locations`);
      const data = await response.json();
      setLocations(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="section-header">
        <p className="emoji">📍</p>
        <div className="section-info">
          <h1 className="section-title">COME VISIT US</h1>

          <h6 className="section-caption">
            We currently have five locations around the city... Come and enjoy!
          </h6>
        </div>
        <p className="emoji">📍</p>
      </div>

      <section className="card-list">
        {locations.map((location) => {
          return (
            <section className="card">
              <h4>{location.city}</h4>
              <p>{location.address}</p>
            </section>
          );
        })}
      </section>
    </>
  );
};

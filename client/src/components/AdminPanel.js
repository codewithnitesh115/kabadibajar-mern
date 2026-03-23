import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [pickups, setPickups] = useState([]);

  const fetchPickups = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/pickup");
      setPickups(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPickups();
  }, []);

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Pickup Requests (Admin)</h2>

      {pickups.length === 0 ? (
        <p>No requests yet</p>
      ) : (
	<ul>
	  {pickups.map((p, index) => (	
            <li key={index}>
	      <strong>{p.name}</strong> | {p.phone} | {p.address} | {p.scrapType}
            </li>
	  ))}
        </ul>
      )}
    </div>
  );
}

export default AdminPanel;

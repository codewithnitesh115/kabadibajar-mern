import React from "react";
import axios from "axios";

const PickupList = ({ pickups, setPickups }) => {

  const deletePickup = async (id) => {
    await axios.delete(`http://localhost:5000/api/pickup/${id}`);
		      
// UI update
    setPickups(pickups.filter(p => p._id !== id));
  };
  return (
    <div>
      <h2>Pickup Requests</h2>
      {Array.isArray(pickups) && pickups.map((p) => (
	<div key={p._id} style={{ marginBottom: "10px" }}>
	  {p.name} - {p.phone} - {p.address}

          <button 
	    onClick={() => deletePickup(p._id)} 
	    style={{ marginLeft: "10px", background: "red", color: "white" }}
	  >
	    Delete
	  </button>
	</div>
      ))}
    </div>
  );
};

export default PickupList;

import React, { useState } from "react";
import axios from "axios";

const PickupForm = ({ onAddPickup }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [scrapType, setScrapType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Submit ho raha hai");

    try {
      const res = await axios.post("http://localhost:5000/api/pickup", {
	name,
	phone,
	address,
	scrapType,
      });

      console.log("Response:", res.data);

      // Parent ko data bhejna (important)
      if (onAddPickup) {
	onAddPickup(res.data);
      }
      // reset form
      setName("");
      setPhone("");
      setAddress("");
      setScrapType("");
	  
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Schedule Pickup</h2>

      <input
        type="text"
	placeholder="Name"
	value={name}
	onChange={(e) => setName(e.target.value)}
      />

      <input
	type="text"
	placeholder="Phone"
	value={phone}
	onChange={(e) => setPhone(e.target.value)}
      />

      <input
	type="text"
	placeholder="Address"
	value={address}
	onChange={(e) => setAddress(e.target.value)}
      />

      <input
	type="text"
	placeholder="Scrap Type"
	value={scrapType}
	onChange={(e) => setScrapType(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default PickupForm;

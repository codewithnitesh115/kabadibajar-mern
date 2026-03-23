import React, { useState, useEffect } from "react";
import "./App.css";
import PickupForm from "./components/PickupForm";
import PickupList from "./components/PickupList";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

function App() {
  const [items, setItems] = useState([]);
  const [pickups, setPickups] = useState([]);

  // Fetch items
  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then(res => res.json())
      .then(data => {
        console.log("Items API:", data);

	if (Array.isArray(data)) {
          setItems(data);
        } else {
	  setItems([]);
	}
      })
      .catch(err => console.error(err));
  }, []);
  // Fetch pickups
  useEffect(() => {
    fetch("http://localhost:5000/api/pickup")
      .then(res => res.json())
      .then(data => setPickups(data))
      .catch(err => console.error(err));
  }, []);
  const handleAddItem = (item) => {
    setItems([...items, item]); 
  }
  const handleAddPickup = (pickup) => {
    // ❌ agar backend sirf message bhej raha hai to ignore karo
    if (pickup && pickup._id) {
      setPickups((prev) => [...prev, pickup]);
    } else {
      console.log("Invalid pickup response:", pickup);
    }
  };
                                                         
  return (
    <div style={{ padding: "20px" }}>
      <h1>KabadiBazaar</h1>
    <div className="card">
      <PickupForm onAddPickup={handleAddPickup} />
    </div>

    <div className="card">
      <PickupList pickups={pickups} setPickups={setPickups} />
    </div>

    <hr />

    <div className="card">
      <ItemForm onAdd={handleAddItem} />
    </div>

    <div className="card">
      <ItemList items={items} />
    </div>
  </div>
 );
}

export default App;

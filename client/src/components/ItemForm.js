import React, { useState } from "react";

const ItemForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) return;

    const newItem = { name, price };
    try {
      const res = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
	body: JSON.stringify(newItem),
      });
      const data = await res.json();
      onAdd(data); // Pass new item back to App.js
      setName("");
      setPrice("");
    } catch (err) {
      console.error(err);
    }
  };

 return (
   <form onSubmit={handleSubmit}>
     <input
       type="text"
       placeholder="Item Name"
       value={name}
       onChange={(e) => setName(e.target.value)}
       required
     />
     <input
       type="number"
       placeholder="Price"
       value={price}
       onChange={(e) => setPrice(e.target.value)}
       required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;

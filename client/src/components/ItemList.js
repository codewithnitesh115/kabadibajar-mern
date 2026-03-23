import React from "react";

const ItemList = ({ items }) => {
  return (
    <div>
      <h2>Items List</h2>
      <ul>
	{Array.isArray(items) && items.map((item) => (
	  <li key={item._id}>
	    {item.name} - ₹{item.price}
	  </li>
	))}
      </ul>
    </div>
  );
};

export default ItemList;

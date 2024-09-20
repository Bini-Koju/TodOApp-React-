// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   addItem,
//   removeItem,
//   increaseQuantity,
//   decreaseQuantity,
// } from "./CartActions";
// import { Table } from "reactstrap";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.items);

//   // States to track input fields
//   const [id, setId] = useState("");
//   const [itemName, setItemName] = useState("");
//   const [itemPrice, setItemPrice] = useState("");

//   const [sortOrder, setSortOrder] = useState("asc");

//   // Handle sorting by name
//   const handleSortByName = () => {
//     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//   };

//   // Sort the cartItems based on the current sortOrder
//   const sortedCartItems = [...cartItems].sort((a, b) => {
//     if (sortOrder === "asc") {
//       return a.name.localeCompare(b.name);
//     } else {
//       return b.name.localeCompare(a.name);
//     }
//   });

//   // Handling Add Item with input values
//   const handleAddItem = () => {
//     if (itemName && itemPrice) {
//       const newItem = {
//         id: id, // Generating a new id based on cart length
//         name: itemName,
//         price: parseFloat(itemPrice),
//       };
//       dispatch(addItem(newItem));

//       // Clear input fields after adding the item
//       setItemName("");
//       setItemPrice("");
//     }
//   };

//   const handleRemoveItem = (itemId) => {
//     dispatch(removeItem(itemId));
//   };

//   const handleIncreaseQuantity = (itemId) => {
//     dispatch(increaseQuantity(itemId));
//   };

//   const handleDecreaseQuantity = (itemId) => {
//     dispatch(decreaseQuantity(itemId));
//   };

//   // Total amount calculation
//   const totalAmount = cartItems.reduce(
//     (total, item) => total + item.quantity * item.price,
//     0
//   );

//   return (
//     <div>
//       <h2>Shopping Cart</h2>

//       {/* Input fields to add new item */}
//       <div className="d-flex justify-content-between mb-3">
//         <input
//           type="number"
//           placeholder="Item Id"
//           value={id}
//           onChange={(e) => setId(e.target.value)}
//         />
//         <input
//           type="select"
//           placeholder="Item Name"
//           value={itemName}
//           onChange={(e) => setItemName(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Item Price"
//           value={itemPrice}
//           onChange={(e) => setItemPrice(e.target.value)}
//         />
//         <button onClick={handleAddItem}>Add Item</button>
//       </div>

//       <ul>

//       {cartItems.length > 0 && (
//         <div className="table-responsive">
//           <Table className="align-middle table-nowrap mb-0">
//             <thead>
//               <tr>
//                 <th scope="col">ID</th>
//                 <th scope="col">Item Name</th>
//                 <th scope="col">Price</th>
//                 <th scope="col">Quantity</th>
//                 <th scope="col">Subtotal</th>
//                 <th scope="col">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sortedCartItems.map((item) => (
//                 <tr key={item.id}>
//                   <th scope="row">{item.id}</th>
//                   <td>{item.name}</td>
//                   <td>${item.price}</td>
//                   <td>{item.quantity}</td>
//                   <td>${item.quantity * item.price}</td>
//                   <td>
//                     <button onClick={() => handleIncreaseQuantity(item.id)}>
//                       +
//                     </button>
//                     <button onClick={() => handleDecreaseQuantity(item.id)}>
//                       -
//                     </button>
//                     <button onClick={() => handleRemoveItem(item.id)}>
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       )}
//       </ul>

//       {/* Total Amount */}
//       <h2>Total Amount: ${totalAmount}</h2>
//     </div>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "./CartActions";
import { Table } from "reactstrap";
import axios from "axios";
import UseFormInput from "./UseFormInput";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.items);
  const nameInput = UseFormInput("");
  const idInput = UseFormInput("");
  const priceInput = UseFormInput("");

  const [id, setId] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [items, setItems] = useState([]); // Store fetched items
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://api.dibyasweets.com.np/api/items"
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items", error);
      }
    };

    fetchItems();
  }, []);

  // Handle sorting by name
  const handleSortByName = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Sort the cartItems based on the current sortOrder
  const sortedCartItems = [...cartItems].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  // Handling Add Item with input values
  const handleAddItem = () => {
    if (true || (itemName && itemPrice)) {
      const newItem = {
        id: idInput.value,
        name: nameInput.value,
        price: priceInput.value,
      };
      dispatch(addItem(newItem));

      // Clear input fields after adding the item
      setId("");
      setItemName("");
      setItemPrice("");
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  // Total amount calculation
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  // Handle item selection to automatically update ID and price
  const handleItemSelect = (selectedItemName) => {
    const selectedItem = items.find((item) => item.name === selectedItemName);
    if (selectedItem) {
      setItemName(selectedItem.name);
      setId(selectedItem.id);
      setItemPrice(selectedItem.price);
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>

      {/* Input fields to add new item */}
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          {...idInput}
          placeholder="Item Id"
          // value={id}
          // readOnly // Make this field read-only since it's set automatically
        />

        <input
          type="text"
          {...nameInput}
          placeholder="Item Id"
          // value={id}
          // readOnly // Make this field read-only since it's set automatically
        />

        {/* <select
          value={itemName}
          // onChange={(e) => handleItemSelect(e.target.value)}
          {...nameInput}
        >
          <option value="">Select Item</option>
          {items.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select> */}

        <input
          type="number"
          placeholder="Item Price"
          // value={itemPrice}
          {...priceInput}
          // readOnly // Make this field read-only since it's set automatically
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      {/* Render table only if there are items in the cart */}
      {cartItems.length > 0 && (
        <div className="table-responsive">
          <Table className="align-middle table-nowrap mb-0">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Item Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Subtotal</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCartItems.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.quantity * item.price}</td>
                  <td>
                    <button onClick={() => handleIncreaseQuantity(item.id)}>
                      +
                    </button>
                    <button onClick={() => handleDecreaseQuantity(item.id)}>
                      -
                    </button>
                    <button onClick={() => handleRemoveItem(item.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Total Amount */}
      <h2>Total Amount: ${totalAmount}</h2>
    </div>
  );
};

export default Cart;

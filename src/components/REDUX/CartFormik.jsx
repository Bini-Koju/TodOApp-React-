import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "./CartActions";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  Input,
  Row,
  Table,
} from "reactstrap";
import axios from "axios";
import UseFormInput from "./UseFormInput";
import { useFormik } from "formik";

const CartFormik = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.items);

  const [items, setItems] = useState();
  const [filteredItems, setFilteredItems] = useState();
  const [keyword, setKeyword] = useState("");

  const validationSchema = Yup.object({
    id: Yup.string().required("Required field"),
    name: Yup.string().required("Required field"),
    price: Yup.string().required("Required field"),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      price: 0,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      //console.log(values);
      const newItem = {
        id: values.id,
        name: values.name,
        price: values.price,
      };
      //dispatch(addItem(newItem));

      resetForm();
      return false;
    },
  });

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

  useEffect(() => {
    console.log("items..", items, keyword);
    if (!items) {
      return;
    }
    if (keyword == "") {
      console.log("ssss");
      setFilteredItems(items);
    } else {
      console.log("yyy");

      const filteredItems = items.filter(
        (item) => item.name.indexOf(keyword) >= 0
      );
      setFilteredItems(filteredItems);
    }
  }, [items, keyword]);

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

  useEffect(() => {
    if (!items) {
      return;
    }
    //console.log(formik.values);
    const selectedItemName = formik.values.id * 1;
    //console.log(items);
    const selectedItem = items.find((item) => item.id == selectedItemName);
    //console.log(selectedItem);
    if (selectedItem) {
      //Formik.setFieldValue("id", selectedItem.id);
      formik.setFieldValue("name", selectedItem.name);
      formik.setFieldValue("price", selectedItem.price);
    }
  }, [formik.values.id, formik.setFieldValue]);

  const AddToCart = (item) => {
    const newItem = {
      id: item.id,
      name: item.name,
      price: item.price,
    };
    dispatch(addItem(newItem));
  };

  const filterItems = (key) => {
    console.log(key);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <Row>
        <Col md={8}>
          <Row>
            <Input
              type="text"
              onChange={(e) => setKeyword(e.target.value)}
            ></Input>
          </Row>
          <Row>
            {filteredItems &&
              filteredItems.map((item) => (
                <Col sm={3} key={item.id}>
                  <Card>
                    <CardHeader>
                      <img src="{item.pic}"></img>
                    </CardHeader>
                    <CardBody>{item.name}</CardBody>
                    <CardFooter>
                      <Button onClick={() => AddToCart(item)}>
                        Add To Cart
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              ))}
          </Row>
        </Col>
        <Col md={4}>
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
        </Col>
      </Row>
      {/* Input fields to add new item */}

      <Form onSubmit={formik.handleSubmit}>
        <div className="d-flex justify-content-between mb-3">
          <input
            type="text"
            placeholder="Item Id"
            id="name"
            name="name"
            //value={formik.values.name}
            //onChange={formik.handleChange}
            {...formik.getFieldProps("name")}
            readOnly // Make this field read-only since it's set automatically
          />

          <select
            name="id"
            //value={formik.values.id}
            //onChange={(e) => handleItemSelect(e.target.value)}
            {...formik.getFieldProps("id")}
          >
            <option value="">Select Item</option>
            {items &&
              items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>

          <input
            type="number"
            placeholder="Item Price"
            {...formik.getFieldProps("price")}
            // value={formik.values.price}
            // onChange={formik.handleChange}
            name="price"
            // readOnly // Make this field read-only since it's set automatically
          />
          <button type="submit">Add Item</button>
        </div>
      </Form>
      {/* Render table only if there are items in the cart */}
    </div>
  );
};

export default CartFormik;

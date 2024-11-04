import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";

function Products({ dataF, setDataF, viewer, setViewer, cart, setCart }) {
  const [catalog, setCatalog] = useState([]);

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const someResponse = await fetch("./products.json");
      const data = await someResponse.json();
      // update State Variable
      setCatalog(data);
      console.log(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const total = () => {
      let totalAmount = 0;
      for (let i = 0; i < cart.length; i++) {
        totalAmount += parseFloat(cart[i].price);
      }
      setCartTotal(totalAmount.toFixed(2));
      console.log(totalAmount);
    };
    total();
  }, [cart]);

  const listItems = catalog.map((el) => (
    <div>
      <div className='row border-top border-bottom' key={el.id}>
        <div className='row main align-items-center'>
          <div className='col-2'>
            <img className='img-fluid' src={el.image} alt={el.title} />
          </div>
          <div className='col'>
            <div className='row text-muted'>{el.title}</div>
            <div className='row'>{el.flavor}</div>
            <div className='col'>
              <button onClick={() => removeFromCart(el)}> - </button>
              <button onClick={() => addToCart(el)}> + </button>
            </div>
            <div className='col'>
              ${el.price}{" "}
              <span className='close'>
                ×{cart.filter((item) => item.id === el.id).length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  function summarizeItems(items) {
    // Create a summary object to store each unique item and count
    const summary = {};

    items.forEach((item) => {
      // Check if the item ID already exists in the summary
      if (summary[item.id]) {
        // If it exists, increase the count
        summary[item.id].count += 1;
      } else {
        // If it doesn't exist, add it to the summary with initial count 1
        summary[item.id] = {
          id: item.id,
          title: item.title,
          image: item.image,
          count: 1,
        };
      }
    });

    // Convert the summary object to an array for easy access to each summarized item
    return Object.values(summary);
  }

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  // removing, including fixing removing only one item from cart
  const removeFromCart = (el) => {
    let itemFound = false;
    const updatedCart = cart.filter((cartItem) => {
      if (cartItem.id === el.id && !itemFound) {
        itemFound = true;
        return false;
      }
      return true;
    });
    if (itemFound) {
      setCart(updatedCart);
    }
  };

  const cartItems = cart.map((el, index) => (
    <div key={index}>
      <img className='img-fluid' src={el.image} width={150} />
      {el.title}${el.price}
    </div>
  ));

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }

  function viewCheckout() {
    console.log(cart);
    setCart(cart);

    if (!cart || cart.length === 0) {
      alert("Your cart is empty. Please add items to proceed.");
      return;
    }

    console.log(summarizeItems(cart));
    setViewer(1);
  }
  return (
    <div className='container-fluid' style={{ margin: "20px" }}>
      STORE SE/ComS3190
      <div className='d-flex'>
        <div className='card'>
          <div className='row'>
            {/* HERE, IT IS THE SHOPPING CART */}
            <div className='col-md-8 cart'>
              <div className='title'>
                <div className='row'>
                  <div className='col'>
                    <h4>
                      <b>Shopping Cart</b>
                    </h4>
                  </div>
                  <div className='col align-self-center text-right text-muted'>
                    <h4>
                      <b>Products selected {cart.length}</b>
                    </h4>
                  </div>
                  <div className='col align-self-center text-right text-muted'>
                    <h4>
                      <b>Order total: ${cartTotal}</b>
                    </h4>
                  </div>
                </div>
              </div>
              <div>{listItems}</div>
            </div>
          </div>
        </div>
        {/* Right-aligned div */}
        <div
          className='bg-light p-3 position-sticky'
          style={{ width: "200px", marginLeft: "auto" }}
        >
          <button
            type='submit'
            className='btn btn-primary'
            onClick={viewCheckout}
          >
            Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;

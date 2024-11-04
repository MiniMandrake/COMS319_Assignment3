import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";

function Products({ dataF, setDataF, viewer, setViewer }) {
  const [catalog, setCatalog] = useState([]);
  const [cart, setCart] = useState([]);
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
    <div class='row border-top border-bottom' key={el.id}>
      <div class='row main align-items-center'>
        <div class='col-2'>
          <img class='img-fluid' src={el.image} />
        </div>
        <div class='col'>
          <div class='row text-muted'>{el.title}</div>
          <div class='row'>{el.flavor}</div>
        </div>
        <div class='col'>
          <button
            type='button'
            variant='light'
            onClick={() => removeFromCart(el)}
          >
            {" "}
            -{" "}
          </button>{" "}
          <button type='button' variant='light' onClick={() => addToCart(el)}>
            {" "}
            +{" "}
          </button>
        </div>
        <div class='col'>
          ${el.price} <span class='close'>&#10005;</span>
          {howManyofThis(el.id)}
        </div>
      </div>
    </div>
  ));

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
      <img class='img-fluid' src={el.image} width={150} />
      {el.title}${el.price}
    </div>
  ));

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }

  function viewCheckout() {
    setDataF(data);
    setViewer(1);
  }

  return (
    <div className='container'>
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
                      <b>3190 Shopping Cart</b>
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
          className='bg-light p-3'
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

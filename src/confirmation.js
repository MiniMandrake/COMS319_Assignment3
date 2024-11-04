import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";

function Confirmation({ dataF, setDataF, viewer, setViewer, cart, setCart }) {
  // remove all data from submission
  // send user back to payment page after submission
  const updateHooks = () => {
    setDataF({});
    setViewer(0);
  };

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
          price: item.price,
          count: 1,
        };
      }
    });

    // Convert the summary object to an array for easy access to each summarized item
    return Object.values(summary);
  }

  function SummaryDisplay({ items }) {
    const [summarizedItems, setSummarizedItems] = useState([]);

    useEffect(() => {
      // Summarize the items when component mounts or items change
      setSummarizedItems(summarizeItems(items));
    }, [items]);

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
          gap: "1rem",
        }}
      >
        {summarizedItems.map((item) => (
          <div key={item.id} className='card mb-3' style={{ width: "18rem" }}>
            <img src={item.image} className='card-img-top' alt={item.title} />
            <div className='card-body'>
              <h5 className='card-title'>{item.title}</h5>

              <p className='card-text'>Quantity: {item.count}</p>
              <p className='card-text'>Price: {item.price}$</p>
              <p className='card-text'>
                {item.price}$ x {item.count} ={" "}
                {(item.price * item.count).toFixed(2)}$
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='container mt-5'>
      <h1>Summary of Payment Information</h1>
      <h3>{dataF.fullName}</h3>
      <h3>{dataF.email}</h3>
      <h3>{dataF.creditCard}</h3>
      <h3>{dataF.address}</h3>
      <h3>
        {dataF.city}, {dataF.state}, {dataF.zip}
      </h3>
      <SummaryDisplay items={cart} />
      <button className='btn btn-secondary' onClick={updateHooks}>
        Submit
      </button>
    </div>
  );
}

export default Confirmation;

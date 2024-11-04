import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

function Checkout({ dataF, setDataF, viewer, setViewer, cart, setCart }) {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // log all data
    console.log("fullname: " + data.fullName); // log only fullname
    // update hooks
    setDataF(data);
    setViewer(2);
  };

  return (
    <div className='container mt-5'>
      <SummaryDisplay items={cart} />
      <div className='form-group'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("fullName", { required: true })}
            placeholder='Full Name'
            className='form-control'
          />
          {errors.fullName && (
            <p className='text-danger'>Full Name is required.</p>
          )}

          <input
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            placeholder='Email'
            className='form-control'
          />
          {errors.email && <p className='text-danger'>Email is required.</p>}

          <input
            {...register("creditCard", { required: true })}
            placeholder='Credit Card'
            className='form-control'
          />
          {errors.creditCard && (
            <p className='text-danger'>Credit Card is required.</p>
          )}

          <input
            {...register("address", { required: true })}
            placeholder='Address'
            className='form-control'
          />
          {errors.address && (
            <p className='text-danger'>Address is required.</p>
          )}

          <input
            {...register("address2")}
            placeholder='Address 2'
            className='form-control'
          />

          <input
            {...register("city", { required: true })}
            placeholder='City'
            className='form-control'
          />
          {errors.city && <p className='text-danger'>City is required.</p>}

          <input
            {...register("state", { required: true })}
            placeholder='State'
            className='form-control'
          />
          {errors.state && <p className='text-danger'>State is required.</p>}

          <input
            {...register("zip", { required: true })}
            placeholder='Zip'
            className='form-control'
          />
          {errors.zip && <p className='text-danger'>Zip is required.</p>}

          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;

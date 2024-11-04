import "bootstrap/dist/css/bootstrap.css";

function Confirmation({ dataF, setDataF, viewer, setViewer, cart, setCart }) {
  // remove all data from submission
  // send user back to payment page after submission
  const updateHooks = () => {
    setDataF({});
    setViewer(0);
  };

  return (
    <div class='container mt-5'>
      <h1>Summary of Payment Information</h1>
      <h3>{dataF.fullName}</h3>
      <h3>{dataF.email}</h3>
      <h3>{dataF.creditCard}</h3>
      <h3>{dataF.address}</h3>
      <h3>
        {dataF.city}, {dataF.state}, {dataF.zip}
      </h3>
      <button className='btn btn-secondary' onClick={updateHooks}>
        Submit
      </button>
    </div>
  );
}

export default Confirmation;

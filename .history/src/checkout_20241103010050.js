import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";

function Checkout({ dataF, setDataF, viewer, setViewer }) {
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
    setViewer(1);
  };

  return (
    <div className='form-group'>
      <form onSubmit={handleSubmit(onSubmit)} className='container mt-5'>
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
        {errors.address && <p className='text-danger'>Address is required.</p>}

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
  );
}

export default Checkout;

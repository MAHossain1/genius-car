import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const Checkout = () => {
  const { _id, title, price } = useLoaderData();
  const { user } = useContext(AuthContext);

  const handlePlaceOrder = event => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || "unregistered";
    const phone = form.phone.value;
    const message = form.message.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customerName: name,
      email,
      phone,
      message,
    };
    // if (phone.length > 5) {
    //   toast.error("Please enter your real phone number");
    // } else {
    // }

    // service: _id,
    // serviceName: title,
    // price,
    // customer: name,
    // email,
    // phone,
    // message

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then(res => res.json())
      .then(data => {
        toast.success("Your Order is successfully placed");
        form.reset();
        console.log(data);
      })
      .catch(e => console.error(e));
  };

  return (
    <div className="m-20">
      <form onSubmit={handlePlaceOrder}>
        <h2 className="text-4xl text-center my-4">
          You are Going to Order: {title}
        </h2>
        <h3 className="text-3xl text-center text-error mb-4">
          Price: ${price}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="input input-bordered input-info w-full"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="input input-bordered input-info w-full"
          />
          <input
            type="text"
            name="phone"
            placeholder="Your Phone"
            className="input input-bordered input-info w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered input-info w-full"
            defaultValue={user?.email}
            required
            readOnly
          />
        </div>
        <textarea
          name="message"
          placeholder="Your message"
          className="my-4 textarea input-bordered input-info textarea-lg w-full"
        ></textarea>
        <input
          className="btn btn-outline btn-md btn-info"
          type="submit"
          value="Place Your Order"
        />
      </form>
    </div>
  );
};

export default Checkout;

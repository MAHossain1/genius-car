import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const { img, price, title } = service;
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure className="px-6 pt-6">
        <img src={img} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p
          className="text-orange-600 text-2xl font-sem
        "
        >
          Price: ${price}
        </p>
        <div className="card-actions justify-end">
          <Link to={`/checkout/${service._id}`}>
            <button className="btn btn-error btn-outline">Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

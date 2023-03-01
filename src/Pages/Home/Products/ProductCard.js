import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { img, name, price } = product;
  return (
    <Link href="/">
      <div className="cursor-pointer card card-compact h-full w-96 bg-base-100 shadow-xl">
        <figure className="px-6 pt-6">
          <img src={img} alt="Shoes" className="rounded-xl bg-slate-100" />
        </figure>
        <div className="flex justify-center pt-4 text-orange-600">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
          <p
            className="text-orange-600 text-2xl font-sem
        "
          >
            Price: ${price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

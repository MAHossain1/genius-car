import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("products.json")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className=" my-20">
      <div className="text-center">
        <p className="text-2xl font-bold text-orange-600">Popular Products</p>
        <h2 className="text-5xl font-semibold">Browse Our Products</h2>
        <p className="my-4">
          the majority have suffered alteration in some form, <br /> by injected
          humour, or randomised words which don't look even slightly believable.
        </p>
      </div>
      <div className="mb-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
      </div>
      <div className="text-center mt-12">
        <button className="btn mx-auto btn-outline btn-error">
          More Services
        </button>
      </div>
    </div>
  );
};

export default Products;

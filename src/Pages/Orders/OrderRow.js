import React, { useEffect, useState } from "react";

const OrderRow = ({ order, handleDelete, handleStatusUpdate }) => {
  const {
    service,
    serviceName,
    customerName,
    price,
    email,
    phone,
    message,
    _id,
    status,
  } = order;
  const [orderService, setOrderService] = useState({});

  useEffect(() => {
    fetch(`https://genius-car-server-three-cyan.vercel.app/services/${service}`)
      .then(res => res.json())
      .then(data => setOrderService(data));
  }, [service]);

  return (
    <tr>
      <th>
        <label>
          <button onClick={() => handleDelete(_id)} className="btn btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="rounded w-24 h-24">
              {orderService?.img && (
                <img
                  src={orderService.img}
                  alt="Avatar Tailwind CSS Component"
                />
              )}
            </div>
          </div>
          <div>
            <div className="font-bold">{customerName}</div>
            <div className="text-sm">Phone: {phone}</div>
            <div className="text-sm">email: {email}</div>
          </div>
        </div>
      </td>
      <td>
        {serviceName}

        <br />
        <span className="badge badge-ghost badge-sm">id: {service}</span>
      </td>
      <td>${price}</td>
      <td>
        <button
          onClick={() => handleStatusUpdate(_id)}
          className="btn btn-outline btn-error"
        >
          {status ? status : "Pending"}
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;

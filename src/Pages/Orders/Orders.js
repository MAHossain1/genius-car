import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import OrderRow from "./OrderRow";

const Orders = () => {
  const { user, logOut } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(
      `https://genius-car-server-three-cyan.vercel.app/orders?email=${user?.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("geniusToken")}`,
        },
      }
    )
      .then(res => {
        if (res.status === 500 || res.status === 401) {
          logOut();
        }
        return res.json();
      })
      .then(data => {
        // console.log("received", data);
        setOrders(data);
      });
  }, [user?.email, logOut]);

  const handleDelete = id => {
    const proceed = window.confirm("Are you sure,to cancel this order?");
    if (proceed) {
      fetch(`https://genius-car-server-three-cyan.vercel.app/orders/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("geniusToken")}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.deletedCount > 0) {
            toast.error("Your order deleted successfully");
            const remaining = orders.filter(odr => odr._id !== id);
            setOrders(remaining);
          }
        });
    }
  };

  const handleStatusUpdate = id => {
    fetch(`https://genius-car-server-three-cyan.vercel.app/orders/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("geniusToken")}`,
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const remaining = orders.filter(odr => odr._id !== id);
        const approving = orders.find(odr => odr._id === id);
        approving.status = "Approved";

        const newOrders = [approving, ...remaining];
        setOrders(newOrders);
      });
  };

  return (
    <div className="my-10">
      <h2 className="text-5xl my-8">You have {orders.length} Orders</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Service Details</th>
              <th>Price</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <OrderRow
                key={order._id}
                order={order}
                handleDelete={handleDelete}
                handleStatusUpdate={handleStatusUpdate}
              ></OrderRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

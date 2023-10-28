import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import trash from "../thumbnails/trash.svg";

function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className=" text-primary fs-3 mt-5 fw-bold text-center">
          The Cart is Empty!
        </div>
      </div>
    );
  }
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch(
      "https://mern-project-hxtl.onrender.com/api/orderData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      }
    );
    console.log("RESPONSE::::::", response);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, product) => total + product.price, 0);

  return (
    <div>
      <div className="container m-auto table-responsive table-responsive-sm table-responsive-md mt-5">
        <table class="table ">
          <thead className="text fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{product.name}</td>
                  <td>{product.qty}</td>
                  <td>{product.price}</td>
                  <td>
                    <button
                      className="btn p-0"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    >
                      <img src={trash} alt="delete" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2 text-primary">Total price: ${totalPrice}</h1>
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

import React, { useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

import "../index.css";

function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  // let product = props.product;

  const [qty, setQty] = useState(1);

  const handleAddToCart = async () => {
    let item = [];
    for (const product of data) {
      if (product.id === props.product._id) {
        item = product;
        break;
      }
    }
    if (item.length !== 0) {
      await dispatch({
        type: "UPDATE",
        id: props.product._id,
        price: finalPrice,
        qty: qty,
      });
      return;
    } else {
      await dispatch({
        type: "ADD",
        id: props.product._id,
        name: props.product.title,
        price: finalPrice,
        qty: parseInt(qty),
        img: props.product.thumbnail,
      });
      return;
    }

    // await dispatch({
    //   type: "ADD",
    //   id: props.product._id,
    //   name: props.product.title,
    //   price: finalPrice,
    //   qty: parseInt(qty),
    //   img: props.product.thumbnail,
    // });
    // console.log(data);
  };

  let finalPrice = +qty * +props.product.price;

  return (
    <div>
      <div
        className="card mt-5 card_shadow bg-primary p-2 text-dark bg-opacity-25 pb-3"
        style={{
          width: "18rem",
          borderRadius: "20px",
          height: "550px",
          padding: "30px",
        }}
      >
        <img
          src={props.product.thumbnail}
          className="card-img-top"
          alt="..."
          style={{ height: "200px", width: "100%", borderRadius: "20px" }}
        />
        <div className="card-body">
          <p className="card-title title">{props.product.title}</p>
          <p className="card-text description">{props.product.description}</p>
        </div>
        <div className="container w-100">
          <div className="d-inline fs-6 mb-3 qty">Qty</div>
          <select
            className="m-2  h-100 bg-success mb-1"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          {/* <hr /> */}
          <div className="d-inline h-100 fs-5 price"> Price: ${finalPrice}</div>
        </div>
        <button
          className="btn bg-success m-3 justify-center"
          style={{ width: "120px", borderRadius: "10px" }}
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Card;

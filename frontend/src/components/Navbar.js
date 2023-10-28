// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../index.css";
// import Badge from "react-bootstrap/Badge";
// import Modal from "../Modal";
// import Cart from "../screens/Cart";
// import { useCart } from "./ContextReducer";

// function Navbar() {
//   let data = useCart();
//   const [cartView, setCartView] = useState(false);
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/login");
//   };
//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-dark  change_nav_color">
//         <div className="container-fluid">
//           <Link className="navbar-brand fs-1 fst-italic text_color" to="/">
//             ShopEase
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse " id="navbarNav">
//             <ul className="navbar-nav me-auto mb-2 mx-3 fs-5 mt-3">
//               <li className="nav-item">
//                 <Link className="nav-link " aria-current="page" to="/">
//                   <span className="text_color ">Home</span>
//                 </Link>
//               </li>
//               {localStorage.getItem("authToken") ? (
//                 <li>
//                   <Link className="nav-link" aria-current="page" to="myOrders/">
//                     <span className="text_color ">My Orders</span>
//                   </Link>
//                 </li>
//               ) : (
//                 ""
//               )}
//             </ul>

//             {!localStorage.getItem("authToken") ? (
//               <div className="d-flex">
//                 <Link
//                   className="btn bg-white mx-3"
//                   to="/login"
//                   style={{ borderRadius: "15px" }}
//                 >
//                   <span className="text_color ">Login</span>
//                 </Link>
//                 <Link
//                   className="btn bg-white"
//                   to="/createuser"
//                   style={{ borderRadius: "15px" }}
//                 >
//                   <span className="text_color ">Signup</span>
//                 </Link>
//               </div>
//             ) : (
//               <div className="d-flex">
//                 <div
//                   className="btn bg-white me-3"
//                   onClick={() => setCartView(true)}
//                 >
//                   <span className="text_color ">My Cart</span>
//                   <Badge className="mx-1" pill>
//                     {data.length}
//                   </Badge>
//                 </div>
//                 <div>
//                   {cartView ? (
//                     <Modal onClose={() => setCartView(false)}>
//                       <Cart />
//                     </Modal>
//                   ) : null}
//                 </div>
//                 <div className="btn bg-white me-3">
//                   <span
//                     className="text_color text-danger "
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

function Navbar() {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark change_nav_color">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic text_color" to="/">
            ShopEase
          </Link>
          <button className="navbar-toggler" type="button" onClick={toggleNav}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav me-auto mb-2 mx-3 fs-5 mt-3">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/"
                  onClick={toggleNav}
                >
                  <span className="text-white">Home</span>
                </Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li>
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="myOrders/"
                    onClick={toggleNav}
                  >
                    <span className="text-white">My Orders</span>
                  </Link>
                </li>
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link
                  className="btn bg-white mx-3"
                  to="/login"
                  style={{ borderRadius: "15px" }}
                  onClick={toggleNav}
                >
                  <span className="text_color">Login</span>
                </Link>
                <Link
                  className="btn bg-white"
                  to="/createuser"
                  style={{ borderRadius: "15px" }}
                  onClick={toggleNav}
                >
                  <span className="text_color">Signup</span>
                </Link>
              </div>
            ) : (
              <div className="d-flex">
                <div
                  className="btn bg-white me-3"
                  onClick={() => setCartView(true)}
                  style={{ borderRadius: "15px" }}
                >
                  <span className="text_color">My Cart</span>
                  <Badge className="mx-1" pill>
                    {data.length}
                  </Badge>
                </div>
                <div>
                  {cartView ? (
                    <Modal onClose={() => setCartView(false)}>
                      <Cart />
                    </Modal>
                  ) : null}
                </div>
                <div
                  className="btn bg-white me-3"
                  style={{ borderRadius: "15px" }}
                >
                  <span
                    className="text_color text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

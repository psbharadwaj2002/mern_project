import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import mobileThumbnail from "../thumbnails/mobile.jpg";
import laptopThumbnail from "../thumbnails/laptop.jpg";
import automotiveThumbnail from "../thumbnails/automotive.jpg";
import fragranceThumbnail from "../thumbnails/fragrance.jpg";
import sunglassesThumbnail from "../thumbnails/sunglasses.jpg";
import skincareThumbnail from "../thumbnails/skincare.jpg";
import womens_bagsThumbnail from "../thumbnails/womens_bags.jpg";
import lightingThumbnail from "../thumbnails/lighting.jpg";
import furnitureThumbnail from "../thumbnails/furniture.jpg";
import mobileCarousel from "../thumbnails/mobile.carousel.jpeg";
import shoeCarousel from "../thumbnails/shoe.carousel.jpeg";
import laptopCarousel from "../thumbnails/laptop.carousel.jpeg";
import "../index.css";

function Buttons() {
  const [search, setSearch] = useState(" ");
  const [product, setProduct] = useState([]);
  const [productCategory, setProductCategory] = useState([]);

  const loadData = async () => {
    let response = await fetch(
      "https://mern-project-hxtl.onrender.com/api/productData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await response.json();
    setProduct(response[0]);
    setProductCategory(response[1]);
  };

  useEffect(() => {
    loadData();
  }, [search]);
  return (
    <div>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{
          objectFit: "contain !important",
          // position: "relative",
          paddingBotton: "10px",
        }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div
              className="form-inline justify-content-center from"
              style={{ display: "flex" }}
            >
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ marginRight: "5px" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0 text-white bg-success"
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
          <div className="carousel-item active">
            <img src={laptopCarousel} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={shoeCarousel} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={mobileCarousel} className="d-block w-100" alt="..." />
          </div>
        </div>
        {/* <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button> */}
      </div>

      {/***********************************************************  BUTTONS ********************************************************/}
      <div className="container buttons mt-3">
        <button
          className="button"
          id="button1"
          onClick={() => setSearch("smartphones")}
        >
          <img alt="..." src={mobileThumbnail} />
          Smart Phones
        </button>

        <button
          className="button"
          id="button2"
          onClick={() => setSearch("laptops")}
        >
          <img alt="..." src={laptopThumbnail} />
          Laptops
        </button>

        <button className="button" onClick={() => setSearch("automotive")}>
          <img alt="..." src={automotiveThumbnail} />
          Automotives
        </button>
        <button className="button" onClick={() => setSearch("fragrances")}>
          <img alt="..." src={fragranceThumbnail} />
          Fragrances
        </button>
        <button className="button" onClick={() => setSearch("sunglasses")}>
          <img alt="..." src={sunglassesThumbnail} />
          Sunglasses
        </button>
        <button className="button" onClick={() => setSearch("skincare")}>
          <img alt="..." src={skincareThumbnail} />
          Skincare
        </button>
        <button className="button" onClick={() => setSearch("womens-bags")}>
          <img alt="..." src={womens_bagsThumbnail} />
          Women's Bags
        </button>

        <button className="button" onClick={() => setSearch("lighting")}>
          <img alt="..." src={lightingThumbnail} />
          Lighting
        </button>
        <button className="button" onClick={() => setSearch("furniture")}>
          <img alt="..." src={furnitureThumbnail} />
          Furniture
        </button>
      </div>
      <div>
        {productCategory.length !== 0 && product.length !== 0
          ? // &&
            // productCategory.categoryName === search.categoryName
            productCategory.map((data) => {
              return (
                <div key={data._id}>
                  {/* <div
                    key={data._id}
                    className="fs-3 text-dark mt-3"
                    style={{ textAlign: "center" }}
                  >
                    {data.categoryName[0].toUpperCase() +
                      data.categoryName.slice(1)}
                  </div> */}
                  {/* <hr className="bg-dark" /> */}
                  <div style={{ display: "flex" }} className="card_div">
                    {product.length !== 0 ? (
                      product
                        .filter(
                          (item) =>
                            item.categoryName === data.categoryName &&
                            (item.categoryName
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                              item.title
                                .toLowerCase()
                                .includes(search.toLowerCase()))
                        )
                        .map((filterItem) => {
                          return (
                            <div key={filterItem._id} className="m-3 onhover">
                              <Card product={filterItem} />
                            </div>
                          );
                        })
                    ) : (
                      <div>No Data Found</div>
                    )}
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default Buttons;

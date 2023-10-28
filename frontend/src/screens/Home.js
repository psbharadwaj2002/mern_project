import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Buttons from "../components/Buttons";

function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Buttons />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;

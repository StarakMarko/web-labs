import { useState, useEffect } from "react";
import Header from "./containers/Header/Header.jsx";
import Home from "./layout/Home.jsx";
import CatalogPage from "./layout/CatalogPage.jsx";
import { fetchParks } from "./utils/api.js";
import Footer from "./containers/Footer/Footer.jsx";
import ItemPage from "./layout/ItemPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ParkProvider } from "./containers/context/ParkContext.jsx";
import CartPage from "./layout/CartPage.jsx";
import CheckoutPage from "./layout/CheckoutPage.jsx";
import SuccessMessage from "./containers/SuccessMessage/SuccessMessage.jsx";

function App() {
  const [parks, setParks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchParks()
      .then((data) => setParks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ParkProvider>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home parks={parks} />} />
        <Route
          path="/catalog"
          element={<CatalogPage parks={parks} searchQuery={searchQuery} />}
        />
        <Route path="/item/:id" element={<ItemPage parks={parks} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessMessage />} />
      </Routes>
      <Footer />
    </ParkProvider>
  );
}

export default App;

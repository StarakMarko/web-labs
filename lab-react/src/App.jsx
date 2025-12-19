import { useState, useEffect } from "react";
import Header from "./containers/Header/Header.jsx";
import Home from "./layout/Home.jsx";
import CatalogPage from "./layout/CatalogPage.jsx";
import { fetchParks } from "./utils/api.js";
import Footer from "./containers/Footer/Footer.jsx";
import ItemPage from "./layout/ItemPage.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import { ParkProvider } from "./containers/context/ParkContext.jsx";
import CartPage from "./layout/CartPage.jsx";
import CheckoutPage from "./layout/CheckoutPage.jsx";
import SuccessMessage from "./containers/SuccessMessage/SuccessMessage.jsx";
import LoginPage from "./layout/Auth/LoginPage.jsx";
import SignUpPage from "./layout/Auth/SignUpPage.jsx";
import ProtectedRoute from "./containers/ProtectedRoute/ProtectedRoute.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "./state/actions";


function App() {
  const [parks, setParks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const cartState = useSelector((state) => state);
  const location = useLocation();
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  useEffect(() => {
    fetchParks()
      .then((data) => setParks(data))
      .catch((err) => console.error(err));
  }, []);

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (userEmail) {
      const savedCart = localStorage.getItem(`cart_${userEmail}`);
      if (savedCart) {
        dispatch(setCart(JSON.parse(savedCart)));
      }
      setIsCartLoaded(true);
    } else {
      setIsCartLoaded(false);
    }
  }, [userEmail, dispatch]);

  useEffect(() => {
    if (userEmail && isCartLoaded) {
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cartState));
    }
  }, [cartState, userEmail, isCartLoaded]);

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <ParkProvider>
      {!isAuthPage && (
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}

      <Routes>
        <Route path="/" element={<ProtectedRoute><Home parks={parks} /></ProtectedRoute>} />
        <Route
          path="/catalog"
          element={<ProtectedRoute><CatalogPage parks={parks} searchQuery={searchQuery} /></ProtectedRoute>}
        />
        <Route path="/item/:id" element={<ProtectedRoute><ItemPage parks={parks} /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/success" element={<ProtectedRoute><SuccessMessage /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>

      <Footer />
    </ParkProvider>
  );
}

export default App;
import { useState } from "react";
import Header from './containers/Header/Header.jsx';
import Home from './layout/Home.jsx';
import CatalogPage from './layout/CatalogPage.jsx';
import Footer from './containers/Footer/Footer.jsx';
import ItemPage from './layout/ItemPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ParkProvider } from './containers/context/ParkContext.jsx';

const parks = [
  {
    name: "Ivan Franko Park",
    description: "Ivan Franko Park (Парк імені Івана Франка), formerly known as Kościuszko Park and the Jesuit Gardens, is a park in Lviv, Ukraine. It is the oldest park in the country.",
    address: "Universytetska St, 1",
    length_of_bicycle_path: 10,
    price: 5
  },
  {
    name: "Stryiskyi Park",
    description: "Stryiskyi Park is one of the largest in Europe. Its territory is more than 50 hectares. The impetus for the park was the Regional Exhibition of 1894, which took place on its upper terrace.",
    address: "Parkova St",
    length_of_bicycle_path: 15,
    price: 15
  },
  {
    name: "Culture Park",
    description: "The history of the park began in the middle of the 19th century. The famous Pelchynskyi Pond that was a favourite place for water recreation among the burghers was located in its lower part.",
    address: "4 Bolharska St",
    length_of_bicycle_path: 3,
    price: 2
  },
  {
    name: "Znesinia park",
    description: "The Znesinnya Regional Landscape Park (Ukrainian: Регіональний ландшафтний парк Знесіння) is the largest park in Lviv, Ukraine.",
    address: "Kachaly Street, 5A",
    length_of_bicycle_path: 30,
    price: 3
  }
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ParkProvider>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home parks={parks} />} />
        <Route path="/catalog" element={<CatalogPage parks={parks} searchQuery={searchQuery} />} />
        <Route path="/item" element={<ItemPage parks={parks} />} />
        <Route path="/cart" element={<>CartPage</>} />
      </Routes>
      <Footer />
    </ParkProvider>
  );
}

export default App;

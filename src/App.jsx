import { useContext } from "react";
import { AppContext } from "@context/AppContext";

import { Routes, Route } from "react-router-dom";

// pages
import Home from "@pages/Home";
import Rider from "@pages/Rider";
import Ordini from "@pages/Ordini";
import Ristorante from "@pages/Ristorante";
import Carrello from "@pages/Carrello";
import OrdineCompletato from "@pages/OrdineCompletato";

function App() {
  const { orderNumber } = useContext(AppContext);

  // redirects user to order completed page if an order has been placed
  const pageToShow = orderNumber !== 0 ? <OrdineCompletato /> : <Carrello />;

  return (
    <>
      <Routes>
        <Route path="*" element={<Home />} index />
        <Route path="/work-with-us" element={<Rider />} />
        <Route path="/orders" element={<Ordini />} />
        <Route path="/restaurant/:id" element={<Ristorante />} />
        <Route path="/cart" element={<Carrello />} />
        <Route path="/order/:id" element={pageToShow} />
      </Routes>
    </>
  )
}

export default App;
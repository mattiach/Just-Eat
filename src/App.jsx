import { Routes, Route } from "react-router-dom";

// pages
import Home from "@pages/Home";
import Rider from "@pages/Rider";
import Ordini from "@pages/Ordini";
import Ristorante from "@pages/Ristorante";
import Carrello from "@pages/Carrello";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Home />} index />
        <Route path="/work-with-us" element={<Rider />} />
        <Route path="/orders" element={<Ordini />} />
        <Route path="/restaurant/:id" element={<Ristorante />} />
        <Route path="/carrello" element={<Carrello />} />
      </Routes>
    </>
  )
}

export default App;
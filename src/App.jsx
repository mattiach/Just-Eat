// routing
import { Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Rider from "./pages/Rider";
import Ordini from "./pages/Ordini";

function App() {

  return (
    <>
      <Routes>
        <Route path="*" element={<Home />} index />
        <Route path="/diventa-un-rider" element={<Rider />} />
        <Route path="/ordini" element={<Ordini />} />
        <Route path="/ordini/ristorante" element={<Ordini />} />
      </Routes>
    </>
  )
}

export default App;
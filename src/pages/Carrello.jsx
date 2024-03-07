import { lazy, Suspense } from "react";

// components
import Navbar from "../components/navbar/Navbar";
import Container from "../components/Container";
import Cart from "../components/cart/Cart";
import Footer from "../components/footer/Footer";
const CartUserProfile = lazy(() => import('../components/cart/CartUserProfile'));

const Carrello = () => {
  return (
    <>
      <Navbar />
      <Container className="shadow-2xl rounded-7xl custom-shadow-sm">
        <div className="my-8 rounded-lg shadow-sm bg-gray-50 p-11 sm:my-10 lg:my-15">
          <div className="bg-gray-50">
            <div className="grid h-full gap-4 lg:grid-cols-2 xl:grid-cols-3">
              <Cart />
              <Suspense fallback={null}>
                <CartUserProfile />
              </Suspense>
            </div>
          </div>
        </div >
      </Container >
      <Footer />
    </>
  )
}
export default Carrello
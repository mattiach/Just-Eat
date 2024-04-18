import { lazy, Suspense } from "react";

// components
import Navbar from "@components/navbar/Navbar";
import Container from "@components/Container";
import Cart from "@components/cart/Cart";
import Footer from "@components/footer/Footer";
const CartUserProfile = lazy(() => import('@components/cart/CartUserProfile'));
const ModalPayment = lazy(() => import('@components/modal/ModalPayment'));

const Carrello = () => {
  const modalId = 'modal-payment-credit-card';

  return (
    <>
      <Navbar />
      <Container>
        <div className="grid h-full max-w-xl gap-6 mx-auto bg-gray-100 xs:p-4 sm:p-8 md:max-w-xl lg:max-w-5xl xl:gap-8 lg:grid-cols-2 xl:grid-cols-3 lg:rounded-md xl:max-w-7xl">
          <Cart />
          <Suspense fallback={null}>
            <CartUserProfile modalId={modalId} />
          </Suspense>
        </div>
      </Container >
      <Suspense fallback={null}>
        <ModalPayment modalId={modalId} />
      </Suspense>
      <Footer />
    </>
  )
}
export default Carrello
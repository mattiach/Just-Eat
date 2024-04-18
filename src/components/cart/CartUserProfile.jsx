import { Suspense, useContext } from 'react';
import { AppContext } from '@context/AppContext';
import { Formik, Form, Field } from 'formik';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { removeAllFromCart } from '@redux/slices/cartSlice';

// functions
import useFieldsPopulated from '@hooks/UseFieldPopulated';
import { calculateCartTotal } from '@functions/calculateCartTotal';
import useCheckDeliveryEligibility from '@hooks/useCheckDeliveryEligibility';

// components
import InputForm from '@components/InputForm';
import CartMessage from '@components/cart/CartMessage';
import Button from '@components/button/Button';

const CartUserProfile = ({ modalId }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { userCartInfo, setUserCartInfo } = useContext(AppContext);
  const { creditCardInfo } = useContext(AppContext);
  const areCCFieldsPopulated = useFieldsPopulated(creditCardInfo);
  const isNotDesktopView = useMediaQuery({ query: "(max-width: 992px)" });
  const isEligibleForDelivery = useCheckDeliveryEligibility(cart);
  const navigate = useNavigate();

  const openPaymentModalFunction = () => {
    document.getElementById(modalId).showModal();
  };

  const parsedTotalCart = parseFloat(calculateCartTotal(cart).replace(/[^\d.-]/g, ''));

  const handleSubmit = (values, { setSubmitting }) => {
    setUserCartInfo(values);
    if (areCCFieldsPopulated) {
      console.log(areCCFieldsPopulated);
    }

    if ((cart.length > 0) && isEligibleForDelivery && areCCFieldsPopulated) {
      setTimeout(() => {
        dispatch(removeAllFromCart());
        setSubmitting(false);
        navigate('/home');
      }, 3000);
    }
  };

  return (
    <>
      <div className="p-6 bg-white rounded-md sm:shadow lg:shadow-md xl:col-span-2 fading-in-animation">
        <h2 className="text-2xl">Completa il tuo ordine</h2>
        {
          !isNotDesktopView ?
            <>
              <Suspense fallback={null}>
                <CartMessage
                  message={'Metodo di pagamento aggiunto correttamente'}
                  isVisible={areCCFieldsPopulated}
                />
              </Suspense>
            </> : null
        }
        <Formik
          initialValues={userCartInfo}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, { setSubmitting });
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-5">
              <div>
                <h3 className="mb-5 text-lg">I tuoi dati personali</h3>
                <div className="grid gap-4 gap-x-6 sm:grid-cols-2">
                  <Field type="text" name="nome" placeholder="Il tuo nome" component={InputForm} />
                  <Field type="text" name="cognome" placeholder="Il tuo cognome" component={InputForm} />
                  <Field type="email" name="email" placeholder="La tua email" component={InputForm} />
                  <Field type="text" name="telefono" placeholder="Numero di telefono" component={InputForm} />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="mb-5 text-lg">Indirizzo di spedizione</h3>
                <div className="grid gap-4 gap-x-6 sm:grid-cols-2">
                  <Field type="text" name="indirizzo" placeholder="Indirizzo, via/strada .." component={InputForm} />
                  <Field type="text" name="città" placeholder="Città" component={InputForm} />
                  <Field type="text" name="paese" placeholder="Paese" component={InputForm} />
                  <Field type="text" name="zip" placeholder="Zip Code" component={InputForm} />
                </div>
                <div className='mt-8 lg:mt-10'>
                  <Button
                    type="button"
                    onClick={() => openPaymentModalFunction()}
                    disabled={isSubmitting}
                    className={`w-full py-2.5 text-sm font-semibold text-white rounded-md max-w-52 xl:mt-6  bg-blue-600 hover:bg-blue-700 ${isSubmitting ? "opacity-60" : 'opacity-100'}`}
                  >
                    Metodo di pagamento
                  </Button>
                  {
                    isNotDesktopView ?
                      <>
                        <Suspense fallback={null}>
                          <CartMessage
                            message={'Metodo di pagamento aggiunto correttamente'}
                            isVisible={areCCFieldsPopulated}
                          />
                        </Suspense>
                      </> : null
                  }
                </div>
                {
                  isNotDesktopView ?
                    <>
                      <Suspense fallback={null}>
                        <CartMessage
                          message={'Metodo di pagamento aggiunto correttamente'}
                          isVisible={areCCFieldsPopulated}
                        />
                      </Suspense>
                    </> : null
                }
                <div className='flex justify-center md:justify-end'>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !areCCFieldsPopulated || !isEligibleForDelivery}
                    className={`w-full max-w-72 px-6 py-3 xl:mt-10 text-sm font-semibold text-white rounded-md bg-emerald-600 ${(areCCFieldsPopulated && parsedTotalCart > 0 && isEligibleForDelivery) ? 'opacity-100 hover:bg-emerald-700' : 'opacity-50'}`}
                  >
                    {isSubmitting ? 'Inviando...' : 'Conferma ordine'}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div >
    </>
  );
};

export default CartUserProfile;

import { Suspense, useContext } from 'react';
import { AppContext } from '@context/AppContext';
import { Formik, Form, Field } from 'formik';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

const CartUserProfile = ({ modalId, setisLoading }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
      setisLoading(true);

      setTimeout(() => {
        dispatch(removeAllFromCart());
        setisLoading(false);
        setSubmitting(false);
        navigate('/home');
      }, 3000);
    }
  };

  return (
    <>
      <div className="p-6 bg-white rounded-md shadow lg:shadow-md xl:col-span-2 fading-in-animation">
        <h2 className="text-2xl">{t('components.cartUserProfile.title')}</h2>
        {
          !isNotDesktopView ?
            <>
              <Suspense fallback={null}>
                <CartMessage
                  message={t('components.cartMessage.message')}
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
                <h3 className="mb-5 text-lg">{t('components.cartUserProfile.yourInfo')}</h3>
                <div className="grid gap-4 gap-x-5 sm:grid-cols-2">
                  <Field
                    type="text"
                    name="nome"
                    placeholder={t('components.cartUserProfile.yourName')}
                    component={InputForm}
                  />
                  <Field
                    type="text"
                    name="cognome"
                    placeholder={t('components.cartUserProfile.yourLastName')}
                    component={InputForm}
                  />
                  <Field
                    type="email"
                    name="email"
                    placeholder={"Email"}
                    component={InputForm}
                  />
                  <Field
                    type="text"
                    name="telefono"
                    placeholder={t('components.cartUserProfile.yourPhoneNumber')}
                    component={InputForm}
                  />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="mb-5 text-lg"> {t('common.deliveryAddress')}</h3>
                <div className="grid gap-4 gap-x-5 sm:grid-cols-2">
                  <Field
                    type="text"
                    name="indirizzo"
                    placeholder={t('common.deliveryAddress')}
                    component={InputForm}
                  />
                  <Field
                    type="text"
                    name="città"
                    placeholder={t('common.city')}
                    component={InputForm}
                  />
                  <Field
                    type="text"
                    name="paese"
                    placeholder={t('common.country')}
                    component={InputForm}
                  />
                  <Field
                    type="text"
                    name="zip"
                    placeholder="Zip Code"
                    component={InputForm}
                  />
                </div>
                <div className='mt-8'>
                  <Button
                    type="button"
                    onClick={() => openPaymentModalFunction()}
                    disabled={isSubmitting}
                    className={`w-full py-2 text-sm font-semibold text-white rounded-md xl:max-w-52 bg-blue-600 hover:bg-blue-700 ${isSubmitting ? "opacity-60" : 'opacity-100'}`}
                  >
                    {t('common.paymentMethod')}
                  </Button>
                </div>
                {
                  isNotDesktopView ?
                    <>
                      <Suspense fallback={null}>
                        <CartMessage
                          message={t('components.cartMessage.message')}
                          isVisible={areCCFieldsPopulated}
                        />
                      </Suspense>
                    </> : null
                }
                <div className='flex justify-center md:justify-end'>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !areCCFieldsPopulated || !isEligibleForDelivery}
                    className={`w-full xl:max-w-60 px-6 py-2 mt-3 text-sm font-semibold text-white rounded-md bg-emerald-600 ${(areCCFieldsPopulated && parsedTotalCart > 0 && isEligibleForDelivery) ? 'opacity-100 hover:bg-emerald-700' : 'opacity-60'}`}
                  >
                    {isSubmitting ? (t('common.sending') + '...') : t('common.confirmOrder')}
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

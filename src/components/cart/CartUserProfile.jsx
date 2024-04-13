import { Suspense, useContext } from 'react';
import { AppContext } from '@context/AppContext';
import { Formik, Form, Field } from 'formik';
import useFieldsPopulated from '@hooks//UseFieldPopulated';
import { useMediaQuery } from 'react-responsive';

// icons
import { FaCheck } from "react-icons/fa6";
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';

// components
import InputForm from '@components/InputForm';

const CartUserProfile = ({ openPaymentModalFunction }) => {
  const { userCartInfo, setUserCartInfo } = useContext(AppContext);
  const { creditCardInfo } = useContext(AppContext);
  const areCCFieldsPopulated = useFieldsPopulated(creditCardInfo);
  const isNotDesktopView = useMediaQuery({ query: "(max-width: 992px)" });

  const handleSubmit = (values, { setSubmitting }) => {
    setUserCartInfo(values);
    if (areCCFieldsPopulated) {
      setTimeout(() => {
        setSubmitting(false);
      }, 3000);
    }
  };

  return (
    <>
      <div className="sticky top-0 p-8 rounded-md xl:col-span-2 h-max fading-in-animation">
        <h2 className="text-2xl">Completa il tuo ordine</h2>
        {
          !isNotDesktopView ?
            <>
              <Suspense fallback={null}>
                <p className={`${areCCFieldsPopulated ? "visible fade-in" : "invisible"} text-emerald-600 text-md my-2 flex gap-1`}>
                  Metodo di pagamento aggiunto correttamente <FaCheck className='relative top-1' />
                </p>
              </Suspense>
            </> : null
        }
        <Formik
          initialValues={userCartInfo}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-5 md:mt-10">
              <div>
                <h3 className="mb-5 text-lg">I tuoi dati personali</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex">
                    <Field type="text" name="nome" placeholder="Il tuo nome" component={InputForm} />
                    <FaUserAlt className="relative right-6 top-5" />
                  </div>
                  <div className="flex">
                    <Field type="text" name="cognome" placeholder="Il tuo cognome" component={InputForm} />
                    <FaUserAlt className="relative right-6 top-5" />
                  </div>
                  <div className="flex">
                    <Field type="email" name="email" placeholder="La tua email" component={InputForm} />
                    <MdEmail className="relative right-6 top-5" />
                  </div>
                  <div className="flex">
                    <Field type="text" name="telefono" placeholder="Numero di telefono" component={InputForm} />
                    <BsFillTelephoneFill className="relative right-6 top-5" />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="mb-5 text-lg">Indirizzo di spedizione</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex max-w-[424px]">
                    <Field type="text" name="indirizzo" placeholder="Indirizzo, via/strada .." component={InputForm} />
                  </div>
                  <div className="flex max-w-[424px]">
                    <Field type="text" name="città" placeholder="Città" component={InputForm} />
                  </div>
                  <div className="flex max-w-[424px]">
                    <Field type="text" name="paese" placeholder="Paese" component={InputForm} />
                  </div>
                  <div className="flex max-w-[424px]">
                    <Field type="text" name="zip" placeholder="Zip Code" component={InputForm} />
                  </div>
                </div>
                <div className='mt-8'>
                  <button
                    type="button"
                    onClick={openPaymentModalFunction}
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 text-sm font-semibold text-white rounded-md max-w-52 bg-blue-600 hover:bg-blue-700 ${isSubmitting ? "opacity-60" : 'opacity-100'}`}
                  >
                    Metodo di pagamento
                  </button>
                  {
                    isNotDesktopView ?
                      <>
                        <Suspense fallback={null}>
                          <p className={`${areCCFieldsPopulated ? "visible fade-in" : "invisible"} text-emerald-600 text-md mt-5 flex gap-1`}>
                            Metodo di pagamento aggiunto correttamente  <FaCheck className='relative top-1' />
                          </p>
                        </Suspense>
                      </> : null
                  }
                </div>
                <div className="divider my-7 lg:my-10"></div>
                <div className='flex mt-8 xl:justify-end'>
                  <button
                    type="submit"
                    disabled={isSubmitting || !areCCFieldsPopulated}
                    className={`w-full max-w-sm px-6 py-3 text-sm font-semibold text-white rounded-md bg-emerald-600 ${areCCFieldsPopulated ? 'opacity-100 hover:bg-emerald-700' : 'opacity-50'}`}
                  >
                    {isSubmitting ? 'Inviando...' : 'Conferma ordine'}
                  </button>
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

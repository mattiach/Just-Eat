import { Formik, Form, Field } from 'formik';
import InputForm from '../InputForm';

// icons
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';

const initialValues = {
  nome: '',
  cognome: '',
  email: '',
  telefono: '',
  indirizzo: '',
  città: '',
  paese: '',
  zip: '',
}

const CartUserProfile = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="sticky top-0 p-8 rounded-md xl:col-span-2 h-max fading-in-animation">
      <h2 className="text-2xl text-[#333]">Completa il tuo ordine</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-10">
            <div>
              <h3 className="text-lg text-[#333] mb-6">I tuoi dati personali</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="relative flex items-center">
                  <Field type="text" name="nome" placeholder="Il tuo nome" component={InputForm} />
                  <FaUserAlt className="relative right-6" />
                </div>
                <div className="relative flex items-center">
                  <Field type="text" name="cognome" placeholder="Il tuo cognome" component={InputForm} />
                  <FaUserAlt className="relative right-6" />
                </div>
                <div className="relative flex items-center">
                  <Field type="email" name="email" placeholder="La tua email" component={InputForm} />
                  <MdEmail className="relative right-6" />
                </div>
                <div className="relative flex items-center">
                  <Field type="text" name="telefono" placeholder="Numero di telefono" component={InputForm} />
                  <BsFillTelephoneFill className="relative right-6" />
                </div>
              </div>
            </div>
            <div className="mt-14">
              <h3 className="text-lg text-[#333] mb-6">Indirizzo di spedizione</h3>
              <div className="grid gap-6 mb-10 sm:grid-cols-2">
                <Field type="text" name="indirizzo" placeholder="Indirizzo, via/strada .." component={InputForm} />
                <Field type="text" name="città" placeholder="Città" component={InputForm} />
                <Field type="text" name="paese" placeholder="Paese" component={InputForm} />
                <Field type="text" name="zip" placeholder="Zip Code" component={InputForm} />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 text-sm font-semibold text-white rounded-md md:w-72 md:float-end lg:w-full xl:w-80 bg-emerald-600 hover:bg-emerald-500"
                >
                  {isSubmitting ? 'Inviando...' : 'Conferma ordine'}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CartUserProfile;

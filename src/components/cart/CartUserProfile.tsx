"use client";

import { useLocale, useTranslations } from "next-intl";
import { useFieldsPopulated } from "react-amazing-hooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Field, FieldProps, Form, Formik } from 'formik';
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { calculateCartTotalRaw } from "@/functions/common";
import { removeAllFromCart } from "@/redux/slices/cartSlice";
import { updateUserInfo } from "@/redux/slices/userSlice";
import { FieldsState } from "react-amazing-hooks/dist/interfaces/const";
import { UserFormProfile } from "@/interfaces/const";
import { loadStripe } from '@stripe/stripe-js';
import useCheckDeliveryEligibility from "@/hooks/useCheckDeliveryEligibility";

const CartUserProfile = () => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart);
  const userInfo = useSelector((state: RootState) => state.user);
  const parsedTotalCart = calculateCartTotalRaw(cart);
  const language = useLocale();

  // check delivery eligibility before submitting the form
  const isEligibleForDelivery = useCheckDeliveryEligibility(cart);
  const eligibleForDelivery = cart ? isEligibleForDelivery : false;
  const areUserFieldsPopulated = useFieldsPopulated(userInfo as unknown as FieldsState);

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

  // submit handler
  const handleSubmit = async (values: UserFormProfile, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    if (!areUserFieldsPopulated) {
      return;
    }

    if (cart.length > 0 && eligibleForDelivery) {
      const amount = parsedTotalCart * 100; // convert to cents

      try {
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount, language }),
        });

        dispatch(removeAllFromCart()); // remove all items from the cart

        const data = await response.json();
        const stripe = await stripePromise;

        if (stripe && data.sessionId) {
          await stripe.redirectToCheckout({ sessionId: data.sessionId });
        }
      } catch (error) {
        router.push('/order-cancelled');
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow lg:shadow-md xl:col-span-3">
      <h2 className="text-2xl">{t('components.cartUserProfile.title')}</h2>
      <Formik
        initialValues={userInfo}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form className="mt-5">
            <div>
              <h3 className="mb-5 text-lg">{t('components.cartUserProfile.yourInfo')}</h3>
              <div className="grid gap-4 gap-x-5 sm:grid-cols-2">
                <Field
                  name="name"
                  render={({ field }: FieldProps) => (
                    <Input
                      type="text"
                      placeholder={t('components.cartUserProfile.yourName')}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        dispatch(updateUserInfo({ name: e.currentTarget.value }));
                      }}
                    />
                  )}
                />
                <Field
                  name="lastname"
                  render={({ field }: FieldProps) => (
                    <Input
                      type="text"
                      placeholder={t('components.cartUserProfile.yourLastName')}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        dispatch(updateUserInfo({ lastname: e.currentTarget.value }));
                      }}
                    />
                  )}
                />
                <Field
                  name="email"
                  render={({ field }: FieldProps) => (
                    <Input
                      type="text"
                      placeholder={"Email"}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        dispatch(updateUserInfo({ email: e.currentTarget.value }));
                      }}
                    />
                  )}
                />
                <Field
                  name="phone"
                  render={({ field }: FieldProps) => (
                    <Input
                      type="text"
                      placeholder={t('components.cartUserProfile.yourPhoneNumber')}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        dispatch(updateUserInfo({ phone: e.currentTarget.value }));
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <div className="mt-8">
              <h3 className="mb-5 text-lg">{t('common.deliveryAddress')}</h3>
              <div className="grid gap-4 gap-x-5 sm:grid-cols-2">
                <Field
                  name="address"
                  render={({ field }: FieldProps) => (
                    <Input
                      type="text"
                      placeholder={t('common.deliveryAddress')}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        dispatch(updateUserInfo({ address: e.currentTarget.value }));
                      }}
                    />
                  )}
                />
                <Field
                  name="zip"
                  render={({ field }: FieldProps) => (
                    <Input
                      type="text"
                      placeholder="Zip Code"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        dispatch(updateUserInfo({ zip: e.currentTarget.value }));
                      }}
                    />
                  )}
                />
                <Field
                  name="city"
                  render={({ field }: FieldProps) => (
                    <Input
                      type="text"
                      disabled
                      className="cursor-not-allowed"
                      placeholder={t('common.city')}
                      {...field}
                    />
                  )}
                />
                <Field
                  name="country"
                  render={({ field }: FieldProps) => (
                    <Input
                      type="text"
                      disabled
                      className="cursor-not-allowed"
                      placeholder={t('common.country')}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className='flex justify-center md:justify-end'>
                <Button
                  type="submit"
                  disabled={!(areUserFieldsPopulated && eligibleForDelivery)}
                  className={`w-full xl:max-w-60 px-6 py-2 mt-5 md:mt-10 text-sm font-semibold text-white rounded-md bg-emerald-600 ${!(areUserFieldsPopulated && eligibleForDelivery) ? "opacity-50 cursor-not-allowed" : "opacity-100 hover:bg-emerald-700"}`}
                >
                  {isSubmitting ? (t('common.sending') + '...') : t('common.confirmOrder')}
                </Button>
              </div>
              {!eligibleForDelivery ?
                <>
                  <p className="relative text-xs italic text-right text-red-600 top-2 lg:top-1 right-3">
                    {t('common.minOrderRequired')}
                  </p>
                </>
                : null
              }
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CartUserProfile;

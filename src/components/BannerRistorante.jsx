import { useTranslation } from "react-i18next";

const BannerRistorante = ({ ristorante }) => {
  const { t } = useTranslation();

  const { street, postalCode, city } = ristorante.address;
  const { freeShipping, shippingCost, minOrder } = ristorante.shipping;

  return (
    <div className="flex justify-center py-20 mx-auto bg-primary">
      {ristorante ? (
        <div className="w-full max-w-screen-lg text-white text-center">
          <div className="mb-1">
            <h2 className={`${(ristorante.name.length > 18) ? "text-3xl md:text-4xl " : "text-4xl md:text-5xl"} font-semibold`}>
              {ristorante.name}
            </h2>
          </div>
          <div className="divider w-72 mx-auto my-2"></div>
          <div className="mx-auto text-center leading-6">
            <p>
              {street} - {postalCode}, {city}
            </p>
            <p className="text-sm italic">
              {freeShipping ? t('common.freeDelivery') : `${shippingCost}€ ${t('common.delivery')}`},
              <span className="pl-1">{minOrder > 0 ? `${minOrder}€ ${t('common.minOrder')}` : null}</span>
            </p>
          </div>
        </div>
      ) : null
      }
    </div >
  );
};

export default BannerRistorante;

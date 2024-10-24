import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { selectSelectedRestaurant } from "@/redux/slices/selectedRestaurantIDSlice";

interface BannerRestaurantProps {
  id: string | string[];
}

const BannerRestaurant = ({ id }: BannerRestaurantProps) => {
  const t = useTranslations();
  const selectedRestaurant = useSelector(
    selectSelectedRestaurant(id as string)
  );

  const { street, postalCode, city } = selectedRestaurant.address;
  const { freeShipping, shippingCost, minOrder } = selectedRestaurant.shipping;

  return (
    <div className="flex justify-center py-20 mx-auto bg-primary">
      {selectedRestaurant ? (
        <div className="w-full max-w-screen-lg text-white text-center">
          <div className="mb-1">
            <h2
              className={`${
                selectedRestaurant.name.length > 18
                  ? "text-3xl md:text-4xl "
                  : "text-4xl md:text-5xl"
              } font-semibold`}
            >
              {selectedRestaurant.name}
            </h2>
          </div>
          <div className="divider w-72 mx-auto my-2"></div>
          <div className="mx-auto text-center leading-6">
            <p>
              {street} - {postalCode}, {city}
            </p>
            <p className="text-sm italic">
              {freeShipping
                ? t("common.freeDelivery")
                : `${shippingCost}€ ${t("common.delivery")}`}
              ,
              <span className="pl-1">
                {minOrder > 0 ? `${minOrder}€ ${t("common.minOrder")}` : null}
              </span>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BannerRestaurant;

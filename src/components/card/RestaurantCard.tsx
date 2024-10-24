import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const RestaurantCard: React.FC<any> = ({ ristorante }) => {
  const t = useTranslations();
  const router = useRouter();
  const language = useLocale();

  // function to navigate to the specific restaurant page
  const navigateToRestaurantPageFunction = () => {
    router.push(`/${language}/restaurant/${ristorante.id}`);
  };

  return (
    <>
      <div className="card-restaurant-container my-2">
        <div className="relative inline-block overflow-hidden cursor-pointer">
          <Image
            src={`/assets/img/ristoranti/${ristorante.category}/${ristorante.image}`}
            alt={`${ristorante.name}`}
            title={`${ristorante.name}`}
            className="aspect-video w-72 xs:w-80 xsm:w-60 rounded-sm hover:opacity-90 border-primary border-2 zoomImgEffect transform transition-all duration-500"
            onClick={() => navigateToRestaurantPageFunction()}
            width={100}
            height={100}
          />
          <span
            className="absolute inset-0 transition-all duration-300 border-2 pointer-events-none border-primary"
            aria-hidden="true"
          ></span>
        </div>
        <div className="mt-1 text-ellipsis cursor-text">
          <div>
            <h2
              className="text-base tracking-tight cursor-pointer"
              onClick={() => navigateToRestaurantPageFunction()}
            >
              {ristorante.name}
            </h2>
          </div>
          <div className="flex text-[13.5px] relative top-[-2px]">
            <p>
              {ristorante.rating}
              <span className="pl-[1px]">/5</span>
            </p>
            <p className="italic pl-1">
              {t("common.minOrder")} {ristorante.shipping.minOrder}
              <span className="pl-[1px]">&euro;</span>
            </p>
          </div>
          <div className="flex justify-between">
            <div className="relative top-[-2px]">
              <p className="text-xs tracking-wide opacity-75 text-ellipsis">
                {ristorante.address.street + ", " + ristorante.address.city}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantCard;

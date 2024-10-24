import Image from "next/image";
import { useTranslations } from "next-intl";

interface ICardsCategory {
  imgSRC: string;
  title: string;
  setSelectedCuisine: any;
}

const CardsCategory: React.FC<ICardsCategory> = ({
  imgSRC,
  title,
  setSelectedCuisine,
}) => {
  const t = useTranslations();

  const selectCuisineFunction = () => {
    setSelectedCuisine(title);
  };

  return (
    <div>
      <Image
        src={`/${imgSRC}`}
        alt={title}
        title={title}
        width={130}
        height={130}
        className="cursor-pointer hover:opacity-90 px-1"
        onClick={selectCuisineFunction}
      />
      <p
        className="text-center font-bold relative text-sm bottom-6"
        title={title}
      >
        {t(`cuisines.` + title)
          .charAt(0)
          .toUpperCase() + t(`cuisines.` + title).slice(1)}
      </p>
    </div>
  );
};

export default CardsCategory;

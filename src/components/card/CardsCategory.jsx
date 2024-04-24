import { useTranslation } from "react-i18next";

const CardsCategory = ({ imgSRC, title, setSelectedCuisine }) => {
    const { t } = useTranslation();

    const selectCuisineFunction = () => {
        setSelectedCuisine(title);
    };

    const cardClasses = "text-center font-bold relative text-sm bottom-6"

    return (
        <div>
            <img
                src={imgSRC}
                alt={title}
                title={title}
                width={130}
                height={130}
                className="cursor-pointer hover:opacity-90 px-1"
                onClick={selectCuisineFunction}
            />
            <p className={cardClasses} title={title}>
                {t(`cuisines.` + title).charAt(0).toUpperCase() + t(`cuisines.` + title).slice(1)}
            </p>
        </div>
    );
};

export default CardsCategory
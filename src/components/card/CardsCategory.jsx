const CardsCategory = ({ imgSRC, title, setSelectedCuisine }) => {
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
                {title.charAt(0).toUpperCase() + title.slice(1)}
            </p>
        </div>
    );
};

export default CardsCategory
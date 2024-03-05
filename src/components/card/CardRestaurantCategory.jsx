const CardRestaurantCategory = ({ category, onClick }) => {
  return (
    <div className="m-2 mx-auto bg-white rounded-lg custom-shadow-card-restaurant overflow-hidden w-80">
      <div className="p-4">
        <div className="divider">
          <h2 className="text-lg font-semibold">{category.categoryTitle}</h2>
        </div>
        <div className="my-5 grid gap-2">
          {category.dishes.map((dish, index) => (
            <div key={index} className="flex justify-between cursor-pointer" onClick={() => onClick(dish)}>
              <p>{dish.name}</p>
              <p>{dish.price.toFixed(2)}&euro;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardRestaurantCategory;

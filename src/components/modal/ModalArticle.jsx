import { useSelector } from 'react-redux';

// icons
import { IoCloseSharp } from "react-icons/io5";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

const ModalArticle = ({
  restaurantId,
  selectedArticle,    // .. props
  modalId,
  addToCartFunction,
  removeFromCartFunction,
}) => {

  const { t } = useTranslation();

  // cart state from redux
  const cart = useSelector((state) => state.cart);

  // find the corresponding restaurant in the cart
  const restaurantInCart = cart.find(restaurant => restaurant.restaurantId === restaurantId);

  // ... find the corresponding product in the restaurant's cart
  const productInCart = restaurantInCart ? restaurantInCart.products.find(product => product.name === selectedArticle.products?.name) : null;

  // ... get the quantity of the product in the specific cart
  const quantityInCart = productInCart ? productInCart.quantity : 0;

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box bg-white">
        <form method="dialog" className="modal-backdrop">
          <button className="absolute p-1 outline-none btn btn-sm btn-circle btn-ghost right-2 top-2">
            <IoCloseSharp size={22} fill="black" title={t('common.close')} />
          </button>
        </form>
        <div className="flex items-center justify-between pb-3 my-5 border-b">
          <h3 className="text-lg font-bold">{selectedArticle.products?.name}</h3>
          <p className="pr-2.5 text-lg select-none">
            {selectedArticle.products?.price.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
          </p>
        </div>
        <div className="flex items-center justify-end">
          <button onClick={() => removeFromCartFunction(selectedArticle)} >
            <IoRemoveCircleOutline size={24} />
          </button>
          <span className={`w-8 text-center text-lg select-none ${quantityInCart > 99 ? "mx-1" : "mx-0-5"}`}>{quantityInCart}</span>
          <button onClick={() => addToCartFunction(selectedArticle)} >
            <IoAddCircleOutline size={24} />
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>{t('common.close')}</button>
      </form>
    </dialog>
  );
};

export default ModalArticle;

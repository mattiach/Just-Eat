import { useSelector } from 'react-redux';

// icons
import { IoCloseSharp } from "react-icons/io5";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

const ModalArticle = ({
  restaurantId,
  selectedArticle,    // .. props
  modalId,
  addToCartFunction,
  removeFromCartFunction,
}) => {
  // stato del carrello da redux
  const cart = useSelector((state) => state.cart);

  // trova il ristorante corrispondente nel carrello
  const restaurantInCart = cart.find(restaurant => restaurant.restaurantId === restaurantId);

  // ... cerca nel ristorante il prodotto corrispondente al proprio carrello
  const productInCart = restaurantInCart ? restaurantInCart.products.find(product => product.name === selectedArticle.products?.name) : null;

  // ... ottiene la quantità del prodotto nel carrello specifico
  const quantityInCart = productInCart ? productInCart.quantity : 0;

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <form method="dialog" className="modal-backdrop">
          <button className="absolute p-1 outline-none btn btn-sm btn-circle btn-ghost right-2 top-2">
            <IoCloseSharp size={22} fill="black" title="Chiudi" />
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
        <button>Chiudi</button>
      </form>
    </dialog>
  );
};

export default ModalArticle;

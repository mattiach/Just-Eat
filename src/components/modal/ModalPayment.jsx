import { IoCloseSharp } from "react-icons/io5";
import CreditCardComponent from "../cart/CreditCardComponent"

const ModalPayment = ({ modalId }) => {
  return (
    <>
      <dialog id={modalId} className="modal">
        <div className="max-w-xl modal-box">
          <form method="dialog" className="modal-backdrop">
            <button className="absolute p-1 outline-none btn btn-sm btn-circle btn-ghost right-2 top-2">
              <IoCloseSharp size={22} fill="black" title="Chiudi" />
            </button>
          </form>
          <div className="pb-3 my-5 bg-white border-b">
            <CreditCardComponent />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Chiudi</button>
        </form>
      </dialog>
    </>
  )
}
export default ModalPayment
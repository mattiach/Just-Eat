import { IoCloseSharp } from "react-icons/io5";
import CreditCardComponent from "@components/cart/CreditCardComponent";
import { useTranslation } from "react-i18next";

const ModalPayment = ({ modalId }) => {
  const { t } = useTranslation();

  return (
    <>
      <dialog id={modalId} className="modal">
        <div className="max-w-xl modal-box bg-white">
          <form method="dialog" className="modal-backdrop">
            <button className="absolute p-1 outline-none btn btn-sm btn-circle btn-ghost right-2 top-2">
              <IoCloseSharp size={22} fill="black" title={t('common.close')} />
            </button>
          </form>
          <div className="pb-3 my-5 bg-white border-b">
            <CreditCardComponent />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>{t('common.close')}</button>
        </form>
      </dialog>
    </>
  )
}
export default ModalPayment
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";

const ModalRider = ({ children, idModal, className }) => {

  const { t } = useTranslation();

  /* 
    it opens using the document.getElementById('ID').showModal() method
    it closes using the document.getElementById('ID').close() method

    esempio :
        <button className="btn" onClick={() => document.getElementById(idModal).showModal()}>
          open modal
        </button>
  */

  return (
    <>
      <div className={className}>
        <dialog id={idModal} className="modal">
          <div className="modal-box bg-white">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-800">
                <IoMdClose aria-label={t('common.close')} />
              </button>
            </form>
            <div className="text-gray-800">
              {children}
            </div>
          </div>
        </dialog>
      </div>
    </>
  )
}
export default ModalRider
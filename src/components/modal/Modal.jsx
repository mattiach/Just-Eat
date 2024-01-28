import { IoMdClose } from "react-icons/io";

const Modal = ({ children, idModal, className }) => {

  /* 
    -- si apre usando il metodo document.getElementById('ID').showModal()
    -- si chiude usando il metodo document.getElementById('ID').close()

    esempio :
        <button className="btn" onClick={() => document.getElementById(idModal).showModal()}>
          open modal
        </button>
  */

  return (
    <>
      <div className={className}>
        <dialog id={idModal} className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-800">
                <IoMdClose aria-label="chiudi" />
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
export default Modal
import { useContext } from "react";
import { AppContext } from "@context/AppContext";
import useFieldsPopulated from "@hooks//UseFieldPopulated";

const CreditCardComponent = () => {
  const { creditCardInfo, setCreditCardInfo } = useContext(AppContext);
  const areFieldsPopulated = useFieldsPopulated(creditCardInfo);

  return (
    <>
      <div className="w-full max-w-lg mx-auto select-none">
        <div className="p-4">
          <h2 className="text-lg font-medium">Aggiungi metodo di pagamento</h2>
          <div className="my-4 divider"></div>
          <form method="dialog">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="card-holder"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Nome completo
                </label>
                <input
                  type="text"
                  name="card-holder"
                  id="card-holder"
                  value={creditCardInfo.holder}
                  onChange={(event) => setCreditCardInfo({ ...creditCardInfo, holder: event.target.value })}
                  placeholder="Nome e cognome"
                  className="px-4 py-3.5 bg-white w-full text-sm border-b-2 focus:border-primary outline-none custom-shadow-sm"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="card-number"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Numero della carta
                </label>
                <input
                  type="text"
                  name="card-number"
                  id="card-number"
                  onChange={(event) => setCreditCardInfo({ ...creditCardInfo, cardNumber: event.target.value })}
                  placeholder="0000 0000 0000 0000"
                  className="px-4 py-3.5 bg-white w-full text-sm border-b-2 focus:border-primary outline-none custom-shadow-sm"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="expiration-date"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Data di scadenza
                </label>
                <input
                  type="text"
                  name="expiration-date"
                  id="expiration-date"
                  onChange={(event) => setCreditCardInfo({ ...creditCardInfo, expirationDate: event.target.value })}
                  placeholder="MM / AA"
                  className="px-4 py-3.5 bg-white  w-full text-sm border-b-2 focus:border-primary outline-none custom-shadow-sm"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="cvv"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  id="cvv"
                  onChange={(event) => setCreditCardInfo({ ...creditCardInfo, cvc: event.target.value })}
                  placeholder='123'
                  className="px-4 py-3.5 bg-white  w-full text-sm border-b-2 focus:border-primary outline-none custom-shadow-sm"
                />
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                disabled={!areFieldsPopulated}
                className={`w-full bg-blue-600 text-white font-medium py-3 rounded-lg focus:outline-none ${!areFieldsPopulated ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-700'
                  }`}
              >
                Aggiungi
              </button>
            </div>
            <div className="relative top-6">
              <p className="text-sm italic text-gray-400">
                Le informazioni inserite non saranno salvate.*
              </p>
            </div>
          </form>
        </div>
      </div >
    </>
  )
}
export default CreditCardComponent
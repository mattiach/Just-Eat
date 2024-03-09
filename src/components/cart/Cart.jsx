const Cart = () => {
  return (
    <>
      <div className="lg:h-screen lg:sticky lg:top-0 rounded-md shadow bg-white">
        <div className="relative h-full">
          <div className="p-10 lg:overflow-auto lg:h-[calc(100vh)]">
            <h2 className="text-2xl">Riepilogo</h2>
            <div className="mt-10 space-y-6">
              <div className="grid items-start gap-6 sm:grid-cols-2">
                <div className="px-4 py-6 rounded-md shrink-0 bg-gray-50">
                  <img
                    src="https://readymadeui.com/images/product10.webp"
                    className="object-contain w-full"
                    alt=".."
                  />
                </div>
                <div>
                  <h3 className="text-base">Naruto: Split Sneakers</h3>
                  <ul className="mt-4 space-y-3 text-xs">
                    <li className="flex flex-wrap gap-4">
                      Size <span className="ml-auto">37</span>
                    </li>
                    <li className="flex flex-wrap gap-4">
                      Quantity <span className="ml-auto">2</span>
                    </li>
                    <li className="flex flex-wrap gap-4">
                      Total Price <span className="ml-auto">$40</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-0 bottom-0 bg-gray-100 border-t-2 w-full p-4">
            <h4 className="flex flex-wrap gap-4 text-base">
              Total <span className="ml-auto">$84.00</span>
            </h4>
          </div>
        </div>
      </div>
    </>
  )
}
export default Cart
const Cart = () => {
  return (
    <>
      <div className="bg-[#262626] lg:h-screen lg:sticky lg:top-0 rounded-sm">
        <div className="relative h-full">
          <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)]">
            <h2 className="text-2xl text-white">Riepilogo</h2>
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
                  <h3 className="text-base text-white">Naruto: Split Sneakers</h3>
                  <ul className="mt-4 space-y-3 text-xs text-white">
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
              <div className="grid items-start gap-6 sm:grid-cols-2">
                <div className="px-4 py-6 rounded-md shrink-0 bg-gray-50">
                  <img
                    src="https://readymadeui.com/images/product11.webp"
                    className="object-contain w-full"
                    alt=".."
                  />
                </div>
                <div>
                  <h3 className="text-base text-white">VelvetGlide Boots</h3>
                  <ul className="mt-4 space-y-3 text-xs text-white">
                    <li>
                      Size <span className="float-right">37</span>
                    </li>
                    <li>
                      Quantity <span className="float-right">2</span>
                    </li>
                    <li>
                      Total Price <span className="float-right">$40</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid items-start gap-6 sm:grid-cols-2">
                <div className="px-4 py-6 rounded-md shrink-0 bg-gray-50">
                  <img
                    src="https://readymadeui.com/images/product14.webp"
                    className="object-contain w-full"
                    alt=".."
                  />
                </div>
                <div>
                  <h3 className="text-base text-white">Echo Elegance</h3>
                  <ul className="mt-4 space-y-3 text-xs text-white">
                    <li>
                      Size <span className="float-right">37</span>
                    </li>
                    <li>
                      Quantity <span className="float-right">2</span>
                    </li>
                    <li>
                      Total Price <span className="float-right">$40</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid items-start gap-6 sm:grid-cols-2">
                <div className="px-4 py-6 rounded-md shrink-0 bg-gray-50">
                  <img
                    src="https://readymadeui.com/images/product13.webp"
                    className="object-contain w-full"
                    alt=".."
                  />
                </div>
                <div>
                  <h3 className="text-base text-white">Pumps</h3>
                  <ul className="mt-4 space-y-3 text-xs text-white">
                    <li>
                      Size <span className="float-right">37</span>
                    </li>
                    <li>
                      Quantity <span className="float-right">2</span>
                    </li>
                    <li>
                      Total Price <span className="float-right">$40</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-0 bottom-0 bg-[#444] w-full p-4">
            <h4 className="flex flex-wrap gap-4 text-base text-white">
              Total <span className="ml-auto">$84.00</span>
            </h4>
          </div>
        </div>
      </div>
    </>
  )
}
export default Cart
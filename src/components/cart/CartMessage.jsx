const CartMessage = ({ isVisible, message }) => {
  return (
    <>
      <p className={`${isVisible ? "visible fade-in" : "invisible"} text-emerald-600 mt-4 lg:mt-2`}>
        {message}
      </p>
    </>
  )
}
export default CartMessage
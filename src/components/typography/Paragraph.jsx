const Paragraph = ({ children }) => {
  return (
    <>
      <p className="text-lg sm:text-xl leading-6 tracking-wide">
        {children}
      </p>
    </>
  )
}

export default Paragraph
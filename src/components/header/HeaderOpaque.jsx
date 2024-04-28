const HeaderOpaque = ({ children, img }) => {
  return (
    <>
      <header
        className="jumbotron-justeat relative overflow-hidden bg-cover bg-no-repeat p-12 text-center shadow border-b md:border-b-2 border-primary shadow-primary" id="tv"
        style={{ backgroundImage: `url(${img})` }}>
        <div
          className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="flex h-full items-center justify-center">
            {children}
          </div>
        </div>
      </header>
    </>
  )
}
export default HeaderOpaque
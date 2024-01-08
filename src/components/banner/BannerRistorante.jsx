const BannerRistorante = ({ ristorante }) => {
  return (
    <div className="bg-primary p-10 flex justify-end mx-auto">
      {
        ristorante ?
          <div>
            <h2>{ristorante.name} </h2>
          </div> : null
      }
    </div>
  )
}

export default BannerRistorante
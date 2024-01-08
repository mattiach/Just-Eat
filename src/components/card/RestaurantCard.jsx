import { Link } from "react-router-dom"

const RestaurantCard = ({ ristorante, searchText }) => {

    return (
        <>
            <div className={`card-restaurant-container my-[5px] ${searchText.length === 0 ? 'fade-in' : 'animate-none'}`}>
                <div className="cursor-pointer relative inline-block overflow-hidden">
                    <Link to={`/ristorante/${ristorante.id}`}>
                        <img
                            src={`assets/img/ristoranti/${ristorante.category}/${ristorante.image}`}
                            alt={`${ristorante.name}`}
                            title={`${ristorante.name}`}
                            className="aspect-video w-[275px] sm:w-[240px] rounded-sm hover:opacity-90 border-primary border-2 zoomImgEffect transform transition-all duration-500"
                        />
                    </Link>
                    <span
                        className="absolute inset-0 border-primary border-2 pointer-events-none transition-all duration-300"
                        aria-hidden="true"
                    ></span>
                </div>
                <div className="mt-1 text-ellipsis cursor-text">
                    <div>
                        <h2 className="text-base tracking-tight" title={`${ristorante.title}`}>
                            {ristorante.name}
                        </h2>
                    </div>
                    <div className="flex text-[13.5px] relative top-[-2px]">
                        <p>
                            {ristorante.rating}<span className="pl-[1px]">/5</span>
                        </p>
                        <p className="italic pl-1.5">
                            ordine minimo {ristorante.shipping.minOrder}
                            <span className="pl-[1px]">
                                &euro;
                            </span>
                        </p>
                    </div>
                    <div className="relative top-[-2px]">
                        <p className="text-xs text-ellipsis opacity-75 tracking-wide">
                            {ristorante.address.street + ', ' + ristorante.address.city}
                        </p>
                    </div>
                </div>
            </div >
        </>
    )
}

export default RestaurantCard
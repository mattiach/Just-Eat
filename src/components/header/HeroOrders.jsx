const HeroOrders = () => {
    const heroBannerIMG = 'assets/img/hero.webp';

    return (
        <>
            <header>
                <div
                    className="jumbotron-justeat-orders p-12 text-center relative overflow-hidden bg-no-repeat bg-center bg-cover"
                    style={{ backgroundImage: `url(${heroBannerIMG})` }}>
                    <div className="absolute right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed" />
                </div>
            </header>
        </>
    )
}
export default HeroOrders
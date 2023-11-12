const Header = () => {
    const image1 = "assets/img/bg_hero-wide.jpg";
    const image2 = "assets/img/bg_hero-wide2.jpg";

    const bgSRC = Math.random() < .5 ? image1 : image2;

    return (
        <>
            <header>
                <div
                    className="jumbotron-justeat p-12 text-center relative overflow-hidden bg-no-repeat bg-center bg-cover"
                    style={{ backgroundImage: `url(${bgSRC})` }}>
                    <div className="absolute right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed" />
                </div>
            </header>
        </>
    );
};

export default Header
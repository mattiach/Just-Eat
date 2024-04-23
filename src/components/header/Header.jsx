const Header = ({ bgSRC, small }) => {
    return (
        <>
            <header>
                <div
                    className={`${small ? 'jumbotron-justeat-orders' : 'jumbotron-justeat'} p-12 text-center relative overflow-hidden bg-no-repeat bg-center bg-cover`}
                    style={{ backgroundImage: `url(${bgSRC})` }}>
                    <div className="absolute right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed" />
                </div>
            </header>
        </>
    );
};

export default Header
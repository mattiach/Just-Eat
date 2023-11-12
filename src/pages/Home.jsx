// media queries
import { useMediaQuery } from 'react-responsive';

// components
import Navbar from '../components/navbar/Navbar';
import Header from '../components/header/Header';
import Title from '../components/title/title';
import Button from '../components/button/Button';
import Paragraph from '../components/paragraph/Paragraph';
import Footer from '../components/footer/Footer';

const Home = () => {
    const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

    return (
        <>
            <Navbar />
            <Header />
            <div className="text-center mt-10">
                <Title>&Egrave; bello prenderci gusto!</Title>
            </div>
            <div className="text-center mt-10">
                <Button>Trova i ristoranti</Button>
            </div>
            <div className='mt-20 xl:mt-28 xl:flex xl:justify-evenly mx-auto gap-6 max-w-7xl'>
                <div className='mx-auto flex justify-center xl:block xl:mx-0'>
                    <img
                        src={'assets/img/apps_promo-wide-je.png'}
                        className={`w-80 ${isMobile && "w-72"}`}
                        alt="App JustEat"
                        title="App JustEat"
                    />
                </div>
                <div className="text-center pt-14 md:pt-20 lg:pt-24">
                    <Paragraph>
                        Scarica l'app di Just Eat e ordina dove vuoi,
                        <span className='inline-block sm:block pl-1 sm:pl-0'>
                            qualunque cosa desideri
                        </span>
                    </Paragraph>
                    <div className='flex justify-center mt-20 sm:mt-14'>
                        <img
                            src={`${isDesktop ? 'assets/img/app-store.png' : 'assets/img/app-store-mobile.jpg'}`}
                            className={`${isDesktop ? "w-96" : "w-40"}`}
                            alt="App JustEat"
                            title="App JustEat"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home
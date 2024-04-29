import { lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';

// assets
const headerImage1 = "assets/img/bg_hero-wide.jpg";
const headerImage2 = "assets/img/bg_hero-wide2.jpg";
const appStore = 'assets/img/app-store.png';
const appStoreMobile = 'assets/img/app-store-mobile.jpg';

// components
import Navbar from '@components/navbar/Navbar';
const Header = lazy(() => import('@components/header/Header'));
const Title = lazy(() => import('@components/typography/Title'));
const Button = lazy(() => import('@components/button/Button'));
const Paragraph = lazy(() => import('@components/typography/Paragraph'));
const Footer = lazy(() => import('@components/footer/Footer'));


const Home = () => {
  const { t } = useTranslation();

  const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const [bgSRC] = useState(Math.random() < 0.5 ? headerImage1 : headerImage2);

  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <Header bgSRC={bgSRC} />
        <main className='fading-in-animation select-none'>
          <div className="mt-10 text-center">
            <Title>{t('pages.home.title')}</Title>
          </div>
          <div className="mt-10 text-center">
            <Link to={'/orders'}>
              <Button
                className={"focus:outline-none bg-primary hover:bg-secondary text-white focus:ring-0 font-semibold text-xl rounded-lg py-3 px-4 mr-2 mb-2 w-52 md:w-60"}
              >
                {t('pages.home.button')}
              </Button>
            </Link>
          </div>
          <div className='gap-6 mx-auto mt-20 xl:mt-28 xl:flex xl:justify-evenly max-w-7xl'>
            <div className='flex justify-center mx-auto xl:block xl:mx-0'>
              <img
                src={'assets/img/apps_promo-wide-je.png'}
                className={`${isMobile ? "w-60" : "w-80"}`}
                alt="App JustEat"
                title="App JustEat"
              />
            </div>
            <div className="text-center pt-14 md:pt-20 lg:pt-24">
              <Paragraph>
                {t('pages.home.paragraph1')}
                <span className='inline-block pl-1 sm:block sm:pl-0'>
                  {t('pages.home.paragraph2')}
                </span>
              </Paragraph>
              <div className='flex justify-center mt-20 sm:mt-14'>
                <img
                  src={isDesktop ? appStore : appStoreMobile}
                  className={`${isDesktop ? "w-96" : "w-40"}`}
                  alt="App JustEat"
                  title="App JustEat"
                />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </Suspense >
    </>
  );
};

export default Home
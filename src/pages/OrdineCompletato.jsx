import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AppContext } from '@context/AppContext';
import { copyToClipboardFunction } from '@functions/copyToClipboardFunction';

// components
import Navbar from '@components/navbar/Navbar';
import Container from '@components/Container';
import Subtitle from '@components/typography/Subtitle';
import Footer from '@components/footer/Footer';

const OrdineCompletato = () => {
  const { t } = useTranslation();
  const { orderNumber } = useContext(AppContext);

  //  copy the "order number" to the clipboard when the user clicks on it
  const copyOrderNumber = () => {
    copyToClipboardFunction(orderNumber);
  }

  return (
    <>
      <Navbar />
      <Container>
        <div className="relative mt-10 text-center top-8">
          <div>
            <Subtitle className={'md:text-3xl'}>
              {t('common.orderCompleted')}!
            </Subtitle>
            <p className='text-xs italic leading-9 opacity-90'>
              {t('common.orderNumber')}:
              <span
                className='pl-1 underline cursor-pointer underline-offset-4'
                title={t('common.clickToCopy')}
                onClick={copyOrderNumber}
              >
                #{orderNumber}
              </span>
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src={'/assets/img/order-completed.png'}
              alt='order-completed.png'
              loading='eager'
              className='w-80 xs:w-96 md:w-[30rem] mx-auto'
            />
          </div>
          <div className='relative bottom-8'>
            <p className='tracking-tight text-center text-balance opacity-90 p-1.5 text-xs xs:text-sm sm:text-md md:text-base'>
              {t('pages.orderCompleted.paragraph')}
            </p>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}
export default OrdineCompletato
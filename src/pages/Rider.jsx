import { Fragment, useState, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from 'notistack';

// data & assets
import faq from "@data/faq.json";
const imageRider1 = "assets/img/riders.webp";
const imageRider2 = "assets/img/riders2.webp";

// functions
import { openModalFunction } from "@functions/openModalFunction";
import { closeModalFunction } from "@functions/closeModalFunction";

// components
import Navbar from '@components/navbar/Navbar';
import Button from '@components/button/Button';
import HeaderOpaque from '@components/header/HeaderOpaque';
import Subtitle from '@components/typography/Subtitle';
import Paragraph from '@components/typography/Paragraph';
import Container from "@components/Container";
import Accordion from "@components/Accordion";
import Footer from "@components/footer/Footer";
import ModalRider from "@components/modal/ModalRider";
const ApplicationForm = lazy(() => import("@components/ApplicationForm"));

const Rider = () => {
  const { t, i18n } = useTranslation();
  const [bgSRC] = useState(Math.random() < 0.5 ? imageRider1 : imageRider2); // change image background

  // file upload form
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // modal open/close function
  const openModal = openModalFunction();
  const closeModal = closeModalFunction();

  // function to confirm and send the resume.
  const sendResumeFunction = () => {
    if (selectedFiles.length === 0) {
      enqueueSnackbar(t('notifications.message2'), { autoHideDuration: 3000 });
      return;
    }
    enqueueSnackbar(t('notifications.message1'), { autoHideDuration: 3500 });
    closeModal('rider_application_modal');
    setSelectedFiles([]);
  };

  return (
    <>
      <div className="bg-gray-100">
        <Navbar />
        <HeaderOpaque img={bgSRC}>
          <div className="text-white">
            <h2 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              {t('pages.workWithUs.title')}
            </h2>
            <Button onClick={() => openModal('rider_application_modal')}>
              {t('pages.workWithUs.button')}
            </Button>
            <ModalRider idModal={"rider_application_modal"} className={"shadow-xl"}>
              <Suspense fallback={null}>
                <div className="mt-5 mx-0">
                  <ApplicationForm
                    isDragging={isDragging}
                    selectedFiles={selectedFiles}
                    setIsDragging={setIsDragging}
                    setSelectedFiles={setSelectedFiles}
                    sendResumeFunction={sendResumeFunction}
                  />
                </div>
              </Suspense>
            </ModalRider>
          </div>
        </HeaderOpaque >
        <main className="mt-5 md:mt-12">
          <Container>
            <div className="text-center my-14 md:my-16 lg:my-28">
              <div className="mb-4">
                <Subtitle>
                  {t('pages.workWithUs.subtitle')}<span className="text-primary"> {t('pages.workWithUs.subtitle2')}</span>
                </Subtitle>
              </div>
              <div>
                <Paragraph>
                  {t('pages.workWithUs.paragraph')}
                </Paragraph>
              </div>
            </div>
            <div className="px-3">
              {
                faq.map((faq) => {
                  return (
                    <Fragment key={faq.id}>
                      <Accordion
                        id={faq.id}
                        question={i18n.language === 'it' ? faq.question : faq.questionENG}
                        answer={i18n.language === 'it' ? faq.answer : faq.answerENG}
                      />
                    </Fragment>
                  )
                })
              }
            </div>
          </Container>
        </main>
        <Footer />
      </div >
    </>
  )
}
export default Rider

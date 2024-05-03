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
const Subtitle = lazy(() => import("@components/typography/Subtitle"));
const Paragraph = lazy(() => import("@components/typography/Paragraph"));
const ModalRider = lazy(() => import("@components/modal/ModalRider"));
const ApplicationForm = lazy(() => import("@components/ApplicationForm"));
const Container = lazy(() => import("@components/Container"));
const Accordion = lazy(() => import("@components/Accordion"));
const Footer = lazy(() => import("@components/footer/Footer"));

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
      // TODO: add a 'POST' request to send the resume 😊
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
            <Suspense fallback={null}>
              <ModalRider
                idModal={"rider_application_modal"}
                className={"shadow-xl"}
              >
                <div className="mt-5 mx-0">
                  <ApplicationForm
                    isDragging={isDragging}
                    selectedFiles={selectedFiles}
                    setIsDragging={setIsDragging}
                    setSelectedFiles={setSelectedFiles}
                    sendResumeFunction={sendResumeFunction}
                  />
                </div>
              </ModalRider>
            </Suspense>
          </div>
        </HeaderOpaque >
        <main className="mt-5 md:mt-12">
          <Suspense fallback={null}>
            <Container>
              <div className="text-center my-14 md:my-16 lg:my-28">
                <div className="mb-4">
                  <Suspense fallback={null}>
                    <Subtitle>
                      {t('pages.workWithUs.subtitle')}<span className="text-primary"> {t('pages.workWithUs.subtitle2')}</span>
                    </Subtitle>
                  </Suspense>
                </div>
                <div>
                  <Suspense fallback={null}>
                    <Paragraph>
                      {t('pages.workWithUs.paragraph')}
                    </Paragraph>
                  </Suspense>
                </div>
              </div>
              <div className="px-3">
                {
                  faq.map((faq) => {
                    const languageMap = {
                      it: { question: faq.question, answer: faq.answer },
                      en: { question: faq.questionENG, answer: faq.answerENG },
                      fr: { question: faq.questionFR, answer: faq.answerFR }
                    };

                    return (
                      <Fragment key={faq.id}>
                        <Accordion
                          id={faq.id}
                          question={languageMap[i18n.language].question}
                          answer={languageMap[i18n.language].answer}
                        />
                      </Fragment>
                    );
                  })
                }
              </div>
            </Container>
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div >
    </>
  )
}
export default Rider

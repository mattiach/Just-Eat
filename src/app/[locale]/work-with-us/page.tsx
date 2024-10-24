"use client";

import { Fragment, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

// data & assets
import faq from "@/data/faq.json";
const imageRider1 = "/assets/img/riders.webp";
const imageRider2 = "/assets/img/riders2.webp";

// components
import LayoutContainer from "@/components/LayoutContainer";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Header from "@/components/Header";
import Paragraph from "@/components/typography/Paragraph";
import Title from "@/components/typography/Title";
import AccordionFAQ from "@/components/AccordionFAQ";
import ApplicationForm from "@/components/ApplicationForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Page = () => {
  const t = useTranslations();
  const language = useLocale();

  const [bgSRC] = useState<string>(
    Math.random() < 0.5 ? imageRider1 : imageRider2
  );

  // file upload form
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // function to confirm and send the resume.
  const sendResumeFunction = () => {
    if (selectedFiles.length === 0) {
      // TODO: add a 'POST' request to send the resume 💻
      return;
    }
    setSelectedFiles([]);
  };

  return (
    <>
      <LayoutContainer className="bg-gray-100">
        <Navbar />
        <div>
          <Header bgSRC={bgSRC} bgColor="rider">
            <div
              className="absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-hidden bg-center bg-cover"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="flex items-center justify-center h-full">
                <div className="text-white">
                  <Title className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    {t("pages.workWithUs.title")}
                  </Title>
                  <Dialog>
                    <DialogTrigger className="focus:outline-none bg-primary hover:bg-secondary focus:ring-0 font-semibold text-xl py-3 px-4 mr-2 mb-2 w-52 md:w-60 text-white rounded-md">
                      {t("pages.workWithUs.button")}
                    </DialogTrigger>
                    <DialogContent>
                      <div className="mt-5">
                        <ApplicationForm
                          isDragging={isDragging}
                          selectedFiles={selectedFiles}
                          setIsDragging={setIsDragging}
                          setSelectedFiles={setSelectedFiles}
                          sendResumeFunction={sendResumeFunction}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </Header>
          <main className="mt-5 md:mt-12">
            <div>
              <div className="px-2 text-center my-14 md:my-16 lg:my-28">
                <div className="mb-4">
                  <Title tag="h2">
                    {t("pages.workWithUs.subtitle")}
                    <span className="text-primary">
                      {t("pages.workWithUs.subtitle2")}
                    </span>
                  </Title>
                </div>
                <div>
                  <Paragraph>{t("pages.workWithUs.paragraph")}</Paragraph>
                </div>
              </div>
              <div className="px-2">
                {faq.map((faq) => {
                  const languageMap: {
                    [key: string]: { question: string; answer: string };
                  } = {
                    it: { question: faq.question, answer: faq.answer },
                    en: { question: faq.questionENG, answer: faq.answerENG },
                    fr: { question: faq.questionFR, answer: faq.answerFR },
                    de: { question: faq.questionDE, answer: faq.answerDE },
                    es: { question: faq.questionES, answer: faq.answerES },
                  };

                  return (
                    <Fragment key={"FAQ_KEY_" + faq.id}>
                      <AccordionFAQ
                        id={faq.id}
                        question={languageMap[language].question}
                        answer={languageMap[language].answer}
                      />
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </LayoutContainer>
    </>
  );
};

export default Page;

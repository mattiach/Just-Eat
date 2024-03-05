import { Fragment, useState, lazy, Suspense } from "react";

// data & assets
import faq from "../data/faq.json";
const imageRider1 = "assets/img/riders.webp";
const imageRider2 = "assets/img/riders2.webp";

// functions
import { openModalFunction } from "../functions/openModalFunction";
import { closeModalFunction } from "../functions/closeModalFunction";

// components
import Navbar from '../components/navbar/Navbar';
import Button from '../components/button/Button';
import HeaderOpaque from '../components/header/HeaderOpaque';
import Subtitle from '../components/typography/Subtitle';
import Paragraph from '../components/typography/Paragraph';
import Container from "../components/Container";
import Accordion from "../components/Accordion";
import Footer from "../components/footer/Footer";
import ModalRider from "../components/modal/ModalRider";
import ApplicationForm from "../components/ApplicationForm";

const Rider = () => {
    const [bgSRC] = useState(Math.random() < 0.5 ? imageRider1 : imageRider2); // cambia lo sfondo

    // form caricamento file
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    // funzione di apertura/chiusa del modale
    const openModal = openModalFunction()
    const closeModal = closeModalFunction()

    // funzione per confermare ed inviare la candidatura. 
    const sendResumeFunction = () => {
        if (selectedFiles.length > 0) {
            alert('CV Inviato!');    // TODO: da collegare con un backend tramite 'POST' request 😊
            closeModal('rider_application_modal');
            setSelectedFiles([]);
        } else {
            alert('Seleziona un file prima di inviare il CV.');
        }
    };

    return (
        <>
            <div className="bg-gray-100">
                <Navbar />
                <HeaderOpaque img={bgSRC}>
                    <div className="text-white">
                        <h2 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                            Lavora come rider
                        </h2>
                        <Button onClick={() => openModal('rider_application_modal')}>
                            Candidati ora
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
                </HeaderOpaque>
                <main className="mt-5 md:mt-12">
                    <Container>
                        <div className="text-center my-14 md:my-16 lg:my-28">
                            <div className="mb-4">
                                <Subtitle>
                                    Ti offriamo un lavoro <span className="text-primary"> stabile e flessibile</span>
                                </Subtitle>
                            </div>
                            <div>
                                <Paragraph>
                                    Consegna i tuoi ordini... al resto ci pensiamo noi
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
                                                question={faq.question}
                                                answer={faq.answer}
                                            />
                                        </Fragment>
                                    )
                                })
                            }
                        </div>
                    </Container>
                </main>
                <Footer />
            </div>
        </>
    )
}
export default Rider

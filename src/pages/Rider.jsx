import { Fragment, useState, lazy, Suspense } from "react";

// data & assets
import faq from "../data/faq.json";
const imageRider1 = "assets/img/riders.webp";
const imageRider2 = "assets/img/riders2.webp";

// functions
import { openModalFunction } from "../functions/openModalFunction";

// components
import Navbar from '../components/navbar/Navbar';
import Button from '../components/button/Button';
import HeaderOpaque from '../components/header/HeaderOpaque';
import Subtitle from '../components/title/Subtitle';
import Paragraph from '../components/paragraph/Paragraph';
import Container from "../components/container/Container";
import Accordion from "../components/accordion/Accordion";
import Footer from "../components/footer/Footer";
import Modal from "../components/modal/Modal";
const ApplicationForm = lazy(() => import('../components/form/ApplicationForm'));

const Rider = () => {
    const [bgSRC] = useState(Math.random() < 0.5 ? imageRider1 : imageRider2); // cambia lo sfondo

    const [applicationUserInfo, setApplicationUserInfo] = useState({
        name: '',
        lastname: '',
        email: '',
        curriculum: null
    })

    // funzione di apertura del modale
    const openModal = openModalFunction()

    // funzione per aggiornare i campi del profilo utente
    const handleChangeUserInfo = (field, value) => {
        setApplicationUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [field]: value,
        }));
    };

    // funzione per gestire il file del curriculum
    const handleFileChange = (file) => {
        setApplicationUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            curriculum: file,
        }));
    };

    // funzione per inviare i dati dell'utente come application
    const sendApplicationFunction = () => {
        // .. verifica se tutti i campi sono compilati
        if (applicationUserInfo.name && applicationUserInfo.lastname && applicationUserInfo.email && applicationUserInfo.curriculum) {
            console.log("Candidatura inviata, grazie!", applicationUserInfo);
        } else {
            console.error("Compila tutti i campi prima di inviare l'application.");
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
                        <Button onClick={() => openModal('my_modal_3')}>
                            Candidati ora
                        </Button>
                        <Modal idModal={"my_modal_3"} className={"shadow-xl"}>
                            <Suspense fallback={null}>
                                <ApplicationForm
                                    handleChangeUserInfo={handleChangeUserInfo}
                                    handleFileChange={handleFileChange}
                                    sendApplicationFunction={sendApplicationFunction}
                                />
                            </Suspense>
                        </Modal>
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

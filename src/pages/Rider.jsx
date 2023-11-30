import { Fragment } from "react";

// data
import faq from "../data/faq.json";

// components
import Navbar from '../components/navbar/Navbar';
import Button from '../components/button/Button';
import HeaderOpaque from '../components/header/HeaderOpaque';
import Subtitle from '../components/title/Subtitle';
import Paragraph from '../components/paragraph/Paragraph';
import Container from "../components/container/Container";
import Accordion from "../components/accordion/Accordion";
import Footer from "../components/footer/Footer";

const Rider = () => {

    const imageRider1 = "assets/img/riders.webp";
    const imageRider2 = "assets/img/riders2.webp";

    const bgSRC = Math.random() < .5 ? imageRider1 : imageRider2;

    return (
        <>
            <div className="bg-gray-100">
                <Navbar />
                <HeaderOpaque img={bgSRC}>
                    <div className="text-white">
                        <h2 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                            Lavora come rider
                        </h2>
                        <Button>Candidati ora</Button>
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
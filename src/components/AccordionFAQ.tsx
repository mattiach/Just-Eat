import { useEffect, useState } from "react";

interface IAccordionFAQ {
  id: string;
  question: string;
  answer: string;
}

const AccordionFAQ: React.FC<IAccordionFAQ> = ({ id, question, answer }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<number>(0);

  useEffect(() => {
    setIsAnimated(isAnimated + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAccordionOpen]);

  return (
    <>
      <div
        id={`faq-${id}`}
        className={`bg-white dark:bg-white w-full max-w-2xl md:w-3/4 md:mx-auto ${isAccordionOpen ? "mb-4 mt-2" : "my-2"
          }`}
      >
        <div>
          <h2>
            <button
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              type="button"
              className={`flex items-center justify-between w-full p-5 font-medium text-left text-gray-800 rounded-sm border-2 border-gray-200 ${isAccordionOpen && "border-b-0"
                }`}
            >
              <span className="flex items-center">
                <svg
                  className={`w-5 h-5 mr-2 shrink-0 ${isAccordionOpen && "opacity-70"
                    }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="hover:text-primary">{question}</span>
              </span>
              <svg
                className={`w-6 h-6 shrink-0 ${isAccordionOpen && "rotate-180 opacity-70"
                  }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </h2>
        </div>
        {isAccordionOpen && (
          <>
            <div>
              <div className="p-5 border-2 border-gray-200">
                <p
                  className={`mb-2 text-gray-800 py-2 px-5 ${isAnimated < 3 && "animation-faq"
                    }`}
                >
                  {answer}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default AccordionFAQ;

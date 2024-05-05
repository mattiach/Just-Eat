import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "@context/AppContext";
import { changeLanguageFunction } from "@functions/changeLanguageFunction";
import { supportedLanguages } from "@settings/supportedLanguages";

const SelectLanguage = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useContext(AppContext);

  // language handler
  const handleLanguageChange = changeLanguageFunction(setLanguage, i18n);

  return (
    <>
      <div className="flex justify-center gap-2 relative top-1.5">
        <div className="hidden md:block">
          <img
            src={`/assets/img/flags/${language}.svg`}
            alt={language}
            width={22}
            height={22}
            className="aspect-auto"
            loading="eager"
          />
        </div>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="bg-transparent shadow-none border-none relative bottom-0.5">
            {t(`languages.${language}`)}
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] bg-gray-50 menu p-2 shadow w-44 rounded-md md:relative md:right-0">
            {
              supportedLanguages.map((languageFound) => {
                return (
                  <li
                    value={languageFound}
                    onClick={() => handleLanguageChange(languageFound)}
                    key={'language_KEY_' + languageFound}
                  >
                    <span onClick={() => handleLanguageChange(languageFound)}>
                      <img
                        src={`/assets/img/flags/${languageFound}.svg`}
                        alt={languageFound}
                        width={22}
                        height={22}
                        className="aspect-auto"
                        loading="lazy"
                      />
                      {t(`languages.${languageFound}`)}
                    </span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </>
  );
};

export default SelectLanguage;

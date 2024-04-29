export function changeLanguageFunction(setLanguage, i18n) {
  return (selectedLanguage) => {
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };
}

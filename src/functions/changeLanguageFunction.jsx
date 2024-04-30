export function changeLanguageFunction(setLanguage, i18n, disableLocalStorage) {
  return (selectedLanguage) => {
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);

    if (!disableLocalStorage) {
      localStorage.setItem('language', selectedLanguage);
    }
  };
}

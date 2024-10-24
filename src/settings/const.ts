import { ICuisineImage } from "@/interfaces/const";

/* 
  Supported Languages Configuration
  - Update the `supportedLanguages` array below if you add or remove languages.
  - IMPORTANT: after updating `supportedLanguages`, make sure to also update the `matcher` pattern in the `config` object in `src/middleware.ts`. Failure to update the `matcher` pattern will result in routing issues.
*/
export const supportedLanguages = ['en', 'it', 'es', 'de', 'fr'];
export const defaultLanguage = 'en';
export const defaultFoodCategory = 'pizza';

/*
  These string values correspond to translations in the language JSON files (path -> just-eat\languages). If these values are modified, the corresponding entries in the translations should also be updated to maintain consistency
*/
export const footerLinksList: Array<string[]> = [
  [
    "aboutUs",
    "infoAboutJE",
    "orderNotReceived",
    "workWithUs"
  ],
  [
    "cuisines",
    "allergies",
    "findRestaurants",
    "BecomeaJustEatrider"
  ],
  [
    "customerService",
    "faq",
    "downloadJustEatApp",
    "registerJustEat"
  ]
]

/*
  These are the filenames located in the specified path. If any changes are made to the file names in that path, the corresponding values in this list must also be updated to reflect those changes
*/
export const cuisineImages: ICuisineImage[] = [
  {
    id: 1,
    title: 'cinese',
    src: 'assets/img/cucine/cinese.jpg'
  },
  {
    id: 2,
    title: 'fritti',
    src: 'assets/img/cucine/fritti.jpg'
  },
  {
    id: 3,
    title: 'giapponese',
    src: 'assets/img/cucine/giapponese.jpg'
  },
  {
    id: 4,
    title: 'sushi',
    src: 'assets/img/cucine/sushi.jpg'
  },
  {
    id: 5,
    title: 'hamburger',
    src: 'assets/img/cucine/hamburger.jpg'
  },
  {
    id: 6,
    title: 'italiano',
    src: 'assets/img/cucine/italiano.jpg'
  },
  {
    id: 7,
    title: 'pizza',
    src: 'assets/img/cucine/pizza.jpg'
  },
];


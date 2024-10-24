"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { defaultFoodCategory } from "@/settings/const";
import type { AppContextType } from "@/interfaces/const";

const defaultContextValue: AppContextType = {
  selectedCuisine: defaultFoodCategory,
  setSelectedCuisine: () => { },
};

const AppContext = createContext<AppContextType>(defaultContextValue);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedCuisine, setSelectedCuisine] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const cuisineFromLocalStorage = localStorage.getItem("cuisine");
      return cuisineFromLocalStorage || defaultFoodCategory;
    } else {
      return defaultFoodCategory;
    }
  });

  useEffect(() => {
    // if (typeof window === "undefined") return;
    localStorage.setItem("cuisine", selectedCuisine);
  }, [selectedCuisine]);

  return (
    <AppContext.Provider
      value={{
        selectedCuisine,
        setSelectedCuisine
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

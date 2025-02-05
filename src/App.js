import React, { createContext } from "react";
import ProductList from "./components/ProductList";
import ProductSearch from "./components/ProductSearch";
import ThemeToggle from "./components/ThemeToggle";
import useLocalStorage from "./hooks/useLocalStorage";
import { LanguageSelector } from "./components/LanguageSelector";

export const ThemeContext = createContext();
export const LanguageContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage("theme", false);
  const [language, setLanguage] = useLocalStorage("language", "fr");

  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <div
          className={`container ${
            isDarkTheme ? "bg-dark text-light" : "bg-light"
          }`}
        >
          <header className="my-4">
            <h1 className="text-center">Catalogue de Produits</h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </header>

          <main>
            <ProductSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <ProductList searchTerm={searchTerm} />
          </main>
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;

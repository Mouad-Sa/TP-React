import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext, LanguageContext } from '../App';
import useDebounce from '../hooks/useDebounce';

const ProductSearch = ({ searchTerm, setSearchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const [localSearch, setLocalSearch] = useState(searchTerm);

  const debouncedValue = useDebounce(localSearch, 500);

  useEffect(() => {
    setSearchTerm(debouncedValue);
  }, [debouncedValue, setSearchTerm]);

  const placeholderText =
    language === 'fr' ? 'Rechercher un produit...' : 'Search product...';

  return (
    <div className="mb-4">
      <input
        type="text"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        placeholder={placeholderText}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;

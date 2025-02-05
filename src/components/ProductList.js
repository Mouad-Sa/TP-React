import React, { useContext } from 'react';
import { ThemeContext, LanguageContext } from '../App';
import useProductSearch from '../hooks/useProductSearch';

const ProductList = ({ searchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const {
    products,
    loading,
    error,
    page,
    totalPages,
    nextPage,
    previousPage,
    reload,
  } = useProductSearch();

  if (loading) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Erreur: {error}
      </div>
    );
  }

  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const priceLabel = language === 'fr' ? 'Prix' : 'Price';

  return (
    <div>
      {/* Bouton de rechargement */}
      <div className="text-end mb-3">
        <button className="btn btn-secondary" onClick={reload}>
          {language === 'fr' ? 'Recharger' : 'Reload'}
        </button>
      </div>

      {/* Liste de produits */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col">
            <div className={`card h-100 ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
              {product.thumbnail && (
                <img
                  src={product.thumbnail}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>{priceLabel}: </strong>
                  {product.price}€
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={previousPage}>
              {language === 'fr' ? 'Précédent' : 'Previous'}
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">
              Page {page} / {totalPages}
            </span>
          </li>
          <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={nextPage}>
              {language === 'fr' ? 'Suivant' : 'Next'}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductList;

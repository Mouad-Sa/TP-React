import { useState, useEffect } from 'react';

const useProductSearch = () => {
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 6;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const skip = (page - 1) * limit;

      const response = await fetch(
        `https://api.daaif.net/products?delay=1000&skip=${skip}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error('Erreur réseau');
      }

      const data = await response.json();

      setProducts(data.products || []);

      if (data.total) {
        setTotalPages(Math.ceil(data.total / limit));
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const reload = () => {
    fetchProducts();
  };

  return {
    products,
    loading,
    error,
    page,
    totalPages,
    nextPage,
    previousPage,
    reload,
  };
};

export default useProductSearch;

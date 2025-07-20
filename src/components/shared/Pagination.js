import React from 'react';

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const renderPagination = () => {
    const pages = [];
    const pageLimit = 9;
    let startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
    let endPage = Math.min(totalPages, startPage + pageLimit - 1);

    if (endPage - startPage < pageLimit - 1) {
      startPage = Math.max(1, endPage - pageLimit + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? 'active' : ''}`}
        >
          <button
            className="page-link"
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <nav className="mt-3">
      <ul className="pagination justify-content-center">
        {currentPage > 1 && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Anterior
            </button>
          </li>
        )}

        {renderPagination()}

        {currentPage < totalPages && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Próximo
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
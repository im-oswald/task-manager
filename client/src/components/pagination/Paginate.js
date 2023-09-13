import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

/**
 * Paginate
 *
 * @param {Integer}    totalRecords
 * @param {Function}   handlePageChange
 */
const Paginate = ({ handlePageChange, totalRecords }) => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(totalRecords);

  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / 10));
  }, [totalRecords]);

  useEffect(() => {
    // handle page changes
    setSearchParams((params) => {
      params.set("page", currentPage);
      return params;
    });

    handlePageChange(parseInt(currentPage));
  }, [currentPage, handlePageChange, setSearchParams]);

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
        </li>

        {
          Array.from({ length: totalPages }, (_, index) =>  index + 1).map((page) => (
            <li
              key={page}
              className={`page-item ${page === currentPage ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          ))
        }

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

Paginate.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired
};

export default Paginate;

import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({
  itemsCount,
  itemsPerPage,
  onPageChange,
  currentPage
}) => {
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1); //lodash method creates array

  // variant without lodash
  /* const pages = [];
  for (let page = 1; page <= pagesCount; page++) {
    pages.push(page);
  } */

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <span onClick={() => onPageChange(page)} className="page-link">
              {page}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};
export default Pagination;

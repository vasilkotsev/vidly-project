import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, itemsPerPage, onPageChange, currentPage } = props;
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1); //lodash method creates array

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              href={"#"}
              onClick={() => onPageChange(page)}
              className="page-link"
            >
              {page}
            </a>
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

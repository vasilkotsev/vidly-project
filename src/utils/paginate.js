import _ from "lodash";

export default function paginate(items, currentPage, itemsPerPage) {
  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedItems = _(items)
    .slice(startIndex)
    .take(itemsPerPage)
    .value();

  //variant without lodash
  /* const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage); */

  return paginatedItems;
}

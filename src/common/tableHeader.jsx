import React from "react";

// class TableHeader extends Component {
//   raiseSort(path) {
//     const sortColumn = { ...this.props.sortColumn };
//
//     if (sortColumn.path === path) {
//       sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
//     } else {
//       sortColumn.path = path;
//       sortColumn.order = "asc";
//     }
//
//     this.props.onSort(sortColumn);
//   }
//
//   renderSort = column => {
//     const { sortColumn } = this.props;
//
//     if (sortColumn.path !== column.path) return null;
//     if (sortColumn.order === "asc")
//       return <i className="fa fa-sort-asc pl-1" />;
//     return <i className="fa fa-sort-desc pl-1" />;
//   };
//
//   render() {
//     return (
//       <thead>
//         <tr>
//           {this.props.columns.map(column => (
//             <th
//               className="clickable"
//               key={column.path || column.key}
//               onClick={() => this.raiseSort(column.path)}
//             >
//               {column.label}
//               {this.renderSort(column)}
//             </th>
//           ))}
//         </tr>
//       </thead>
//     );
//   }
// }

const TableHeader = ({ sortColumn, columns, onSort }) => {
  const raiseSort = path => {
    sortColumn = { ...sortColumn };

    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    onSort(sortColumn);
  };

  const renderSortIcon = column => {
    if (sortColumn.path !== column.path) return null;
    if (sortColumn.order === "asc")
      return <i className="fa fa-sort-asc pl-1" />;
    return <i className="fa fa-sort-desc pl-1" />;
  };

  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label}
            {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

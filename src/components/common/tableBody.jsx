import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }
    return _.get(item, column.path); // Lodash method to get dynamic nested object values
  };

  createKey = (item, column) => {
    return item[this.props.valueProperty] + (column.path || column.key);
  };

  render() {
    const { data, columns, valueProperty } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item[valueProperty]}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
                {/*{_.get(item, column.path) || column.content(item)}*/}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.defaultProps = {
  valueProperty: "_id"
};
export default TableBody;

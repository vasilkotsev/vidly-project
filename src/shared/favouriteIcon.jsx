import React from "react";

const FavouriteIcon = props => {
  const { onClick, isFavourite } = props;

  function getIconClasses() {
    let classes = "fa fa-heart";
    classes += isFavourite ? "" : "-o";
    return classes;
  }

  return (
    <i onClick={onClick} className={getIconClasses()} aria-hidden="true" />
  );
};

export default FavouriteIcon;

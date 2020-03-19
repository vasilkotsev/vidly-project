import React from "react";

const FavouriteIcon = props => {
  function getIconClasses() {
    let classes = "fa fa-";
    classes += props.isFavourite ? "heart" : "heart-o";
    return classes;
  }

  return (
    <i
      //onClick={() => props.onClick(props.movie)}
      onClick={props.onClick}
      className={getIconClasses()}
      aria-hidden="true"
    />
  );
};

export default FavouriteIcon;

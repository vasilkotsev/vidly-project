import React from "react";

const FavouriteIcon = props => {
  function getIconClasses() {
    let classes = "fa fa-";
    classes += props.isFavourite ? "heart" : "heart-o";
    return classes;
  }

  return (
    <i
      onClick={() => props.onFavourite(props.movie)}
      //onClick={props.onFavourite}
      className={getIconClasses()}
      aria-hidden="true"
    />
  );
};

export default FavouriteIcon;

import React from "react";

const FavouriteIcon = ({ onClick, isFavourite }) => {
  return (
    <i
      onClick={onClick}
      className={isFavourite ? "fa fa-heart" : "fa fa-heart-o"}
      aria-hidden="true"
    />
  );
};

export default FavouriteIcon;

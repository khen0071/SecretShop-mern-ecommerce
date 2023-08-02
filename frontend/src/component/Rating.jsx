// eslint-disable-next-line react/prop-types
const Rating = ({ value }) => {
  return (
    <div className="">
      <span className="text-yellow">
        {value >= 1 ? (
          <i className="fa-solid fa-star"></i>
        ) : value >= 0.5 ? (
          <i className="fa-solid fa-star-half-stroke"></i>
        ) : (
          <i className="fa-regular fa-star"></i>
        )}
      </span>

      <span className="text-yellow">
        {value >= 2 ? (
          <i className="fa-solid fa-star"></i>
        ) : value >= 1.5 ? (
          <i className="fa-solid fa-star-half-stroke"></i>
        ) : (
          <i className="fa-regular fa-star"></i>
        )}
      </span>

      <span className="text-yellow">
        {value >= 3 ? (
          <i className="fa-solid fa-star"></i>
        ) : value >= 2.5 ? (
          <i className="fa-solid fa-star-half-stroke"></i>
        ) : (
          <i className="fa-regular fa-star"></i>
        )}
      </span>

      <span className="text-yellow">
        {value >= 4 ? (
          <i className="fa-solid fa-star"></i>
        ) : value >= 3.5 ? (
          <i className="fa-solid fa-star-half-stroke"></i>
        ) : (
          <i className="fa-regular fa-star"></i>
        )}
      </span>

      <span className="text-yellow">
        {value >= 5 ? (
          <i className="fa-solid fa-star"></i>
        ) : value >= 4.5 ? (
          <i className="fa-solid fa-star-half-stroke"></i>
        ) : (
          <i className="fa-regular fa-star"></i>
        )}
      </span>
    </div>
  );
};

export default Rating;

/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Rating from "../Rating";
const CardComponent = ({ product }) => {
  const {
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
    rating,
    numReviews,
  } = product;

  return (
    <>
      <Link to={`/product/${product._id}`}>
        <div className="cardContainer">
          <div className=" w-auto h-auto mb-3 flex flex-col justify-center items-center">
            <img src={image} alt="image" className="imageContainer" />
          </div>
          <div className="">
            <div className="flex justify-between py-3">
              <div className="font-bold space-x-1 text-gray flex">
                <span className="text-[14px] self-start">Price: </span>
                <p className="text-[18px] text-emeraldGreen">
                  ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </div>

              {countInStock === 0 ? (
                <span className="text-red font-semibold">
                  No Stock Available
                </span>
              ) : (
                <div className="flex space-x-1">
                  <span className="font-semibold text-gray text-[14px] self-start">
                    Stock:
                  </span>
                  <strong className="text-emeraldGreen text-[18px]">
                    {" "}
                    {countInStock}
                  </strong>
                  <span className="text-gray font-bold text-[12px] self-end">
                    Available
                  </span>
                </div>
              )}
            </div>
            <h1 className="cardEllipsis text-[18px] text-black font-bold text-center pb-3">
              {name}
            </h1>
            {/* <p className="font-semibold text-gray">Description:</p>
            <p className="text-black">{description.slice(0, 130)}...</p> */}

            <div className="flex space-x-2 justify-center items-center pt-3">
              {product.numReviews === 0 ? (
                <p className="text-[14px] text-red font-semibold">
                  No reviews yet
                </p>
              ) : (
                <div className="flex space-x-1">
                  <Rating value={product.rating} />
                  <p className="font-semibold text-gray text-[14px] ">
                    {product.numReviews} Reviews
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CardComponent;

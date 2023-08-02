import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "../component/Rating";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../component/shared/Spinner";
import { addToCart } from "../slices/cartSlice";
import Reveal from "../component/shared/Reveal";
import RevealScale from "../component/shared/RevealScale";
import { toast } from "react-toastify";

const ProductScreen = () => {
  // const [product, setProduct] = useState({});
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review Submitted");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  // const product = products.find((p) => p._id == productId);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/products/${productId}`);
  //       setProduct(data);
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //   };

  //   fetchProduct();
  // }, [productId]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div className="productError">
          {error?.data?.message || error.error}
        </div>
      ) : (
        <>
          <div className="productContainer">
            <div className="productContent">
              <div className="w-full">
                <RevealScale>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="productImage"
                  />
                </RevealScale>
              </div>

              <div className="productRightSection">
                <Reveal>
                  <h1 className="text-[24px] font-bold">
                    {product.name}
                    <span className="italic font-semibold text-[18px] text-blue">
                      {" "}
                      ({product.brand})
                    </span>
                  </h1>
                </Reveal>

                <Reveal>
                  <p className=" text-[14px] md:text-[16px]">
                    - {product.description}
                  </p>
                </Reveal>

                <div className="flex space-x-2 justify-center items-center pt-3 md:justify-start">
                  {product.numReviews === 0 ? (
                    <Reveal>
                      <p className="text-[14px] text-red font-semibold mb-2">
                        No Reviews Yet
                      </p>
                    </Reveal>
                  ) : (
                    <div className="flex space-x-1 mb-2">
                      <Reveal>
                        <Rating value={product.rating} />
                      </Reveal>
                      <Reveal>
                        <p className="font-semibold text-gray text-[14px] ">
                          {product.numReviews}{" "}
                          {product.numReviews === 1 ? "Review" : "Reviews"}
                        </p>
                      </Reveal>
                    </div>
                  )}
                </div>

                <div className="w-full flex justify-between py-2">
                  <div className="flex space-x-1">
                    <Reveal>
                      <p className="text-[14px] text-gray font-bold">Price:</p>
                    </Reveal>
                    <Reveal>
                      <p className="text-[22px] text-emeraldGreen font-semibold">
                        ${product.price}
                        {/* .toString()
                     .replace(/\B(?=(\d{3})+(?!\d))/g, ",") */}
                      </p>
                    </Reveal>
                  </div>
                  <div className="flex space-x-1">
                    {product.countInStock === 0 ? (
                      <Reveal>
                        <span className="text-red font-semibold text-[14px]">
                          No Stock Available
                        </span>
                      </Reveal>
                    ) : (
                      <Reveal>
                        <div className="flex space-x-1">
                          <span className="font-bold text-gray text-[14px] self-start">
                            Stock:
                          </span>

                          <strong className="text-emeraldGreen text-[22px]">
                            {" "}
                            {product.countInStock}
                          </strong>

                          <span className="text-gray font-bold text-[14px] self-end">
                            Available
                          </span>
                        </div>
                      </Reveal>
                    )}
                  </div>
                </div>

                <div className="w-full flex justify-between items-center">
                  {product.countInStock > 0 && (
                    <div className="py-3 flex justify-center items-center space-x-1 md:justify-start">
                      <Reveal>
                        <div className="font-semibold">Quantity:</div>
                      </Reveal>
                      <div>
                        <form>
                          <Reveal>
                            <select
                              type="select"
                              value={qty}
                              onChange={(e) => setQty(Number(e.target.value))}
                              className=" border-2 border-gray px-3 py-1 "
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </Reveal>
                        </form>
                      </div>
                    </div>
                  )}

                  {product.countInStock === 0 ? (
                    <Reveal>
                      <button
                        className="buttonContainerDisabled"
                        type="button"
                        disabled
                      >
                        Out Of Stock
                      </button>
                    </Reveal>
                  ) : (
                    <Reveal>
                      <button
                        className="buttonContainer text-[12px] md:text-[16px]"
                        type="button"
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </button>
                    </Reveal>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-[20px] border-t mt-10">
              <div className="flex space-x-0 space-y-10 flex-col justify-between lg:flex-row  md:space-y-0 md:space-x-10">
                <div className="w-full">
                  <h1 className="text-center text-[16px] font-bold uppercase pb-3 md:text-[20px]">
                    Reviews
                  </h1>
                  {product.reviews.length === 0 ? (
                    <p className="text-red font-semibold text-center border p-2 uppercase">
                      No Reviews Yet
                    </p>
                  ) : (
                    <div className="">
                      {product.reviews.map((review) => (
                        <div
                          key={review._id}
                          className="border-2 border-lighterGray p-3 space-y-0 mb-2 md:space-y-1"
                        >
                          <div className="flex justify-between pb-1 mb-1">
                            <p className="capitalize font-semibold md:text-[16px] text-[14px]">
                              {review.name}
                            </p>
                            <p className="text-green font-semibold md:text-[16px] text-[14px]">
                              {review.createdAt.substring(0, 10)}
                            </p>
                          </div>
                          <p className="md:text-[16px] text-[14px] pb-2">
                            - {review.comment}
                          </p>
                          <Rating value={review.rating} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <h1 className="text-center text-[16px] font-bold uppercase pb-3 md:text-[20px]">
                    Write A Product Review
                  </h1>
                  {loadingProductReview && <Spinner />}

                  {userInfo ? (
                    <div>
                      <form onSubmit={submitHandler}>
                        <div className="flex flex-col py-1">
                          <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                            Rating
                          </label>
                          <select
                            className="p-2 border border-lightGray"
                            type="select"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                          >
                            <option value="5">5 - Excellent</option>{" "}
                            <option value="4">4 - Very Good</option>
                            <option value="3">3 - Good</option>
                            <option value="2">2 - Fair</option>
                            <option value="1">1 - Poor</option>
                          </select>
                        </div>
                        <div className="flex flex-col py-1">
                          <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                            Comment
                          </label>
                          <textarea
                            className="p-2 border border-lightGray"
                            type="textarea"
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>

                        <button
                          disabled={loadingProductReview}
                          type="submit"
                          className="buttonContainer text-[12px] md:text-[16px] mt-2"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold py-3 italic">
                        Please{" "}
                        <span className="text-blue">
                          <Link to="/login">Login</Link>
                        </span>{" "}
                        to write a review.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;

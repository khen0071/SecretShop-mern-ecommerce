import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import CheckoutSteps from "../component/CheckoutSteps";
import { toast } from "react-toastify";
import Spinner from "../component/shared/Spinner";
import RevealScale from "../component/shared/RevealScale";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <RevealScale>
        <div className="placeOrderContainer">
          <CheckoutSteps step1 step2 step3 step4 />
          <div className="placeOrderContent">
            <p className="placeOrderHeader">Order Details</p>

            <div className="flex flex-col justify-between items-start lg:flex-row">
              <div className="orderSection1">
                <div className="">
                  {cart.cartItems.length === 0 ? (
                    <div className="text-red font-bold">Cart is Empty</div>
                  ) : (
                    <div>
                      {cart.cartItems.map((item, index) => (
                        <div key={index} className="cartSection1Content">
                          <div>
                            <img
                              src={item.image}
                              alt="image"
                              className="cartImage"
                            />
                          </div>

                          <div className="cartName">
                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                          </div>

                          <div className="flex md:w-1/3 justify-between items-center md:space-x-10 space-x-3">
                            <div className="flex-1">
                              <p className="text-lightGray font-semibold text-[14px]">
                                $
                                {item.price
                                  .toFixed(2)
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                                ({item.qty})
                              </p>

                              <p className="text-emeraldGreen font-bold">
                                $
                                {(item.price * item.qty)
                                  .toFixed(2)
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <p></p>
                </div>
              </div>

              <div className="orderSection2">
                <div className="orderSection2Header">
                  <p className="font-bold">Shipping Address: </p>
                  <span className="font-semibold text-blue">
                    {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                    {cart.shippingAddress.postalCode}{" "}
                    {cart.shippingAddress.country}
                  </span>
                </div>

                <div className="orderSection2Header">
                  <p className="font-bold">Payment Method: </p>
                  <span className="font-semibold text-blue">
                    {cart.paymentMethod}
                  </span>
                </div>

                <div className="pt-4 mt-4 border-t border-lightGray">
                  <h1 className="font-bold text-center">Order Summary: </h1>
                </div>

                <div className="orderSection2Header2">
                  <p className="font-semibold">Items:</p>
                  <p className="font-bold text-lightGray">
                    ${addDecimals(Number(cart.itemsPrice))}
                  </p>
                </div>

                <div className="orderSection2Header2">
                  <p className="font-semibold">Shipping:</p>
                  <p className="font-bold text-lightGray">
                    ${cart.shippingPrice}
                  </p>
                </div>

                <div className="orderSection2Header2">
                  <p className="font-semibold">Tax:</p>
                  <p className="font-bold text-lightGray">
                    ${addDecimals(Number(cart.taxPrice))}
                  </p>
                </div>

                <div className="orderSection2Total">
                  <p className="font-semibold">Total:</p>
                  <p className="font-bold text-emeraldGreen">
                    ${addDecimals(Number(cart.totalPrice))}
                  </p>
                </div>

                <div className="text-center text-red font-semibold text-[14px] md:text-[16px]">
                  {error && <p>{error}</p>}
                </div>

                <div className="flex justify-center items-center py-4 my-4 ">
                  {cart.cartItems.length === 0 ? (
                    <button className="orderButton" type="button">
                      Cart Is Empty
                    </button>
                  ) : (
                    <button
                      className="buttonContainer md:text-[16px] text-[12px]"
                      type="button"
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </button>
                  )}
                </div>

                {isLoading && <Spinner />}
              </div>
            </div>
          </div>
        </div>
      </RevealScale>
    </>
  );
};

export default PlaceOrderScreen;

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import RevealScale from "../component/shared/RevealScale";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <RevealScale>
        <div className="cartContainer">
          <h1 className="cartH1">Shopping Cart</h1>

          <div className="cartContent">
            <div className="cartSection2">
              <div className="cartSection2Content">
                <div className="flex md:space-x-1 flex-col md:flex-row">
                  <p className="text-[14px] font-semibold">
                    Number of Items: {""}
                  </p>
                  <p className="text-[20px] text-emeraldGreen font-bold">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </p>
                </div>

                <div className="flex md:space-x-1 flex-col md:flex-row">
                  <p className="text-[14px] font-semibold">Subtotal: </p>
                  <p className="text-[20px] text-emeraldGreen font-bold">
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>

                <div className="flex justify-center">
                  {cartItems.length === 0 ? (
                    <button
                      className="font-semibold bg-gray text-white py-2 px-4 border-2 border-white hover:border-2 hover:border-gray  hover:text-white cursor-default ease-in-out duration-500 md:text-[16px] text-[12px] uppercase"
                      type="button"
                    >
                      Cart Is Empty
                    </button>
                  ) : (
                    <button
                      className="buttonContainer md:text-[16px] text-[12px]"
                      type="button"
                      onClick={checkoutHandler}
                    >
                      Proceed To Checkout
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="cartSection1">
              {cartItems.length === 0 ? (
                <>
                  <div className="cartEmpty">
                    <div className="font-semibold md:text-[16px] text-[14px]">
                      Your Cart Is Empty.
                    </div>

                    <Link to="/">
                      <div className="buttonContainer text-center md:text-[16px] text-[14px]">
                        Search Items
                      </div>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    {cartItems.map((item, index) => (
                      <>
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

                          <div className="cartDetails">
                            <div className="flex-1">
                              <form className="flex space-x-2 items-center">
                                <label className="text-[12px]">Qty:</label>
                                <select
                                  type="select"
                                  value={item.qty}
                                  onChange={(e) =>
                                    addToCartHandler(
                                      item,
                                      Number(e.target.value)
                                    )
                                  }
                                  className=" border-2 border-gray px-3 py-1 "
                                >
                                  {[...Array(item.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </select>
                              </form>
                            </div>

                            <div className="flex items-center space-x-2">
                              <div className="text-[12px]">Subtotal:</div>
                              <div className="text-emeraldGreen font-bold">
                                $
                                {(item.price * item.qty)
                                  .toFixed(2)
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </div>
                            </div>

                            <div
                              className="flex-1"
                              onClick={() => removeFromCartHandler(item._id)}
                            >
                              <i className="fa-solid fa-trash cursor-pointer text-red text-[20px] "></i>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </>
              )}
            </div>
            {/* <div className="cartSection2">
              <div className="cartSection2Content">
                <div className="flex md:space-x-1 flex-col md:flex-row">
                  <p className="text-[14px] font-semibold">
                    Number of Items: {""}
                  </p>
                  <p className="text-[20px] text-emeraldGreen font-bold">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </p>
                </div>
                <div className="flex md:space-x-1 flex-col md:flex-row">
                  <p className="text-[14px] font-semibold">Subtotal: </p>
                  <p className="text-[20px] text-emeraldGreen font-bold">
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                {cartItems.length === 0 ? null : (
                  <button
                    className="buttonContainer md:text-[16px] text-[12px]"
                    type="button"
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>
                )}
              </div>
            </div> */}
          </div>
        </div>
      </RevealScale>
    </>
  );
};

export default CartScreen;

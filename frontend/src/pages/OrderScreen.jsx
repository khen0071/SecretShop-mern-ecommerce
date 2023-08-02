import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../component/shared/Spinner";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import RevealScale from "../component/shared/RevealScale";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  //Paypal
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment Successful");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  //Paypal Button Test
  // async function onApproveTest() {
  //   await payOrder({ orderId, details: { payer: {} } });
  //   refetch();
  //   toast.success("Payment Successful");
  // }

  function onError(error) {
    toast.error(error.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  //Deliver Handler
  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order Delivered");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return isLoading ? (
    <Spinner />
  ) : error ? (
    <p className="text-red text-center my-1">{error}</p>
  ) : (
    <>
      <RevealScale>
        <div className="orderScreenContainer">
          <div className="orderScreenContent md:space-x-10">
            <div className="lg:w-2/3">
              <div className="">
                <h1 className="font-bold text-center text-[20px] uppercase">
                  Customer Info
                </h1>
              </div>

              <div className="orderSection2Header">
                <p className="font-bold">Name: </p>
                <span className="font-semibold text-blue capitalize">
                  {order.user.name}
                </span>
              </div>

              <div className="orderSection2Header">
                <p className="font-bold">Email: </p>
                <span className="font-semibold text-blue">
                  {order.user.email}
                </span>
              </div>

              <div className="orderSection2Header">
                <p className="font-bold">Address: </p>
                <span className="font-semibold text-blue">
                  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode}{" "}
                  {order.shippingAddress.country}
                </span>
              </div>

              <div className="orderSection2Header">
                <p className="font-bold">Payment Method: </p>
                <span className="font-semibold text-blue">
                  {order.paymentMethod}
                </span>
              </div>

              <div className="orderSection2Header">
                <p className="font-bold">
                  Order Number:
                  <span className="font-semibold text-blue"> {order._id}</span>
                </p>
              </div>

              <div className="space-y-2">
                <div className="pt-4 mt-4 border-t border-[#bdbdbd]">
                  <h1 className="font-bold text-center text-[20px] uppercase">
                    Order Summary{" "}
                  </h1>
                </div>

                <div className="orderSection2Header2">
                  <p className="font-semibold">Items:</p>
                  <p className="font-bold text-lightGray">
                    ${addDecimals(Number(order.itemsPrice))}
                  </p>
                </div>

                <div className="orderSection2Header2">
                  <p className="font-semibold">Shipping:</p>
                  <p className="font-bold text-lightGray">
                    ${order.shippingPrice}
                  </p>
                </div>

                <div className="orderSection2Header2">
                  <p className="font-semibold">Tax:</p>
                  <p className="font-bold text-lightGray">
                    ${addDecimals(Number(order.taxPrice))}
                  </p>
                </div>
              </div>

              <div className="orderSection2Total">
                <p className="font-semibold">Total:</p>
                <p className="font-bold text-emeraldGreen">
                  ${addDecimals(Number(order.totalPrice))}
                </p>
              </div>

              <div className="space-y-2 mb-10 md:mb-0">
                <div className="orderSection2Header2 text-[12px] md:text-[16px]">
                  <p className="font-bold">Payment Status: </p>
                  {order.isPaid ? (
                    <div className="text-emeraldGreen font-bold">
                      Paid: {order.paidAt.substring(0, 10)}
                    </div>
                  ) : (
                    <div className="text-red font-semibold"> Not Yet Paid</div>
                  )}
                </div>

                <div className="orderSection2Header2 text-[12px] md:text-[16px]">
                  <p className="font-bold">Shipping Status: </p>
                  {order.isDelivered ? (
                    <div className="text-emeraldGreen font-bold">
                      Delivered: {order.deliveredAt.substring(0, 10)}
                    </div>
                  ) : (
                    <div className="text-red font-semibold">
                      {" "}
                      Not Yet Delivered
                    </div>
                  )}
                </div>

                {!order.isPaid && (
                  <div>
                    {loadingPay && <Spinner />}

                    {isPending ? (
                      <Spinner />
                    ) : (
                      <>
                        {/* <div>
                        <button onClick={onApproveTest}>Test Pay Order</button>
                      </div> */}
                        <div>
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          ></PayPalButtons>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {loadingDeliver && <Spinner />}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <div>
                      <button
                        className="font-semibold bg-blue text-white py-2 px-4 border-2 border-white hover:border-2 hover:border-gray  hover:text-black ease-in-out duration-500 w-full my-2 text-[14px] md:text-[16px]"
                        onClick={deliverOrderHandler}
                      >
                        Mark As Delivered
                      </button>
                    </div>
                  )}
              </div>
            </div>

            <div className="w-full">
              <div>
                {order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="md:border-b mb-4 border-[#bdbdbd]"
                  >
                    <div key={index} className="cartSection1Content">
                      <div>
                        <img
                          src={item.image}
                          alt="image"
                          className="md:flex-auto md:w-40 border-2 p-1 border-[#bdbdbd]"
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RevealScale>
    </>
  );
};

export default OrderScreen;

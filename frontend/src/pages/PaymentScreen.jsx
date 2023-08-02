import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";
import CheckoutSteps from "../component/CheckoutSteps";
import RevealScale from "../component/shared/RevealScale";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <>
      <RevealScale>
        <div className="formContainer">
          <CheckoutSteps step1 step2 step3 />
          <div className="paymentContent">
            <p className="paymentHeader">Payment Details</p>

            <form onSubmit={submitHandler}>
              <div className="flex space-x-3 py-3 items-center">
                <input
                  type="radio"
                  id="Paypal"
                  name="paymentMethod"
                  value="PayPal"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                  Paypal Or Credit Card
                </label>
              </div>

              <div className="flex justify-center items-center">
                <button className="buttonContainer  text-[12px] md:text-[16px] w-[150px] mt-3">
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </RevealScale>
    </>
  );
};

export default PaymentScreen;

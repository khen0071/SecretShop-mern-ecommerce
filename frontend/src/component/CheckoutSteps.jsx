import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <>
      <div className="checkoutContainer">
        <div className="text-blue font-bold">
          {step1 ? (
            <Link to="/login">
              <div className="flex items-center justify-center space-x-1">
                <p className="text-[12px] md:text-[16px]">Sign In</p>
                <i className="fa-solid fa-circle-chevron-right text-[16px] md:text-[20px]"></i>
              </div>
            </Link>
          ) : (
            <div className="text-lightGray font-semibold text-[12px] md:text-[16px]">
              <Link disabled>Sign In</Link>
            </div>
          )}
        </div>

        <div className="text-blue font-bold">
          {step2 ? (
            <Link to="/shipping">
              <div className="flex items-center justify-center space-x-1">
                <p className="text-[12px] md:text-[16px]">Shipping</p>
                <i className="fa-solid fa-circle-chevron-right text-[16px] md:text-[20px]"></i>
              </div>
            </Link>
          ) : (
            <div className="text-lightGray font-semibold text-[12px] md:text-[16px]">
              <Link disabled>Shipping</Link>
            </div>
          )}
        </div>

        <div className="text-blue font-bold">
          {step3 ? (
            <Link to="/payment">
              <div className="flex items-center justify-center space-x-1">
                <p className="text-[12px] md:text-[16px]">Payment</p>
                <i className="fa-solid fa-circle-chevron-right text-[16px] md:text-[20px]"></i>
              </div>
            </Link>
          ) : (
            <div className="text-lightGray font-semibold text-[12px] md:text-[16px]">
              <Link disabled>Payment</Link>
            </div>
          )}
        </div>

        <div className="text-blue font-bold">
          {step4 ? (
            <Link to="/placeorder">
              <div className="flex items-center justify-center space-x-1">
                <p className="text-[12px] md:text-[16px]">Place Order</p>
                <i className="fa-solid fa-circle-chevron-right text-[16px] md:text-[20px]"></i>
              </div>
            </Link>
          ) : (
            <div className="text-lightGray font-semibold text-[12px] md:text-[16px]">
              <Link disabled>Place Order</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutSteps;

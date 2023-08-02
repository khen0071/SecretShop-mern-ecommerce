import { Link } from "react-router-dom";
import Spinner from "../../component/shared/Spinner";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import RevealScale from "../../component/shared/RevealScale";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <RevealScale>
        <div className="orderListScreenContainer">
          <div>
            <p className="text-center text-[18px] font-bold uppercase md:text-[24px] pb-5">
              Order List
            </p>
            {isLoading ? (
              <Spinner />
            ) : error ? (
              <p className="text-center text-red font-semibold">{error}</p>
            ) : (
              <table className="table-auto w-full border text-center bg-lightWhite">
                <thead className="border-b">
                  <tr className="text-[8px] md:text-[16px]">
                    <th className="py-3 md:py-6">ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="text-[8px] md:text-[14px] font-semibold">
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="py-4 text-blue">{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td className="text-emeraldGreen">
                        $
                        {order.totalPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </td>
                      {order.isPaid ? (
                        <td>{order.paidAt.substring(0, 10)}</td>
                      ) : (
                        <td>
                          <i className="fa-solid fa-circle-xmark text-red font-semibold text-[8px] md:text-[16px]"></i>
                        </td>
                      )}

                      {order.isDelivered ? (
                        <td>{order.deliveredAt.substring(0, 10)}</td>
                      ) : (
                        <td>
                          <i className="fa-solid fa-circle-xmark text-red font-semibold text-[8px] md:text-[16px]"></i>
                        </td>
                      )}

                      <td className="px-[5px]">
                        <Link to={`/order/${order._id}`}>
                          <button className="orderScreenDeliverButton uppercase">
                            Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </RevealScale>
    </>
  );
};

export default OrderListScreen;

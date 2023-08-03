import { Link, useParams } from "react-router-dom";
import Spinner from "../../component/shared/Spinner";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
import Paginate from "../../component/Paginate";
import RevealScale from "../../component/shared/RevealScale";

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success("Product Deleted");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Create New Product?")) {
      try {
        await createProduct();
        refetch();
        toast.success("Product Created, Please edit Sample Product");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <RevealScale>
        <div className="productListScreenContainer">
          <div>
            <div className="flex justify-between items-center pb-5">
              <p className=" text-[18px] font-bold uppercase md:text-[24px]">
                Product List
              </p>
              <p
                onClick={createProductHandler}
                className="productScreenAddButton bg-black text-white uppercase"
              >
                Add Product
              </p>
            </div>

            {loadingCreate && <Spinner />}
            {loadingDelete && <Spinner />}

            {isLoading ? (
              <Spinner />
            ) : error ? (
              <p className="text-center text-red font-semibold">{error}</p>
            ) : (
              <>
                <table className="table-auto w-full border text-center bg-lightWhite">
                  <thead className="border-b">
                    <tr className="text-[10px] md:text-[16px]">
                      <th className="py-3 md:py-6">NAME</th>
                      <th>PRICE</th>
                      <th>CATEGORY</th>
                      <th>BRAND</th>
                      <th>STOCK</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="text-[10px] md:text-[14px] font-semibold">
                    {data.products.map((product) => (
                      <tr key={product._id} className="border-b">
                        <td className="py-4 px-[3px] capitalize">
                          {product.name}
                        </td>
                        <td className="px-[3px] text-emeraldGreen">
                          $
                          {product.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </td>
                        <td className="px-[3px] capitalize">
                          {product.category}
                        </td>
                        <td className="px-[3px] capitalize">{product.brand}</td>

                        {product.countInStock > 0 ? (
                          <td className="px-[3px]">{product.countInStock}</td>
                        ) : (
                          <td className="text-red px-[3px]">
                            {product.countInStock}
                          </td>
                        )}

                        <td className="px-[1x]">
                          <Link to={`/admin/product/${product._id}/edit`}>
                            <button className="productScreenAddButton bg-green text-white">
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                          </Link>
                        </td>

                        <td
                          className="px-[3px]"
                          onClick={() => deleteHandler(product._id)}
                        >
                          <button className="productScreenAddButton bg-red text-white">
                            <i className="fa-solid fa-trash "></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pt-5">
                  <Paginate
                    pages={data.pages}
                    page={data.page}
                    isAdmin={true}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </RevealScale>
    </>
  );
};

export default ProductListScreen;

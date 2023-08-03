import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import Spinner from "../../component/shared/Spinner";
import { toast } from "react-toastify";
import RevealScale from "../../component/shared/RevealScale";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage] = useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    const result = await updateProduct(updatedProduct);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product updated");
      navigate("/admin/productlist");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <RevealScale>
        <Link to="/admin/productlist">
          <div className="flex justify-center items-center">
            <p className="buttonContainer text-[14px] md:text-[16px] m-3 w- text-center uppercase">
              Back To Product List
            </p>
          </div>
        </Link>
        <div className="updateProductContainer">
          <div className="bg-lightWhite border-2 border-lighterGray p-10 rounded-lg;">
            <div>
              <p className="text-center text-[18px]  font-bold uppercase pb-3 border-b mb-3 md:text-[24px]">
                Edit Product
              </p>
              {loadingUpdate && <Spinner />}

              {isLoading ? (
                <Spinner />
              ) : error ? (
                <p className="text-red text-center">{error}</p>
              ) : (
                <div>
                  <form
                    onSubmit={submitHandler}
                    className="flex flex-col space-x-0 md:flex-row md:space-x-6 "
                  >
                    <div className="md:w-[300px]">
                      <div className="flex flex-col py-3">
                        <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                          Name
                        </label>
                        <input
                          className="p-2 border border-lightGray"
                          type="text"
                          value={name}
                          required
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col py-3">
                        <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                          Description
                        </label>
                        <textarea
                          className="p-2 border border-lightGray"
                          type="textarea"
                          rows={6}
                          value={description}
                          required
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col py-3">
                        <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                          Image
                        </label>
                        <input
                          className="p-2 border border-lightGray"
                          type="text"
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                        />
                        <input
                          className="p-2 border border-lightGray"
                          type="file"
                          onChange={uploadFileHandler}
                        />
                      </div>
                    </div>

                    <div className="md:w-[300px]">
                      <div className="flex flex-col py-3">
                        <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                          Brand
                        </label>
                        <input
                          className="p-2 border border-lightGray"
                          type="text"
                          value={brand}
                          required
                          onChange={(e) => setBrand(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col py-3">
                        <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                          Category
                        </label>
                        <input
                          className="p-2 border border-lightGray"
                          type="text"
                          value={category}
                          required
                          onChange={(e) => setCategory(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col py-3">
                        <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                          Price
                        </label>
                        <input
                          className="p-2 border border-lightGray"
                          type="number"
                          value={price}
                          required
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col py-3">
                        <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                          Stock
                        </label>
                        <input
                          className="p-2 border border-lightGray"
                          type="number"
                          value={countInStock}
                          required
                          onChange={(e) => setCountInStock(e.target.value)}
                        />
                      </div>
                      <button
                        className="buttonContainer bg-black w-full"
                        type="submit"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </RevealScale>
    </>
  );
};

export default ProductEditScreen;

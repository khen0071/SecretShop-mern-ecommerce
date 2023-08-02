import { useParams } from "react-router-dom";
import CardComponent from "./shared/CardComponent";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Spinner from "./shared/Spinner";
import RevealScale from "./shared/RevealScale";
import Paginate from "./Paginate";
import SearchBox from "./SearchBox";

const Featured = () => {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(null);
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  //Fetch From mongo DB via Axios
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const { data } = await axios.get("/api/products");

  //       setProducts(data);
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <>
      <div className="featuredContainer">
        <RevealScale>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-center text-[18px] md:text-[30px] font-bold uppercase">
              Latest Products
            </h1>

            <p className="text-center pb-4 max-w-[500px] m-auto font-semibold text-gray text-[14px] md:text-[16px]">
              We bring you a world of convenience and excitement with our wide
              selection of products & competitive prices.
            </p>

            <SearchBox />
          </div>
        </RevealScale>

        {isLoading ? (
          <Spinner />
        ) : error ? (
          <div className="text-center py-2 text-red text-[18px] font-bold">
            {error?.data?.message || error.error}
          </div>
        ) : (
          <>
            <div className="lg:hidden">
              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword ? keyword : ""}
              />
            </div>
            <div className="featuredCardContainer">
              {data.products?.map((product) => (
                <div key={product._id}>
                  <RevealScale>
                    <CardComponent product={product} />
                  </RevealScale>
                </div>
              ))}
            </div>
            <div className="pt-5 hidden lg:block">
              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword ? keyword : ""}
              />
            </div>
          </>
        )}

        {/* 
        {isLoading ? (
          <Spinner />
        ) : products && products.length > 0 ? (
          <div className="featuredCardContainer">
            <>
              {products?.map((product) => (
                <div key={product._id}>
                  <RevealScale>
                    <CardComponent product={product} />
                  </RevealScale>
                </div>
              ))}
            </>
          </div>
        ) : (
          <p className="text-center text-white font-bold">
            There are no current products.
          </p>
        )} */}
      </div>
    </>
  );
};

export default Featured;

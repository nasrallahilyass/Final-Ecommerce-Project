// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
import ProductCard from "../component/ProductCard/ProductCard";
import styles from "../styles/styles";
import Navbar from "../component/navbar.component";
import Footer from "../component/footer.component";
import Data from "../data/data";

const ProductsPage = () => {
//   const [searchParams] = useSearchParams();
//   const categoryData = searchParams.get("category");
//   const { allProducts } = useSelector((state) => state.products);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Assuming allProducts is fetched from the backend or Redux store
//     if (categoryData === null) {
//       setData(allProducts || []);
//     } else {
//       setData(allProducts ? allProducts.filter((i) => i.category === categoryData) : []);
//     }

//     window.scrollTo(0, 0);
//   }, [allProducts, categoryData]);

  return (
    <>
      <div>
        <Navbar />
        <br />
        <br />
        <div className={`${styles.section}`}>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {Data.map((product) => (
          <ProductCard key={product._id} data={product} />
        ))}
          </div>
          {Data.length === 0 ? (
            <h1 className="text-center w-full pb-[100px] text-[20px]">
              No products Found!
            </h1>
          ) : null}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProductsPage;

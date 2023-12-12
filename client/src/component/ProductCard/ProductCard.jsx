import { useState } from "react";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
// import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
// import { useEffect } from "react";

const ProductCard = ({ data }) => {
  // const { wishlist } = useSelector((state) => state.wishlist);
  // const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (wishlist && wishlist.find((i) => i._id === data._id)) {
  //     setClick(true);
  //   } else {
  //     setClick(false);
  //   }
  // }, [wishlist]);

  const removeFromWishlistHandler = () => {
    setClick(!click);
    // Dispatch remove from wishlist action
    // dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = () => {
    setClick(!click);
    // Dispatch add to wishlist action
    // dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    // const isItemExists = cart && cart.find((i) => i._id === id);
    // if (isItemExists) {
    //   // toast.error("Item already in cart!");
    // } else {
    //   if (data.stock < 1) {
    //     // toast.error("Product stock limited!");
    //   } else {
    //     const cartData = { ...data, qty: 1 };
    //     // Dispatch add to cart action
    //     // dispatch(addTocart(cartData));
    //     // toast.success("Item added to cart successfully!");
    //   }
    }
  // };

  return (
      <div className="w-full h-[370px] bg-zinc-100	 rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${data._id.toString()}`}>
          <img
            src={`${data.images[0].url}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/seller/preview/${data?.seller?._id}`}>
          <h5 className={`${styles.shop_name}`}>{data?.seller?.fname}</h5>
        </Link>
        <Link to={`/product/${data._id}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex">
            {/* Ratings component (replace with your implementation) */}
            {/* <Ratings rating={data.ratings} /> */}
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice} 
                DH
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice ? data.originalPrice + " DH" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.sold_out} sold
            </span>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={removeFromWishlistHandler}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={addToWishlistHandler}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
  );
};

export default ProductCard;

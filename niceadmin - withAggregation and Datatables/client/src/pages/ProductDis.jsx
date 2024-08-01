import React, { useState } from "react";
import { useAuth } from "../../store/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductItem from "./ProductItem";


const ProductDis = ({ selectedCategory }) => {
  const { getProduct, user,token ,authorizationToken} = useAuth();
  const navigate = useNavigate();

  // const addWishList = async (product) => {
  //   console.log("Wishlist", product._id);
  //   if (!user) {
  //     navigate("/login");
  //   }
  //   try {
  //     const response = await fetch(`http://localhost:3000/api/user/add-wishlist`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: authorizationToken
  //       },
  //       body: JSON.stringify({ product_id: product._id, user_id: user.result._id }),
  //     });
  //     console.log("Response of the AddWIshList  is ", response);

  //     if (response.ok) {
  //       toast.success("added wishlist success");
  //     }
  //   } catch (error) {
  //     console.log("Errror while adding wishlist", error);
  //   }
  // };

 
  

  return (
    <>
      <div className="tab-content" id="course-pills-tabContent">
        <div className="tab-pane fade show active" id="course-pills-tabs-1" role="tabpanel" aria-labelledby="course-pills-tab-1">
          <div className="row g-4">
            {getProduct.map((product) =>
            // console.log("Image path:", `localhost/uploads/${product.image}`),

              !selectedCategory || product.categories.includes(selectedCategory._id) ? (
               <ProductItem product={product}/>
              ) : null
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDis;


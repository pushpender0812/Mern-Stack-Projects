import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductItem = ({ product }) => {
  const { wishList,user,authorizationToken,setWishList } = useAuth();
    
    
const navigate = useNavigate()

  const [toggle, setToggle] = useState(false);
  // console.log(toggle,"Sdsad")

  const addWishList = async (product) => {
    
  
    try {


      const response = await fetch(`http://localhost:3000/api/user/add-wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken
        },
        body: JSON.stringify({ product_id: product._id, user_id: user.result._id }),
      });
      console.log("Response of the AddWIshList  is ", response);
      const res_data = await response.json()
      if (response.ok) {
        toast.success(" Product added wishlist success");
        setToggle(true)
      } else {
        toast.error(res_data.message)
      }

    } catch (error) {
      console.log("Errror while adding wishlist", error);
    }
  };

  const addToCart = async (product) => {
   
    if (!user) {
      navigate("/login");
    }
  
    try {
      const response = await fetch(`http://localhost:3000/api/user/addtocart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken
        },
        body: JSON.stringify({ product_id: product._id, user_id: user.result._id }),
      });
      console.log("Response of the cart  is ", response);
      const data = await response.json();
      if (response.ok) {
       
        toast.success(data.message);
       
      } else {
        toast.success( data.message)
      }

    } catch (error) {
      toast.error("Errror while adding To CArt", error);
    }
  };

  const setToggleWishlist = () => {
    const isInWishlist = wishList.find(
      (wishlistItem) =>
        wishlistItem.product_id.toString() === product._id.toString()
    );
    if (isInWishlist) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  const handleRemoveWishList = async(id) => {
    console.log("id jkfj red heart clicked" ,id);
         try {
          const response = await fetch(`http://localhost:3000/api/user/remove-wishlist?user_id=${user.result._id}&product_id=${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: authorizationToken,
            },

          })
          
          const data = await response.json();
      if (response.ok) {
      
        // setWishList(data);
        
        setWishList((prevWishList) => prevWishList.filter(item => item.product_id !== id._id));
        setToggle(false)
        toast.success("Removed From WishList Success")
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message)
      }
            
         } catch (error) {
          console.log(`Error While removing from Wishlist ${error}`);
         }
  }

  useEffect(() => {
    setToggleWishlist();
  }, []);

  return (
    <>
      <div className="col-sm-6 col-lg-4 col-xl-3" key={product._id}>
        <div className="card shadow h-100">
          <img
            src={`http://localhost:3000/uploads/${product.image}`}
            className="card-img-top"
            alt={product.product_name}
            style={{height:"200px"}}
          />
          <div className="card-body pb-0">
            <div className="d-flex justify-content-between mb-2">
              <a href="#" className="badge bg-purple bg-opacity-10 text-purple">
                All level
              </a>
              {toggle ? (
                <i className="fas fa-heart" style={{ color: 'red' }} onClick={() => handleRemoveWishList(product._id)}></i>
              ) : (
                <p onClick={() => addWishList(product)} className="h6 mb-0">
                  <i className="far fa-heart"></i>
                </p>
              )}
            </div>
            <h5 className="card-title fw-normal">
              <a href="#">{product.product_name}</a>
            </h5>
            <p className="mb-2 text-truncate-2">
              {product.product_description}
            </p>
            <p className="mb-2 text-truncate-2">
              Price: Rs.{product.product_price}
            </p>
            <ul className="list-inline mb-0">
              <li className="list-inline-item me-0 small">
                <i className="fas fa-star text-warning"></i>
              </li>
              <li className="list-inline-item me-0 small">
                <i className="fas fa-star text-warning"></i>
              </li>
              <li className="list-inline-item me-0 small">
                <i className="fas fa-star text-warning"></i>
              </li>
              <li className="list-inline-item me-0 small">
                <i className="fas fa-star text-warning"></i>
              </li>
              <li className="list-inline-item me-0 small">
                <i className="far fa-star text-warning"></i>
              </li>
              <li className="list-inline-item ms-2 h6 fw-light mb-0">
                4.0/5.0
              </li>
            </ul>
          </div>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </button>
          </div>
          <div className="card-footer pt-0 pb-3">
            <hr />
            <div className="d-flex justify-content-between">
              <span className="h6 fw-light mb-0">
                <i className="far fa-clock text-danger me-2"></i>
                12h 56m
              </span>
              <span className="h6 fw-light mb-0">
                <i className="fas fa-table text-orange me-2"></i>
                15 lectures
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;

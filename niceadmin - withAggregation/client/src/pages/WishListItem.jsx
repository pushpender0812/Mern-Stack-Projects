import React from "react";
import { useAuth } from "../../store/Auth";
import { toast } from "react-toastify";

const WishListItem = ({ wishLists }) => {
  const { wishList, setWishList ,user,token,authorizationToken} = useAuth();
console.log(wishLists,"ppfojli yada g");
  const handleRemoveWishList = async (id) => {
                                                     
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/remove-wishlist?user_id=${user.result._id}&product_id=${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        // setWishList(data);
        setWishList((prevWishList) =>
          prevWishList.filter((item) => item.product_id._id !== id._id)
        );
        toast.success("Removed From WishList Success");
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message);
      }
    } catch (error) {
      console.log(`Error While removing from Wishlist ${error}`);
    }
  };

  const addToCart = async (product) => {
   
  
    console.log("CArt", product);
    console.log("user id",user.result._id);
    try {
      const response = await fetch(`http://localhost:3000/api/user/movetocart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken
        },
        body: JSON.stringify({ product_id: product, user_id: user.result._id }),
      });
      console.log("Response of the cart  is ", response);
        const data = await response.json()
      if (response.ok) {
       
        toast.success(data.message);
        // handleRemoveWishList(product)
      } else {
        toast.success(data.message);
      }

    } catch (error) {
      toast.error("Errror while adding To CArt", error);
    }
  };

  return (
    <>
      {wishLists.map((items, index) => (
        items.result.map((item) => (
      
          <div className="col-sm-6 col-lg-4 col-xl-3" key={index} style={{width:"300px"}}>
          <button className="btn btn-danger" style={    {marginLeft:"250px"}} onClick={() => handleRemoveWishList(item._id)}>
         X
          </button>
          <div className="card shadow h-100">
            <img
              src={`http://localhost:3000/uploads/${item.image}`}
              className="card-img-top"
              alt={item.product_name}
              style={{ height: "240px" }}
            />
            <div className="card-body pb-0">
              <div className="d-flex justify-content-between mb-2">
                <a
                  href="#"
                  className="badge bg-purple bg-opacity-10 text-purple"
                >
                  All level
                </a>
              </div>
              <h5 className="card-title fw-normal">
                <a href="#">{item.product_name}</a>
              </h5>
              <p className="mb-2 text-truncate-2">
                {item.product_description}
              </p>
              <p className="mb-2 text-truncate-2">
                Price: Rs.{item.product_price}
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
              <hr />
              <button
                className="btn btn-primary"
                onClick={() => addToCart(item._id)}
              >
                Move To Cart
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
        ))
       
      ))}
    </>
  );
};

export default WishListItem;

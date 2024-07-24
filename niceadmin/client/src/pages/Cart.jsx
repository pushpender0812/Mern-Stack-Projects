import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/Auth";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Cart = () => {
  const navigate = useNavigate();


  const [coupon, setCoupon] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [maxDiscount, setMaxDiscount] = useState(0);
  const { token, user, isLoggedIn,cart,setCart } = useAuth();

 

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/remove-cart?user_id=${user.result._id}&product_id=${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
        setCart((prevCart) =>
          prevCart.filter((item) => item.product_id._id !== productId)
        );
        toast.success(
          result.extraDetails ? result.extraDetails : result.message
        );
      } else {
        toast.error(result.extraDetails ? result.extraDetails : result.message);
      }
    } catch (error) {
      console.error("Error removing item from cart", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      toast.error("Item Quantity Can't be Less than 1");
      return;
    }

    try {
      const updatedCart = cart.map((item) =>
        item.product_id._id === productId ? { ...item, quantity } : item
      );

      setCart(updatedCart);

      const response = await fetch(
        `http://localhost:3000/api/user/update-cart-quantity?user_id=${user.result._id}&product_id=${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity }),
        }
      );

      if (!response.ok) {
        const originalCart = cart.map((item) =>
          item.product_id._id === productId
            ? { ...item, quantity: item.quantity } // revert to original quantity
            : item
        );
        setCart(originalCart);
        console.error("Failed to update item quantity");
        toast.error("Failed to update item quantity");
      } else {
        const updatedItem = await response.json();
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.product_id._id === productId ? updatedItem : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating item quantity", error);
      toast.error("Error updating item quantity");

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product_id._id === productId
            ? { ...item, quantity: item.quantity }
            : item
        )
      );
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.product_id.product_price * item.quantity,
      0
    );
  };

  const getCoupon = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/get-coupon`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Coupon data", data);
        setCoupon(data);
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message);
      }
    } catch (error) {
      console.error("Error fetching cart items", error);
    }
  };

  const orderTotal = calculateTotalPrice().toFixed(2);

  const handleCouponChange = (event) => {
    const selectedCouponId = event.target.value;
    const selectedCoupon = coupon.find((c) => c._id === selectedCouponId);
    setSelectedCoupon(selectedCoupon);

    if (selectedCoupon) {
      const currentDate = new Date();
      const expiryDate = new Date(selectedCoupon.expire_date);

      if (currentDate > expiryDate) {
        setMaxDiscount(0);
        toast.error(`The coupon ${selectedCoupon.coupon_name} has expired.`);
        return;
      }

      if (orderTotal >= selectedCoupon.min_cart) {
        let discount = 0;
        if (selectedCoupon.coupon_type === "fixed_amount") {
          discount = parseFloat(selectedCoupon.coupon_value);
        } else if (selectedCoupon.coupon_type === "percentage") {
          discount =
            (parseFloat(selectedCoupon.coupon_value) / 100) * orderTotal;
        }

        if (discount > selectedCoupon.maximum_discount) {
          discount = selectedCoupon.maximum_discount;
          setMaxDiscount(discount);
        }

        setMaxDiscount(discount);
      } else {
        setMaxDiscount(0);
        toast.error(
          `The minimum cart value for this coupon is ${selectedCoupon.min_cart}`
        );
      }
    }
  };

  const CouponClicked = () => {
    if (selectedCoupon) {
      const currentDate = new Date();
      const expiryDate = new Date(selectedCoupon.expire_date);

      if (currentDate > expiryDate) {
        setMaxDiscount(0);
        toast.error(`The coupon ${selectedCoupon.coupon_name} has expired.`);
        return;
      }
      toast.success(
        `Coupon ${selectedCoupon.coupon_name} applied with maximum discount of ${maxDiscount}`
      );
      // Add your logic to apply the coupon discount here
    } else {
      toast.error("Please select a coupon.");
    }
  };

  const checkoutHandler = async () => {
    // console.log("checkout user",user);
    try {
      // Fetching order details
      const orderResponse = await fetch(
        `http://localhost:3000/api/user/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: calculateTotalPrice().toFixed(2) - maxDiscount,
          }), // Corrected typo and ensured amount is correctly formatted
        }
      );

      // Checking if order creation was successful
      if (!orderResponse.ok) {
        const orderErrorResult = await orderResponse.json();
        throw new Error(orderErrorResult.message);
      }

      const orderResult = await orderResponse.json();

      // Fetching Razorpay key
      const keyResponse = await fetch(`http://localhost:3000/api/user/key`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Checking if key fetch was successful
      if (!keyResponse.ok) {
        const keyErrorResult = await keyResponse.json();
        throw new Error(keyErrorResult.message);
      }

      const keyResult = await keyResponse.json();
      const razorpayKey = keyResult.key;

      console.log("Fetched Razorpay Key:", razorpayKey);

      const options = {
        key: razorpayKey,
        amount: orderResult.order.amount,
        currency: "INR",
        name: "Pushpender Yadav",
        description: "Test Transaction",
        image:
          "https://media.licdn.com/dms/image/D4D03AQFS2OeWVHwjtw/profile-displayphoto-shrink_200_200/0/1700360020120?e=1726099200&v=beta&t=OkhUzQTJMqSwPNEtWpX08KIGDIiv-uctktWYh19ycJk",
        order_id: orderResult.order.id,
        handler: async function (response) {
          try {
            const product_id = cart.map((item) => item.product_id._id);
            const coupon_id = selectedCoupon ? selectedCoupon._id : null; 
            const total_price = orderResult.order.amount;
            const total_quantity = cart.map((item) => ({
              product_id: item.product_id._id,
              quantity: item.quantity,
            }));
            console.log(product_id, "product id");
            console.log(coupon_id, "coupon id");
            console.log(total_price, "total price");
            const verificationResponse = await fetch(
              `http://localhost:3000/api/user/paymentverification`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  product_id,
                  coupon_id,
                  total_price,
                  total_quantity
                }),
              }
            );

            console.log(verificationResponse, "verifyning payment");
            const verificationText = await verificationResponse.text();
            console.log("Verification Response Text:", verificationText);

            const result = JSON.parse(verificationText);
            if (result.success) {
              window.location.href = `http://localhost:5173/paymentsuccess?${response.razorpay_payment_id}`;
              removeFromCart(product_id)
            } else {
              console.error("Payment verification failed:", result.message);
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            toast.error("Error verifying payment");
          }
        },
        prefill: {
          name: user.result.name || "Kannu Sharma",
          email: user.result.email || "kannu@gmal.com",
          contact: user.result.phone || "8934783673",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        // handler: function(response) {
        //   console.log("Payment successful:", response);
        //   toast.success("Payment Successful!");
        //   // Optionally redirect to success page
        //   window.location.href = `http://localhost:5173/paymentsuccess?reference=${response.razorpay_payment_id}`;
        // },
        // modal: {
        //   ondismiss: function() {
        //     console.log("Checkout form closed.");
        //     toast.error("Payment Cancelled");
        //   }
        // }
      };

      // Initializing Razorpay
      const razor = new window.Razorpay(options);

      razor.open();

      console.log("CheckoutHandler:", orderResponse, keyResponse);

      toast.success("FOR PAYMENT");
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error(`Error while checkout: ${error.message}`);
    }
  };

  useEffect(() => {
    // if (user && user.result && user.result._id) {
    //   getCartItem();
    //   getCoupon()
    // }
   
    getCoupon();
  }, []);

  return (
    <>
      <main>
        <section class="py-0">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="bg-light p-4 text-center rounded-3">
                  <h1 class="m-0">My cart</h1>

                  <div class="d-flex justify-content-center">
                    <nav aria-label="breadcrumb">
                      <ol class="breadcrumb breadcrumb-dots mb-0">
                        <li class="breadcrumb-item">
                          <a href="#">Home</a>
                        </li>
                        <li class="breadcrumb-item">
                          <a href="#">Courses</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                          Cart
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="pt-5">
          <div class="container">
            <div class="row g-4 g-sm-5">
              <div class="col-lg-8 mb-4 mb-sm-0">
                <div class="card card-body p-4 shadow">
                  <div
                    class="alert alert-danger alert-dismissible d-flex justify-content-between align-items-center fade show py-3 pe-2"
                    role="alert"
                  >
                    <div>
                      <span class="fs-5 me-1">🔥</span>
                      These courses are at a limited discount, please checkout
                      within
                      <strong class="text-danger ms-1">
                        2 days and 18 hours
                      </strong>
                    </div>
                    <button
                      type="button"
                      class="btn btn-link mb-0 text-end"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    >
                      <i class="bi bi-x-lg text-dark"></i>
                    </button>
                  </div>

                  {cart.length > 0 ? (
                    cart.map((item, index) => (
                      // console.log(item)
                      <div class="table-responsive border-0 rounded-3">
                        <table class="table align-middle p-4 mb-0">
                          <tbody class="border-top-0">
                            <tr>
                              <td>
                                <div class="d-lg-flex align-items-center">
                                  <div class="w-100px w-md-80px mb-2 mb-md-0">
                                    <img
                                      src={`http://localhost:3000/uploads/${item.product_id.image}`}
                                      class="rounded"
                                      alt={item.product_id.product_name}
                                    />
                                  </div>

                                  <h6 class="mb-0 ms-lg-3 mt-2 mt-lg-0">
                                    <a href="#">
                                      {item.product_id.product_name}
                                    </a>
                                  </h6>
                                </div>
                              </td>

                              <td>
                                <h5 class="text-success mb-0" style={{textAlign:"center"}} >
                                  ₹{item.product_id.product_price}
                                </h5>
                              </td>

                              <td>
                                {/* <a
                                  href="#"
                                  class="btn btn-sm btn-success-soft px-2 me-1 mb-1 mb-md-0"
                                >
                                  <i class="far fa-fw fa-edit"></i>
                                </a> */}

                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product_id._id,
                                      item.quantity - 1
                                    )
                                  }
                                >
                                  -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product_id._id,
                                      item.quantity + 1
                                    )
                                  }
                                >
                                  +
                                </button>

                                <button
                                  onClick={() =>
                                    removeFromCart(item.product_id._id)
                                  }
                                  class="btn btn-sm btn-danger-soft px-2 mb-0"
                                >
                                  <i class="fas fa-fw fa-times"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ))
                  ) : (
                    <p>Your Cart Is Empty</p>
                  )}

                  <div class="row g-3 mt-2">
                    <div class="col-md-6">
                      <div class="input-group">
                        <select
                          className="form-control form-control"
                          onChange={handleCouponChange}
                        >
                          <option value="" disabled selected>
                            SELECT COUPON CODE
                          </option>
                          {coupon.map((code, index) => (
                            <>
                              <option key={index} value={code._id}>
                                {code.coupon_name}
                              </option>
                            </>
                          ))}
                        </select>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={() => CouponClicked()}
                        >
                          Apply coupon
                        </button>
                      </div>
                    </div>

                    <div class="col-md-6 text-md-end">
                      <button class="btn btn-primary mb-0" disabled>
                        Update cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="card card-body p-4 shadow">
                  <h4 class="mb-3">Cart Total</h4>

                  <ul class="list-group list-group-borderless mb-2">
                    <li class="list-group-item px-0 d-flex justify-content-between">
                      <span class="h6 fw-light mb-0">Original Price</span>
                      <span class="h6 fw-light mb-0 fw-bold">
                        ₹{calculateTotalPrice().toFixed(2)}
                      </span>
                    </li>
                    <li class="list-group-item px-0 d-flex justify-content-between">
                      <span class="h6 fw-light mb-0">Coupon Discount</span>
                      <span class="text-danger">₹{maxDiscount}</span>
                    </li>
                    <li class="list-group-item px-0 d-flex justify-content-between">
                      <span class="h5 mb-0">Total</span>
                      <span class="h5 mb-0">
                        ₹{calculateTotalPrice().toFixed(2) - maxDiscount}
                      </span>
                    </li>
                  </ul>

                  <div class="d-grid">
                    <button
                      class="btn btn-lg btn-success"
                      onClick={checkoutHandler}
                    >
                      Proceed to Checkout
                    </button>
                  </div>

                  <p class="small mb-0 mt-2 text-center">
                    By completing your purchase, you agree to these{" "}
                    <a href="#">
                      <strong>Terms of Service</strong>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

const styles = {
  container: {
    padding: "20px",
    marginTop: "120px",
  },
  cartItemsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cartList: {
    listStyleType: "none",
    padding: 0,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "10px",
    flexBasis: "48%",
    margin: "1%",
  },
  productImage: {
    width: "100px",
    height: "100px",
    marginRight: "20px",
  },
  productDetails: {
    flexGrow: 1,
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
  },
  removeButton: {
    backgroundColor: "#ff6347",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
  },
  cartSummary: {
    border: "1px solid #ccc",
    padding: "20px",
    width: "100%",
    textAlign: "center",
  },
  buyNowButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    width: "100%",
    marginTop: "20px",
  },
};

export default Cart;

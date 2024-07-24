import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/Auth";
import { toast } from "react-toastify";
// import { loginUser } from '../../../server/controllers/apiController/api-user-controller'

const MyOrders = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);

  //   getMyOrders()

  useEffect(() => {
    const getMyOrders = async () => {
      console.log("Fetching orders...");
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/view-myorder`,
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
          console.log("Orders data:", data);
          setOrders(data);
        } else {
          const errorData = await response.json();
          toast.error(
            errorData.extraDetails ? errorData.extraDetails : errorData.message
          );
        }
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    if (user && user.result) {
      getMyOrders();
    }
  }, [user, token]); 

  if (!user || !user.result) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main>
        <section className="pt-0">
          <div className="container-fluid px-0">
            <div className="bg-blue h-100px h-md-200px rounded-0"></div>
          </div>
          <div className="container mt-n4">
            <div className="row">
              <div className="col-12">
                <div className="card bg-transparent card-body p-0">
                  <div className="row d-flex justify-content-between">
                    <div className="col-auto mt-4 mt-md-0">
                      <div className="avatar avatar-xxl mt-n3">
                        <img
                          className="avatar-img rounded-circle border border-white border-3 shadow"
                          src="assets/images/avatar/01.jpg"
                          alt=""
                        />
                      </div>
                    </div>

                    <div className="col d-md-flex justify-content-between align-items-center mt-4">
                      <div>
                        <h1 className="my-1 fs-4">
                          {user.result.name}
                          <i className="bi bi-patch-check-fill text-info small"></i>
                        </h1>
                        <ul className="list-inline mb-0">
                          {/* <li className="list-inline-item h6 fw-light me-3 mb-1 mb-sm-0"><i className="fas fa-star text-warning me-2"></i>4.5/5.0</li>
                                        <li className="list-inline-item h6 fw-light me-3 mb-1 mb-sm-0"><i className="fas fa-user-graduate text-orange me-2"></i>12k Enrolled Students</li>
                                        <li className="list-inline-item h6 fw-light me-3 mb-1 mb-sm-0"><i className="fas fa-book text-purple me-2"></i>25 Courses</li> */}
                        </ul>
                      </div>

                      {/* <div className="d-flex align-items-center mt-2 mt-md-0">
                                    <a href="instructor-create-course.html" className="btn btn-success mb-0">Create a course</a>
                                </div> */}
                    </div>
                  </div>
                </div>
                {/* <button onClick={() => getMyOrders()}>get orders</button> */}
                <hr className="d-xl-none" />
                <div className="col-12 col-xl-3 d-flex justify-content-between align-items-center">
                  <a className="h6 mb-0 fw-bold d-xl-none" href="#">
                    Menu
                  </a>
                  <button
                    className="btn btn-primary d-xl-none"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                  >
                    <i className="fas fa-sliders-h"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-0">
          <div className="container">
            <div className="row">
              <div className="col-xl-3">
                {/* <nav className="navbar navbar-light navbar-expand-xl mx-0">
                        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        
                            <div className="offcanvas-header bg-light">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">My profile</h5>
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                           
                            {/* <div className="offcanvas-body p-3 p-xl-0">
                                <div className="bg-dark border rounded-3 pb-0 p-3 w-100">
                                  
                                    <div className="list-group list-group-dark list-group-borderless">
                                        <a className="list-group-item" href="instructor-dashboard.html"><i className="bi bi-ui-checks-grid fa-fw me-2"></i>Dashboard</a>
                                        <a className="list-group-item" href="instructor-manage-course.html"><i className="bi bi-basket fa-fw me-2"></i>My Courses</a>
                                        <a className="list-group-item" href="instructor-earning.html"><i className="bi bi-graph-up fa-fw me-2"></i>Earnings</a>
                                        <a className="list-group-item" href="instructor-studentlist.html"><i className="bi bi-people fa-fw me-2"></i>Students</a>
                                        <a className="list-group-item active" href="instructor-order.html"><i className="bi bi-folder-check fa-fw me-2"></i>Orders</a>
                                        <a className="list-group-item" href="instructor-review.html"><i className="bi bi-star fa-fw me-2"></i>Reviews</a>
                                        <a className="list-group-item" href="instructor-edit-profile.html"><i className="bi bi-pencil-square fa-fw me-2"></i>Edit Profile</a>
                                        <a className="list-group-item" href="instructor-payout.html"><i className="bi bi-wallet2 fa-fw me-2"></i>Payouts</a>
                                        <a className="list-group-item" href="instructor-setting.html"><i className="bi bi-gear fa-fw me-2"></i>Settings</a>
                                        <a className="list-group-item" href="instructor-delete-account.html"><i className="bi bi-trash fa-fw me-2"></i>Delete Profile</a>
                                        <a className="list-group-item text-danger bg-danger-soft-hover" href="sign-in.html"><i className="fas fa-sign-out-alt fa-fw me-2"></i>Sign Out</a>
                                    </div>
                                </div>
                            </div> */}
                {/* </div> */}
                {/* </nav> */}
              </div>

              <div className="col-xl-12" style={{ width: "1500px" }}>
                <div className="card border bg-transparent rounded-3">
                  <div className="card-header bg-transparent border-bottom">
                    <h3 className="mb-0">Order List</h3>
                  </div>

                  <div className="card-body">
                    <div className="row g-3 align-items-center justify-content-between mb-4">
                      <div className="col-md-8">
                        <form className="rounded position-relative">
                          <input
                            className="form-control pe-5 bg-transparent"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                          />
                          <button
                            className="btn bg-transparent px-2 py-0 position-absolute top-50 end-0 translate-middle-y"
                            type="submit"
                          >
                            <i className="fas fa-search fs-6 "></i>
                          </button>
                        </form>
                      </div>

                      <div className="col-md-3">
                        <form>
                          <select
                            className="form-select js-choice border-0 z-index-9 bg-transparent"
                            aria-label=".form-select-sm"
                          >
                            <option value="">Sort by</option>
                            <option>Free</option>
                            <option>Newest</option>
                            <option>Oldest</option>
                          </select>
                        </form>
                      </div>
                    </div>

                    <div className="table-responsive border-0">
                      {/* <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                                   
                                    <thead>
                                        <tr>
                                            <th scope="col" className="border-0 rounded-start">Course name</th>
                                            <th scope="col" className="border-0">Order ID</th>
                                            <th scope="col" className="border-0">Date</th>
                                            <th scope="col" className="border-0">Amount</th>
                                            <th scope="col" className="border-0 rounded-end">Payment</th>
                                        </tr>
                                    </thead>
    
                                   
                                    <tbody>
                                        
                                        <tr>
                                          
                                            <td>
                                                <h6 className="mt-2 mt-lg-0 mb-0"><a href="#">The complete Digital Marketing Course - 8 Course in 1</a></h6>
                                            </td>
    
                                       
                                            <td className="text-center text-sm-start text-primary-hover">
                                                <a href="#" className="text-body"><u>#125489</u></a>
                                            </td>
    
                                         
                                            <td>18/8/2021</td>
    
                                            
                                            <td>$356</td>
    
                                          
                                            <td>Credit Card</td>
                                        </tr>
    
                                       
                                        <tr>
                                          
                                            <td>
                                                <h6 className="mt-2 mt-lg-0 mb-0"><a href="#">Time Management Mastery: Do More, Stress Less</a></h6>
                                            </td>
                                           
                                            <td className="text-center text-sm-start text-primary-hover">
                                                <a href="#" className="text-body"><u>#235486</u></a>
                                            </td>
    
                                            
                                            <td>25/7/2021</td>
    
                                           
                                            <td>$186</td>
    
                                          
                                            <td>Debit Card</td>
                                        </tr>
    
                                        <tr>
                                          
                                            <td>
                                                <h6 className="mt-2 mt-lg-0 mb-0"><a href="#">Building Scalable APIs with GraphQL</a></h6>
                                            </td>
                                           
                                            <td className="text-center text-sm-start text-primary-hover">
                                                <a href="#" className="text-body"><u>#0215789</u></a>
                                            </td>
    
                                           
                                            <td>4/9/2020</td>
    
                                           
                                            <td>$450</td>
    
                                          
                                            <td>Paypal</td>
                                        </tr>
    
                                        
                                        <tr>
                                         
                                            <td>
                                                <h6 className="mt-2 mt-lg-0 mb-0"><a href="#">Sketch from A to Z: for app designer</a></h6>
                                            </td>
                                           
                                            <td className="text-center text-sm-start text-primary-hover">
                                                <a href="#" className="text-body"><u>#0135689</u></a>
                                            </td>
    
                                           
                                            <td>5/6/2021</td>
    
                                            
                                            <td>$0</td>
    
                                           
                                            <td>Free</td>
                                        </tr>
    
                                       
                                        <tr>
                                           
                                            <td>
                                                <h6 className="mt-2 mt-lg-0 mb-0"><a href="#">Build Responsive Websites with HTML</a></h6>
                                            </td>
                                            
                                            <td className="text-center text-sm-start text-primary-hover">
                                                <a href="#" className="text-body"><u>#0587623</u></a>
                                            </td>
    
                                            
                                            <td>2/6/2021</td>
    
                                         
                                            <td>$250</td>
    
                                            
                                            <td>Credit Card</td>
                                        </tr>
    
                                     
                                        <tr>
                                           
                                            <td>
                                                <h6 className="mt-2 mt-lg-0 mb-0"><a href="#">JavaScript: Full Understanding</a></h6>
                                            </td>
                                          
                                            <td className="text-center text-sm-start text-primary-hover">
                                                <a href="#" className="text-body"><u>#0215789</u></a>
                                            </td>
    
                                           
                                            <td>14/1/2021</td>
    
                                            
                                            <td>$325</td>
    
                                           
                                            <td>Debit Card</td>
                                        </tr>
                                    </tbody>
                                   
                                </table> */}

                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            {/* <th>User Name</th>
                            <th>User Email</th>
                            <th>Phone</th> */}
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Coupon Used</th>
                            <th>Order Status</th>
                            {/* <th>Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {orders.length > 0 ? (
                            orders.map((order, index) =>
                              order.product_id.map((product, pIndex) => (
                                <tr key={order._id + "-" + pIndex}>
                                  {pIndex === 0 && (
                                    <>
                                      <td rowSpan={order.product_id.length}>
                                        {index + 1}
                                      </td>
                                      <td rowSpan={order.product_id.length}>
                                        {order._id}
                                      </td>
                                      {/* <td rowSpan={order.product_id.length}>
                                        {order.user_id.name}
                                      </td>
                                      <td rowSpan={order.product_id.length}>
                                        {order.user_id.email}
                                      </td>
                                      <td rowSpan={order.product_id.length}>
                                        {order.user_id.phone}
                                      </td> */}
                                    </>
                                  )}
                                  <td>{product.product_name}</td>
                                  <td>
                                    {order.total_quantity[pIndex].quantity}
                                  </td>
                                  {pIndex === 0 && (
                                    <>
                                      <td rowSpan={order.product_id.length}>
                                        {order.total_price / 100}
                                      </td>
                                      <td rowSpan={order.product_id.length}>
                                        {order.coupon_id
                                          ? order.coupon_id.coupon_name
                                          : "N/A"}
                                      </td>
                                      <td
                                        rowSpan={order.product_id.length}
                                        style={{
                                          color:
                                            order.order_status === "Approved"
                                              ? "green"
                                              : "red",
                                        }}
                                      >
                                        {order.order_status}
                                      </td>
                                    </>
                                  )}
                                </tr>
                              ))
                            )
                          ) : (
                            <tr>
                              <td colSpan="11" className="text-center">
                                No pending orders found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="d-sm-flex justify-content-sm-between align-items-sm-center mt-4 mt-sm-3">
                      <p className="mb-0 text-center text-sm-start">
                        Showing 1 to 8 of 20 entries
                      </p>

                      <nav
                        className="d-flex justify-content-center mb-0"
                        aria-label="navigation"
                      >
                        <ul className="pagination pagination-sm pagination-primary-soft mb-0 pb-0">
                          <li className="page-item mb-0">
                            <a className="page-link" href="#" tabindex="-1">
                              <i className="fas fa-angle-left"></i>
                            </a>
                          </li>
                          <li className="page-item mb-0">
                            <a className="page-link" href="#">
                              1
                            </a>
                          </li>
                          <li className="page-item mb-0 active">
                            <a className="page-link" href="#">
                              2
                            </a>
                          </li>
                          <li className="page-item mb-0">
                            <a className="page-link" href="#">
                              3
                            </a>
                          </li>
                          <li className="page-item mb-0">
                            <a className="page-link" href="#">
                              <i className="fas fa-angle-right"></i>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MyOrders;

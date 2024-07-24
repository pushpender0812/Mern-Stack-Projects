import React, { useState ,useEffect} from "react";
import "../../public/assets/css/style-dark-rtl.css";
import "../../public/assets/css/style-rtl.css";
import "../../public/assets/css/style.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/Auth";

const Navbar = () => {
  const { isLoggedIn,cart,getCartItem} = useAuth();

 
  useEffect(() => {
    getCartItem();
  },[cart])
   
   


  return (
    <>
      <header className="navbar-light navbar-sticky header-static">
        <nav className="navbar navbar-expand-xl">
          <div className="container-fluid px-3 px-xl-5">
            <a className="navbar-brand" href="index-2.html">
              <img
                className="light-mode-item navbar-brand-item"
                src="assets/images/logo.svg"
                alt="logo"
              />
              <img
                className="dark-mode-item navbar-brand-item"
                src="assets/images/logo-light.svg"
                alt="logo"
              />
            </a>

            <button
              className="navbar-toggler ms-auto"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-animation">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>

            <div className="navbar-collapse w-100 collapse" id="navbarCollapse">
              <ul className="navbar-nav navbar-nav-scroll me-auto"></ul>

              <ul className="navbar-nav navbar-nav-scroll me-auto">
                <li className="nav-item ">
                  <NavLink to={"/"} >
                    <div className="nav-link">Home</div>
                  </NavLink>
                </li>

				<li className="nav-item" style={{marginLeft:'60px'}}>
                  <NavLink to={"/faq"} >
                    <div className="nav-link">FAQ</div>
                  </NavLink>
                </li>

				<li className="nav-item" style={{marginLeft:'60px'}}>
                  <NavLink to={"/blogs"} >
                    <div className="nav-link">Blogs</div>
                  </NavLink>
                </li>

                {isLoggedIn ? 
               <NavLink to={"/cart"}>
               <li className="nav-item dropdown" style={{ marginLeft: '340px' }}>
                 <div className="nav-link">
                   <i className="fas fa-shopping-cart"></i>
                   {cart.length > 0 && <span className="badge">{cart.length}</span>}
                 </div>
               </li>
             </NavLink>
             
                
                : ""}

               

                {/* {!isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <NavLink to={"/login"}>
                        {" "}
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="pagesMenu"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Login
                        </a>
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to={"/register"}>
                        {" "}
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="pagesMenu"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Register
                        </a>
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <NavLink to={"/logout"}>
                      {" "}
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="pagesMenu"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Logout
                      </a>
                    </NavLink>
                  </li>
                )} */}

                {/* <li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="#" id="pagesMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a>
						<ul className="dropdown-menu" aria-labelledby="pagesMenu">
					
							<li className="dropdown-submenu dropend">
								<a className="dropdown-item dropdown-toggle" href="#">Course</a>
								<ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
									<li> <a className="dropdown-item" href="course-grid.html">Course Grid classNameic</a></li>
									<li> <a className="dropdown-item" href="course-grid-2.html">Course Grid Minimal</a></li>
									<li> <hr className="dropdown-divider"/></li>
									<li> <a className="dropdown-item" href="course-list.html">Course List classNameic</a></li>
									<li> <a className="dropdown-item" href="course-list-2.html">Course List Minimal</a></li>
									<li> <hr className="dropdown-divider"/></li>
									<li> <a className="dropdown-item" href="course-detail.html">Course Detail classNameic</a></li>
									<li> <a className="dropdown-item" href="course-detail-min.html">Course Detail Minimal</a></li>
									<li> <a className="dropdown-item" href="course-detail-adv.html">Course Detail Advance</a></li>
									<li> <a className="dropdown-item" href="course-video-player.html">Course Full Screen Video</a></li>
								</ul>
							</li>

							<li className="dropdown-submenu dropend">
								<a className="dropdown-item dropdown-toggle" href="#">About</a>
								<ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
									<li> <a className="dropdown-item" href="about.html">About Us</a></li>
									<li> <a className="dropdown-item" href="contact-us.html">Contact Us</a></li>
									<li> <a className="dropdown-item" href="blog-grid.html">Blog Grid</a></li>
									<li> <a className="dropdown-item" href="blog-masonry.html">Blog Masonry</a></li>
									<li> <a className="dropdown-item" href="blog-detail.html">Blog Detail</a></li>
									<li> <a className="dropdown-item" href="pricing.html">Pricing</a></li>
								</ul>
							</li>

							<li> <a className="dropdown-item" href="instructor-list.html">Instructor List</a></li>
							<li> <a className="dropdown-item" href="instructor-single.html">Instructor Single</a></li>
							<li> <a className="dropdown-item" href="become-instructor.html">Become an Instructor</a></li>

							<li className="dropdown-submenu dropend">
								<a className="dropdown-item dropdown-toggle" href="#">Authentication</a>
								<ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
									<li> <a className="dropdown-item" href="sign-in.html">Sign In</a></li>
									<li> <a className="dropdown-item" href="sign-up.html">Sign Up</a></li>
									<li> <a className="dropdown-item" href="forgot-password.html">Forgot Password</a></li>
								</ul>
							</li>

							<li> <a className="dropdown-item" href="faq.html">FAQs</a></li>
							<li> <a className="dropdown-item" href="error-404.html">Error 404</a></li>
							<li> <a className="dropdown-item" href="coming-soon.html">Coming Soon</a></li>
							<li> <a className="dropdown-item" href="cart.html">Cart</a></li>
							<li> <a className="dropdown-item" href="checkout.html">Checkout</a></li>
							<li> <a className="dropdown-item" href="empty-cart.html">Empty Cart</a></li>
							<li> <a className="dropdown-item" href="wishlist.html">Wishlist</a></li>
						</ul>
					</li> */}

                {/* <li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="#" id="accounntMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Accounts</a>
						<ul className="dropdown-menu" aria-labelledby="accounntMenu">
							
							<li className="dropdown-submenu dropend">
								<a className="dropdown-item dropdown-toggle" href="#"><i className="fas fa-user-tie fa-fw me-1"></i>Instructor</a>
								<ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
									<li> <a className="dropdown-item" href="instructor-dashboard.html"><i className="bi bi-grid-fill fa-fw me-1"></i>Dashboard</a> </li>
									<li> <a className="dropdown-item" href="instructor-manage-course.html"><i className="bi bi-basket-fill fa-fw me-1"></i>Courses</a> </li>
									<li> <a className="dropdown-item" href="instructor-create-course.html"><i className="bi bi-file-earmark-plus-fill fa-fw me-1"></i>Create Course</a> </li>
									<li> <a className="dropdown-item" href="course-added.html"><i className="bi bi-file-check-fill fa-fw me-1"></i>Course Added</a> </li>
									<li> <a className="dropdown-item" href="instructor-earning.html"><i className="fas fa-chart-line fa-fw me-1"></i>Earnings</a> </li>
									<li> <a className="dropdown-item" href="instructor-studentlist.html"><i className="fas fa-user-graduate fa-fw me-1"></i>Students</a> </li>
									<li> <a className="dropdown-item" href="instructor-order.html"><i className="bi bi-cart-check-fill fa-fw me-1"></i>Orders</a> </li>
									<li> <a className="dropdown-item" href="instructor-review.html"><i className="bi bi-star-fill fa-fw me-1"></i>Reviews</a> </li>
									<li> <a className="dropdown-item" href="instructor-payout.html"><i className="fas fa-wallet fa-fw me-1"></i>Payout</a> </li>
								</ul>
							</li>

							
								<li className="dropdown-submenu dropend">
								<a className="dropdown-item dropdown-toggle" href="#"><i className="fas fa-user-graduate fa-fw me-1"></i>Student</a>
								<ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
									<li> <a className="dropdown-item" href="student-dashboard.html"><i className="bi bi-grid-fill fa-fw me-1"></i>Dashboard</a> </li>
									<li> <a className="dropdown-item" href="student-subscription.html"><i className="bi bi-card-checklist fa-fw me-1"></i>My Subscriptions</a> </li>
									<li> <a className="dropdown-item" href="student-course-list.html"><i className="bi bi-basket-fill fa-fw me-1"></i>Courses</a> </li>
									<li> <a className="dropdown-item" href="student-payment-info.html"><i className="bi bi-credit-card-2-front-fill fa-fw me-1"></i>Payment Info</a> </li>
									<li> <a className="dropdown-item" href="student-bookmark.html"><i className="fas bi-cart-check-fill fa-fw me-1"></i>Wishlist</a> </li>
								</ul>
							</li>
							
							<li> <a className="dropdown-item" href="admin-dashboard.html"><i className="fas fa-user-cog fa-fw me-1"></i>Admin</a> </li>
							<li> <hr className="dropdown-divider"/></li>
							<li> <a className="dropdown-item" href="instructor-edit-profile.html"><i className="fas fa-fw fa-edit me-1"></i>Edit Profile</a> </li>
							<li> <a className="dropdown-item" href="instructor-setting.html"><i className="fas fa-fw fa-cog me-1"></i>Settings</a> </li>
							<li> <a className="dropdown-item" href="instructor-delete-account.html"><i className="fas fa-fw fa-trash-alt me-1"></i>Delete Profile</a> </li>
						</ul>
					</li>

				
					<li className="nav-item dropdown dropdown-fullwidth">
						<a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Megamenu</a>
						<div className="dropdown-menu dropdown-menu-end pb-0" data-bs-popper="none">
							<div className="row p-4 g-4">
							
								<div className="col-xl-6 col-xxl-3">
									<h6 className="mb-0">Get started</h6>
									<hr/>
									<ul className="list-unstyled">
										<li> <a className="dropdown-item" href="#">Market research</a> </li>
										<li> <a className="dropdown-item" href="#">Advertising</a> </li>
										<li> <a className="dropdown-item" href="#">Consumer behavior</a> </li>
										<li> <a className="dropdown-item" href="#">Digital marketing</a> </li>
										<li> <a className="dropdown-item" href="#">Marketing ethics</a> </li>
										<li> <a className="dropdown-item" href="#">Social media marketing</a> </li>
										<li> <a className="dropdown-item" href="#">Public relations</a> </li>
										<li> <a className="dropdown-item" href="#">Advertising</a> </li>
										<li> <a className="dropdown-item" href="#">Decision science</a> </li>
										<li> <a className="dropdown-item" href="#">SEO</a> </li>
										<li> <a className="dropdown-item" href="#">Business marketing</a> </li>
									</ul>
								</div>
								
							
								<div className="col-xl-6 col-xxl-3">
									<h6 className="mb-0">Degree</h6>
									<hr/>
								
									<div className="mb-2 position-relative bg-primary-soft-hover rounded-2 transition-base p-3">
										<a className="stretched-link h6 mb-0" href="#">Contact management</a>
										<p className="mb-0 small text-truncate-2">Speedily say has suitable disposal add boy. On forth doubt miles of child.</p>
									</div>
								
									<div className="mb-2 position-relative bg-primary-soft-hover rounded-2 transition-base p-3">
										<a className="stretched-link h6 mb-0" href="#">Sales pipeline</a>
										<p className="mb-0 small text-truncate-2">Speedily say has suitable disposal add boy. On forth doubt miles of child.</p>
									</div>
									
									<div className="mb-2 position-relative bg-primary-soft-hover rounded-2 transition-base p-3">
										<a className="stretched-link h6 mb-0" href="#">Security & Permission</a>
										<p className="mb-0 small text-truncate-2">Speedily say has suitable disposal add boy. On forth doubt miles of child.</p>
									</div>
								</div>

							
								<div className="col-xl-6 col-xxl-3">
									<h6 className="mb-0">Certificate</h6>
									<hr/>
								
									<div className="d-flex mb-4 position-relative">
										<h2 className="mb-0"><i className="fab fa-fw fa-google text-google-icon"></i></h2>
										<div className="ms-2">
											<a className="stretched-link h6 mb-0" href="#">Google SEO certificate</a>
											<p className="mb-0 small">No prerequisites</p>
										</div>
									</div>
								
									<div className="d-flex mb-4 position-relative">
										<h2 className="mb-0"><i className="fab fa-fw fa-linkedin-in text-linkedin"></i></h2>
										<div className="ms-2">
											<a className="stretched-link h6 mb-0" href="#">Business Development Executive(BDE)</a>
											<p className="mb-0 small">No prerequisites</p>
										</div>
									</div>
									
									<div className="d-flex mb-4 position-relative">
										<h2 className="mb-0"><i className="fab fa-fw fa-facebook text-facebook"></i></h2>
										<div className="ms-2">
											<a className="stretched-link h6 mb-0" href="#">Facebook social media marketing</a>
											<p className="mb-0 small">Expert advice</p>
										</div>
									</div>
									
									<div className="d-flex mb-4 position-relative">
										<h2 className="mb-0"><i className="fas fa-fw fa-basketball-ball text-dribbble"></i></h2>
										<div className="ms-2">
											<a className="stretched-link h6 mb-0" href="#">Creative graphics design</a>
											<p className="mb-0 small">No prerequisites</p>
										</div>
									</div>
								</div>

								
								<div className="col-xl-6 col-xxl-3">
									<h6 className="mb-0">Download Eduport</h6>
									<hr/>
									
									<img src="assets/images/element/14.svg" alt=""/>

								
									<div className="row g-2 justify-content-center mt-3">
										
										<div className="col-6 col-sm-4 col-xxl-6">
											<a href="#"> <img src="assets/images/client/google-play.svg" className="btn-transition" alt="google-store"/> </a>
										</div>
										
										<div className="col-6 col-sm-4 col-xxl-6">
											<a href="#"> <img src="assets/images/client/app-store.svg" className="btn-transition" alt="app-store"/> </a>
										</div>
									</div>
								</div>

								
								<div className="col-12">
									<div className="alert alert-success alert-dismissible fade show mt-2 mb-0 rounded-3" role="alert">
									
										<div className="avatar avatar-xs me-2">
											<img className="avatar-img rounded-circle" src="assets/images/avatar/09.jpg" alt="avatar"/>
										</div>
										
										The personality development className starts at 2:00 pm, click to <a href="#" className="alert-link">Join Now</a>
									</div>
								</div>
							</div>
						</div>
					</li>

					
					<li className="nav-item dropdown">
						<a className="nav-link" href="#" id="advanceMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i className="fas fa-ellipsis-h"></i>
						</a>
						<ul className="dropdown-menu dropdown-menu-end min-w-auto" data-bs-popper="none">
							<li> 
								<a className="dropdown-item" href="https://support.webestica.com/" target="_blank">
									<i className="text-warning fa-fw bi bi-life-preserver me-2"></i>Support
								</a> 
							</li>
							<li> 
								<a className="dropdown-item" href="docs/index.html" target="_blank">
									<i className="text-danger fa-fw bi bi-card-text me-2"></i>Documentation
								</a> 
							</li>
							<li> <hr className="dropdown-divider"/></li>
							<li> 
								<a className="dropdown-item" href="rtl/index.html" target="_blank">
									<i className="text-info fa-fw bi bi-toggle-off me-2"></i>RTL demo
								</a> 
							</li>
							<li> 
								<a className="dropdown-item" href="https://themes.getbootstrap.com/store/webestica/" target="_blank">
									<i className="text-success fa-fw bi bi-cloud-download-fill me-2"></i>Buy Eduport!
								</a> 
							</li>
							<li> <hr className="dropdown-divider"/></li>
							<li> 
								<a className="dropdown-item" href="docs/alerts.html" target="_blank">
									<i className="text-orange fa-fw bi bi-puzzle-fill me-2"></i>Components
								</a> 
							</li>
						</ul>
					</li> */}
              </ul>

              <div className="nav my-3 my-xl-0 px-4 flex-nowrap align-items-center">
                <div className="nav-item w-100">
                  <form className="position-relative">
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
              </div>
            </div>

            <div className="dropdown ms-1 ms-lg-0">
              <a
                className="avatar avatar-sm p-0"
                href="#"
                id="profileDropdown"
                role="button"
                data-bs-auto-close="outside"
                data-bs-display="static"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className="avatar-img rounded-circle"
                  src="assets/images/avatar/01.jpg"
                  alt="avatar"
                />
              </a>
              <ul
                className="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3"
                aria-labelledby="profileDropdown"
              >
                <li className="px-3">
                  <div className="d-flex align-items-center">
                    <div className="avatar me-3">
                      <img
                        className="avatar-img rounded-circle shadow"
                        src="assets/images/avatar/01.jpg"
                        alt="avatar"
                      />
                    </div>
                    <div>
                      <a className="h6" href="#">
                        Lori Ferguson
                      </a>
                      <p className="small m-0">example@gmail.com</p>
                    </div>
                  </div>
                  <hr />
                </li>

                {!isLoggedIn ? (
                  <>
                    <NavLink to={"/login"}>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-info-circle fa-fw me-2"></i>Login
                        </a>
                      </li>
                    </NavLink>
                    <NavLink to={"/register"}>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-info-circle fa-fw me-2"></i>
                          Register
                        </a>
                      </li>
                    </NavLink>
                  </>
                ) : (
                  <>
                   <NavLink to={"/edit-profile"}> <li>
                      <a className="dropdown-item" href="#">
                        <i className="bi bi-person fa-fw me-2"></i>Edit Profile
                      </a>
                    </li>
                    </NavLink>
                    <NavLink to={"/orders"}> <li>
                      <a className="dropdown-item" href="#">
                        <i className="bi bi-box"></i>       My Orders
                      </a>
                    </li>
                    </NavLink>
                    <NavLink to={"/wishlist"}>
                      {" "}
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-heart fa-fw me-2"></i>
                          WishList
                        </a>
                      </li>
                    </NavLink>

                    <NavLink to={"/logout"}>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-box-arrow-right fa-fw me-2"></i>
                          LogOut
                        </a>
                      </li>
                    </NavLink>
                  </>
                )}

                {/* <li><a className="dropdown-item bg-danger-soft-hover" href="#"><i className="bi bi-power fa-fw me-2"></i>Sign Out</a></li> */}
                <li>
                  {" "}
                  <hr className="dropdown-divider" />
                </li>

                {/* <li>
						<div className="modeswitch-wrap" id="darkModeSwitch">
							<div className="modeswitch-item">
								<div className="modeswitch-icon"></div>
							</div>
							<span>Dark mode</span>
						</div>
					</li>  */}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;

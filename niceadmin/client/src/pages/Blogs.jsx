import React, { useState,useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Blogs = () => {

	const [blogs,setBlogs] = useState([])


 


 
	const getBlogs = async () => {
		try {
		  const response = await fetch(
			`http://localhost:3000/api/user/view-blogs`,
			{
			  method: "GET",
			  headers: {
				"Content-Type": "application/json",
				// Authorization: `Bearer ${token}`,
			  },
			}
		  );
		  if (response.ok) {
			const data = await response.json();
	
			setBlogs(data);
		  } else {
			const errorData = await response.json();
			toast.error(
			  errorData.extraDetails ? errorData.extraDetails : errorData.message
			);
		  }
		} catch (error) {
		  toast.error("Error fetching Blogs", error);
		}
	  };
	
	  useEffect(() => {
		getBlogs();
	  },[]);





  return (
    <>
      <main style={{marginTop:"100px"}}>
        <section class="py-5">
          <div class="container">
            <div class="row position-relative">
              <figure class="position-absolute top-0 start-0 d-none d-sm-block">
                <svg width="22px" height="22px" viewBox="0 0 22 22">
                  <polygon
                    class="fill-purple"
                    points="22,8.3 13.7,8.3 13.7,0 8.3,0 8.3,8.3 0,8.3 0,13.7 8.3,13.7 8.3,22 13.7,22 13.7,13.7 22,13.7 "
                  ></polygon>
                </svg>
              </figure>

              <div class="col-lg-10 mx-auto text-center position-relative">
                <figure class="position-absolute top-50 end-0 translate-middle-y">
                  <svg width="27px" height="27px">
                    <path
                      class="fill-orange"
                      d="M13.122,5.946 L17.679,-0.001 L17.404,7.528 L24.661,5.946 L19.683,11.533 L26.244,15.056 L18.891,16.089 L21.686,23.068 L15.400,19.062 L13.122,26.232 L10.843,19.062 L4.557,23.068 L7.352,16.089 L-0.000,15.056 L6.561,11.533 L1.582,5.946 L8.839,7.528 L8.565,-0.001 L13.122,5.946 Z"
                    ></path>
                  </svg>
                </figure>

                <figure class="position-absolute top-100 start-50 translate-middle mt-3 ms-n9 d-none d-lg-block">
                  <svg>
                    <path
                      class="fill-success"
                      d="m181.6 6.7c-0.1 0-0.2-0.1-0.3 0-2.5-0.3-4.9-1-7.3-1.4-2.7-0.4-5.5-0.7-8.2-0.8-1.4-0.1-2.8-0.1-4.1-0.1-0.5 0-0.9-0.1-1.4-0.2-0.9-0.3-1.9-0.1-2.8-0.1-5.4 0.2-10.8 0.6-16.1 1.4-2.7 0.3-5.3 0.8-7.9 1.3-0.6 0.1-1.1 0.3-1.8 0.3-0.4 0-0.7-0.1-1.1-0.1-1.5 0-3 0.7-4.3 1.2-3 1-6 2.4-8.8 3.9-2.1 1.1-4 2.4-5.9 3.9-1 0.7-1.8 1.5-2.7 2.2-0.5 0.4-1.1 0.5-1.5 0.9s-0.7 0.8-1.1 1.2c-1 1-1.9 2-2.9 2.9-0.4 0.3-0.8 0.5-1.2 0.5-1.3-0.1-2.7-0.4-3.9-0.6-0.7-0.1-1.2 0-1.8 0-3.1 0-6.4-0.1-9.5 0.4-1.7 0.3-3.4 0.5-5.1 0.7-5.3 0.7-10.7 1.4-15.8 3.1-4.6 1.6-8.9 3.8-13.1 6.3-2.1 1.2-4.2 2.5-6.2 3.9-0.9 0.6-1.7 0.9-2.6 1.2s-1.7 1-2.5 1.6c-1.5 1.1-3 2.1-4.6 3.2-1.2 0.9-2.7 1.7-3.9 2.7-1 0.8-2.2 1.5-3.2 2.2-1.1 0.7-2.2 1.5-3.3 2.3-0.8 0.5-1.7 0.9-2.5 1.5-0.9 0.8-1.9 1.5-2.9 2.2 0.1-0.6 0.3-1.2 0.4-1.9 0.3-1.7 0.2-3.6 0-5.3-0.1-0.9-0.3-1.7-0.8-2.4s-1.5-1.1-2.3-0.8c-0.2 0-0.3 0.1-0.4 0.3s-0.1 0.4-0.1 0.6c0.3 3.6 0.2 7.2-0.7 10.7-0.5 2.2-1.5 4.5-2.7 6.4-0.6 0.9-1.4 1.7-2 2.6s-1.5 1.6-2.3 2.3c-0.2 0.2-0.5 0.4-0.6 0.7s0 0.7 0.1 1.1c0.2 0.8 0.6 1.6 1.3 1.8 0.5 0.1 0.9-0.1 1.3-0.3 0.9-0.4 1.8-0.8 2.7-1.2 0.4-0.2 0.7-0.3 1.1-0.6 1.8-1 3.8-1.7 5.8-2.3 4.3-1.1 9-1.1 13.3 0.1 0.2 0.1 0.4 0.1 0.6 0.1 0.7-0.1 0.9-1 0.6-1.6-0.4-0.6-1-0.9-1.7-1.2-2.5-1.1-4.9-2.1-7.5-2.7-0.6-0.2-1.3-0.3-2-0.4-0.3-0.1-0.5 0-0.8-0.1s-0.9 0-1.1-0.1-0.3 0-0.3-0.2c0-0.4 0.7-0.7 1-0.8 0.5-0.3 1-0.7 1.5-1l5.4-3.6c0.4-0.2 0.6-0.6 1-0.9 1.2-0.9 2.8-1.3 4-2.2 0.4-0.3 0.9-0.6 1.3-0.9l2.7-1.8c1-0.6 2.2-1.2 3.2-1.8 0.9-0.5 1.9-0.8 2.7-1.6 0.9-0.8 2.2-1.4 3.2-2 1.2-0.7 2.3-1.4 3.5-2.1 4.1-2.5 8.2-4.9 12.7-6.6 5.2-1.9 10.6-3.4 16.2-4 5.4-0.6 10.8-0.3 16.2-0.5h0.5c1.4-0.1 2.3-0.1 1.7 1.7-1.4 4.5 1.3 7.5 4.3 10 3.4 2.9 7 5.7 11.3 7.1 4.8 1.6 9.6 3.8 14.9 2.7 3-0.6 6.5-4 6.8-6.4 0.2-1.7 0.1-3.3-0.3-4.9-0.4-1.4-1-3-2.2-3.9-0.9-0.6-1.6-1.6-2.4-2.4-0.9-0.8-1.9-1.7-2.9-2.3-2.1-1.4-4.2-2.6-6.5-3.5-3.2-1.3-6.6-2.2-10-3-0.8-0.2-1.6-0.4-2.5-0.5-0.2 0-1.3-0.1-1.3-0.3-0.1-0.2 0.3-0.4 0.5-0.6 0.9-0.8 1.8-1.5 2.7-2.2 1.9-1.4 3.8-2.8 5.8-3.9 2.1-1.2 4.3-2.3 6.6-3.2 1.2-0.4 2.3-0.8 3.6-1 0.6-0.2 1.2-0.2 1.8-0.4 0.4-0.1 0.7-0.3 1.1-0.5 1.2-0.5 2.7-0.5 3.9-0.8 1.3-0.2 2.7-0.4 4.1-0.7 2.7-0.4 5.5-0.8 8.2-1.1 3.3-0.4 6.7-0.7 10-1 7.7-0.6 15.3-0.3 23 1.3 4.2 0.9 8.3 1.9 12.3 3.6 1.2 0.5 2.3 1.1 3.5 1.5 0.7 0.2 1.3 0.7 1.8 1.1 0.7 0.6 1.5 1.1 2.3 1.7 0.2 0.2 0.6 0.3 0.8 0.2 0.1-0.1 0.1-0.2 0.2-0.4 0.1-0.9-0.2-1.7-0.7-2.4-0.4-0.6-1-1.4-1.6-1.9-0.8-0.7-2-1.1-2.9-1.6-1-0.5-2-0.9-3.1-1.3-2.5-1.1-5.2-2-7.8-2.8-1-0.8-2.4-1.2-3.7-1.4zm-64.4 25.8c4.7 1.3 10.3 3.3 14.6 7.9 0.9 1 2.4 1.8 1.8 3.5-0.6 1.6-2.2 1.5-3.6 1.7-4.9 0.8-9.4-1.2-13.6-2.9-4.5-1.7-8.8-4.3-11.9-8.3-0.5-0.6-1-1.4-1.1-2.2 0-0.3 0-0.6-0.1-0.9s-0.2-0.6 0.1-0.9c0.2-0.2 0.5-0.2 0.8-0.2 2.3-0.1 4.7 0 7.1 0.4 0.9 0.1 1.6 0.6 2.5 0.8 1.1 0.4 2.3 0.8 3.4 1.1z"
                    ></path>
                  </svg>
                </figure>

                <h1>Blog Grid</h1>

                <div class="d-flex justify-content-center position-relative">
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                      <li class="breadcrumb-item">
                        <a href="#">Home</a>
                      </li>
                      <li class="breadcrumb-item active" aria-current="page">
                        Library
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="position-relative pt-0 pt-lg-5">
          <div class="container">
            <div class="row g-4">
				{blogs.map((blog,index) => (
					  <div class="col-sm-6 col-lg-4 col-xl-3" style={{height:"500px"}}>
					  <div class="card bg-transparent">
						<div class="overflow-hidden rounded-3">
						  <img
							src={`http://localhost:3000/uploads/${blog.blog_image}`}
							class="card-img"
							alt="course image"
              style={{height:"200px"}}
						  />
	  
						  <div class="bg-overlay bg-dark opacity-4"></div>
						  <div class="card-img-overlay d-flex align-items-start p-3">
							<a href="#" class="badge bg-success text-white">
							  {/* {blog.author_name} */} {blog.blog_category}
							</a>
						  </div>
						</div>
	  
						<div class="card-body">
						  <h5 class="card-title">
							<a href="#">{blog.blog_name}</a>
						  </h5>
						  <p class="text-truncate-2" dangerouslySetInnerHTML={{ __html: blog.blog_description }}>
						{/* {blog.blog_description} */}
						  </p>
	             <NavLink to={`/currentblog/?id=${blog._id}`}>   <button className="btn btn-primary">See More</button></NavLink>
						  <div class="d-flex justify-content-between">
							<h6 class="mb-0">
							  <a href="#">{blog.author_name}</a>
							</h6>
							<span class="small">12H Ago</span>
						  </div>
						</div>
					  </div>
					</div>
				))}
             

            

              {/* <div class="col-sm-6 col-lg-4 col-xl-3">
                <div class="card bg-transparent">
                  <div class="overflow-hidden rounded-3">
                    <img
                      src="assets/images/event/09.jpg"
                      class="card-img"
                      alt="course image"
                    />

                    <div class="bg-overlay bg-dark opacity-4"></div>
                    <div class="card-img-overlay d-flex align-items-start p-3">
                      <a href="#" class="badge bg-purple text-white">
                        Travel
                      </a>
                    </div>
                  </div>

                  <div class="card-body">
                    <h5 class="card-title">
                      <a href="#">
                        Never underestimate the influence of Eduport
                      </a>
                    </h5>
                    <p class="text-truncate-2">
                      Prospective students should start broadly and then narrow
                      their list
                    </p>

                    <div class="d-flex justify-content-between">
                      <h6 class="mb-0">
                        <a href="#">Joan Wallace</a>
                      </h6>
                      <span class="small">5D Ago</span>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div class="col-sm-6 col-lg-4 col-xl-3">
                <div class="card bg-transparent">
                  <div class="overflow-hidden rounded-3">
                    <img
                      src="assets/images/event/03.jpg"
                      class="card-img-top"
                      alt="course image"
                    />

                    <div class="bg-overlay bg-dark opacity-4"></div>
                    <div class="card-img-overlay d-flex align-items-start p-3">
                      <a href="#" class="badge bg-danger text-white">
                        Research
                      </a>
                    </div>
                  </div>

                  <div class="card-body">
                    <h5 class="card-title">
                      <a href="#">Covid-19 and the college experienced</a>
                    </h5>
                    <p class="text-truncate-2">
                      Rooms oh fully taken by worse do. Points afraid but may
                      end law. Points afraid but may end law.
                    </p>

                    <div class="d-flex justify-content-between">
                      <h6 class="mb-0">
                        <a href="#">Amanda Reed</a>
                      </h6>
                      <span class="small">July 21, 2021</span>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div class="col-sm-6 col-lg-4 col-xl-3">
                <div class="card bg-transparent">
                  <div class="overflow-hidden rounded-3">
                    <img
                      src="assets/images/event/07.jpg"
                      class="card-img-top"
                      alt="course image"
                    />

                    <div class="bg-overlay bg-dark opacity-4"></div>
                    <div class="card-img-overlay d-flex align-items-start p-3">
                      <a href="#" class="badge bg-success text-white">
                        Research
                      </a>
                    </div>
                  </div>

                  <div class="card-body">
                    <h5 class="card-title">
                      <a href="#">
                        Best Pinterest Boards for learning about business
                      </a>
                    </h5>
                    <p class="text-truncate-2">
                      Fully taken by worse do. Points afraid but may end law.
                      Points afraid but may end law.
                    </p>

                    <div class="d-flex justify-content-between">
                      <h6 class="mb-0">
                        <a href="#">Samuel Bishop</a>
                      </h6>
                      <span class="small">40D ago</span>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div class="col-sm-6 col-lg-4 col-xl-3">
                <div class="card bg-transparent">
                  <div class="overflow-hidden rounded-3">
                    <img
                      src="assets/images/event/04.jpg"
                      class="card-img-top"
                      alt="course image"
                    />

                    <div class="bg-overlay bg-dark opacity-4"></div>
                    <div class="card-img-overlay d-flex align-items-start p-3">
                      <a href="#" class="badge bg-primary text-white">
                        Sports
                      </a>
                    </div>
                  </div>

                  <div class="card-body">
                    <h5 class="card-title">
                      <a href="#">The Olympics are over, now what?</a>
                    </h5>
                    <p class="text-truncate-2">
                      Rooms oh fully taken by worse do. Points afraid but may
                      end law. Points afraid but may end law.
                    </p>

                    <div class="d-flex justify-content-between">
                      <h6 class="mb-0">
                        <a href="#">Carolyn Ortiz</a>
                      </h6>
                      <span class="small">Aug 31, 2021</span>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div class="col-sm-6 col-lg-4 col-xl-3">
                <div class="card bg-transparent">
                  <div class="overflow-hidden rounded-3">
                    <img
                      src="assets/images/event/05.jpg"
                      class="card-imgp"
                      alt="course image"
                    />

                    <div class="bg-overlay bg-dark opacity-4"></div>
                    <div class="card-img-overlay d-flex align-items-start p-3">
                      <a href="#" class="badge bg-info text-white">
                        Student story
                      </a>
                    </div>
                  </div>

                  <div class="card-body">
                    <h5 class="card-title">
                      <a href="#">Campus Support for First-Year Students</a>
                    </h5>
                    <p class="text-truncate-2">
                      Prospective students should start broadly and then narrow
                      their list
                    </p>

                    <div class="d-flex justify-content-between">
                      <h6 class="mb-0">
                        <a href="#">Lori Stevens</a>
                      </h6>
                      <span class="small">3M Ago</span>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div class="col-sm-6 col-lg-4 col-xl-3">
                <div class="card bg-transparent">
                  <div class="overflow-hidden rounded-3">
                    <img
                      src="assets/images/event/06.jpg"
                      class="card-imgp"
                      alt="course image"
                    />

                    <div class="bg-overlay bg-dark opacity-4"></div>
                    <div class="card-img-overlay d-flex align-items-start p-3">
                      <a href="#" class="badge bg-orange text-white">
                        Marketing
                      </a>
                    </div>
                  </div>

                  <div class="card-body">
                    <h5 class="card-title">
                      <a href="#">
                        Bad habits that people in the industry need to quit
                      </a>
                    </h5>
                    <p class="text-truncate-2">
                      Prospective students should start broadly and then narrow
                      their list
                    </p>

                    <div class="d-flex justify-content-between">
                      <h6 class="mb-0">
                        <a href="#">Louis Crawford</a>
                      </h6>
                      <span class="small">10D Ago</span>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            <nav
              class="d-flex justify-content-center mt-5"
              aria-label="navigation"
            >
              <ul class="pagination pagination-primary-soft rounded mb-0">
                <li class="page-item mb-0">
                  <a class="page-link" href="#" tabindex="-1">
                    <i class="fas fa-angle-double-left"></i>
                  </a>
                </li>
                <li class="page-item mb-0">
                  <a class="page-link" href="#">
                    1
                  </a>
                </li>
                <li class="page-item mb-0 active">
                  <a class="page-link" href="#">
                    2
                  </a>
                </li>
                <li class="page-item mb-0">
                  <a class="page-link" href="#">
                    ..
                  </a>
                </li>
                <li class="page-item mb-0">
                  <a class="page-link" href="#">
                    6
                  </a>
                </li>
                <li class="page-item mb-0">
                  <a class="page-link" href="#">
                    <i class="fas fa-angle-double-right"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </main>
    </>
  );
};

export default Blogs;

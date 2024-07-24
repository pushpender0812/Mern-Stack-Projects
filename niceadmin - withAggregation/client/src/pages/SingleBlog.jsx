import React, { useEffect, useState } from 'react'
import { useSearchParams,NavLink } from 'react-router-dom';
import {toast} from "react-toastify"

const SingleBlog = () => {

 
    const [blog,setBlog] = useState({})

      const [searchParams] = useSearchParams()
      const id = searchParams.get('id')
      console.log(id,"use Search");

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
	
	  


 
	const getBlog = async () => {
		try {
		  const response = await fetch(
			`http://localhost:3000/api/user/view-singleblog?id=${id}`,
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
	
			setBlog(data);
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
        getBlog()
		getBlogs();
	  },[]);




  return (
    <>
    

<main style={{marginTop:"120px"}}>
	
  
    <section className="pb-0 pt-4 pb-md-5">
        <div className="container">
            <div className="row">
                <div className="col-12">
    
                  
                    <div className="row">
                        
                        <div className="col-lg-3 align-items-center mt-4 mt-lg-5 order-2 order-lg-1" style={{textAlign:"left"}}>
                            <div className="text-lg-center">
                               
                                <div className="position-relative">
                                   
                                    <div className="avatar avatar-xxl">
                                        <img className="avatar-img rounded-circle" src={`http://localhost:3000/uploads/${blog.blog_image}`} alt="avatar"/>
                                    </div>
                                    <a href="#" className="h5 stretched-link mt-2 mb-0 d-block"> {blog.author_name}</a>
                                    <p className="mb-2">Editor at Eduport</p>
                                </div>
                             
                                <ul className="list-inline list-unstyled">
                                    <li className="list-inline-item d-lg-block my-lg-2">Nov 15, 2021</li>
                                    <li className="list-inline-item d-lg-block my-lg-2">5 min read</li>
                                    <li className="list-inline-item badge bg-orange text-white"><i className="far text-white fa-heart me-1"></i>266</li>
                                    <li className="list-inline-item badge bg-info text-white"><i className="far fa-eye me-1"></i>2K</li>
                                </ul>
                            </div>
                        </div>
    
                       
                        <div className="col-lg-9 order-1">
                          
                            <span>40D ago</span><span className="mx-2">|</span><div className="badge bg-success text-white"> {blog.blog_category}</div>
                           
                            <h1 className="mt-2 mb-0 display-5"> {blog.blog_name}</h1>
                            
                            <p className="mt-2"dangerouslySetInnerHTML={{ __html: blog.blog_description }} ></p>
                            {/* <p className="mb-0 mb-lg-3">Perceived end knowledge certainly day sweetness why cordially.  On forth doubt miles of child. Exercise joy man children rejoiced. Yet uncommonly his ten who diminution astonished. Demesne new manners savings staying had. Under folly balls, death own point now men. Match way these she avoids seeing death. She who drift their fat off. Ask a quick six seven offer see among. Handsome met debating sir dwelling age material. As style lived he worse dried. Offered related so visitors we private removed.</p> */}
                        </div>
                    </div>
                    
                  
                   
                </div>
            </div> 
            </div>
    </section>

    <section>
        <h1>Related Vlogs</h1>
    </section>

    <section className="position-relative pt-0 pt-lg-5">
    <div className="container">
        <div className="row g-4">
            {blogs.filter(blog => blog._id !== id).sort(() => Math.random() - 0.5).slice(0, 3).map((blog, index) => (
                    <div key={index} className="col-sm-6 col-lg-4 col-xl-3" style={{ height: "500px" }}>
                        <div className="card bg-transparent">
                            <div className="overflow-hidden rounded-3">
                                <img
                                    src={`http://localhost:3000/uploads/${blog.blog_image}`}
                                    className="card-img"
                                    alt="course image"
                                    style={{ height: "200px" }}
                                />
                                <div className="bg-overlay bg-dark opacity-4"></div>
                                <div className="card-img-overlay d-flex align-items-start p-3">
                                    <a href="#" className="badge bg-success text-white">
                                        {/* {blog.author_name} */} {blog.blog_category}
                                    </a>
                                </div>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <a href="#">{blog.blog_name}</a>
                                </h5>
                                <p className="text-truncate-2" dangerouslySetInnerHTML={{ __html: blog.blog_description }}>
                                    {/* {blog.blog_description} */}
                                </p>
                                <NavLink to={`/currentblog/?id=${blog._id}`}>
                                    <button className="btn btn-primary">See More</button>
                                </NavLink>
                                <div className="d-flex justify-content-between">
                                    <h6 className="mb-0">
                                        <a href="#">{blog.author_name}</a>
                                    </h6>
                                    <span className="small">12H Ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    </div>
</section>

    
    {/* <section className="pt-0">
        <div className="container">
       
            <div className="row mb-4">
                <div className="col-12">
                <h2 className="mb-0">You may also like</h2>
                </div>
            </div>
            
           
            <div className="tiny-slider arrow-round arrow-hover arrow-dark">
                <div className="tiny-slider-inner" data-autoplay="false" data-arrow="true" data-edge="2" data-dots="false" data-items="3" data-items-lg="2" data-items-sm="1">
                    
                   
                    <div className="card bg-transparent">
                        <div className="row g-0">
                          
                            <div className="col-md-4">
                                <img src="assets/images/event/06.jpg" className="img-fluid rounded-start" alt="..."/>
                            </div>
                           
                            <div className="col-md-8">
                                <div className="card-body">
                                    
                                    <h6 className="card-title"><a href="#">Dirty little secrets about the business industry</a></h6>
                                    <span className="small">July 21, 2021</span>
                                </div>
                            </div>
                        </div>
                    </div>
    
                 
                    <div className="card bg-transparent">
                        <div className="row g-0">
                            
                            <div className="col-md-4">
                                <img src="assets/images/event/04.jpg" className="img-fluid rounded-start" alt="..."/>
                            </div>
                           
                            <div className="col-md-8">
                                <div className="card-body">
                                  
                                    <h6 className="card-title"><a href="#">This is why this year will be the year of startups</a></h6>
                                    <span className="small">50min ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
    
                   
                    <div className="card bg-transparent">
                        <div className="row g-0">
                            
                            <div className="col-md-4">
                                <img src="assets/images/event/03.jpg" className="img-fluid rounded-start" alt="..."/>
                            </div>
                           
                            <div className="col-md-8">
                                <div className="card-body">
                                  
                                    <h6 className="card-title"><a href="#">Covid-19 and the college experienced</a></h6>
                                    <span className="small">Aug 31, 2021</span>
                                </div>
                            </div>
                        </div>
                    </div>
    
                  
                    <div className="card bg-transparent">
                        <div className="row g-0">
                           
                            <div className="col-md-4">
                                <img src="assets/images/event/05.jpg" className="img-fluid rounded-start" alt="..."/>
                            </div>
                           
                            <div className="col-md-8">
                                <div className="card-body">
                                   
                                    <h6 className="card-title"><a href="#">This is why this year will be the year of startups</a></h6>
                                    <span className="small">50min ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    </section>
    */}
    
    </main>
  </>
  )
}

export default SingleBlog

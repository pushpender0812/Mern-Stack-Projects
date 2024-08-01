import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/Auth';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Registration = () => {
  const { storeTokenInloclStr, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate("/");
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',  
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3).max(20).required("Please Enter Your Name"),
      email: Yup.string().email().required('Please Enter Your Email'),
      phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Please Enter your Mobile Number'),
      password: Yup.string().min(6).required("Please Enter Your Password")
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(`http://localhost:3000/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        });

        const res_data = await response.json();

        if (response.ok) {
          storeTokenInloclStr(res_data.token);
          toast.success("Registration success");
          navigate("/");
        } else {
          toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        }
      } catch (error) {
        console.log("User Register Error", error);
      }
    }
  }); 

  return (
    <main style={{marginTop:"90px"}}>
      <section className="p-1 d-flex align-items-center position-relative overflow-hidden ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-lg-6 d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 vh-lg-100">
              <div className="p-3 p-lg-5">
                <div className="text-center">
                  <h2 className="fw-bold">Welcome to our largest community</h2>
                  <p className="mb-0 h6 fw-light">Let's learn something new today!</p>
                </div>
                <img src="assets/images/element/02.svg" className="mt-5" alt="" />
                <div className="d-sm-flex mt-5 align-items-center justify-content-center">
                  <ul className="avatar-group mb-2 mb-sm-0">
                    <li className="avatar avatar-sm"><img className="avatar-img rounded-circle" src="assets/images/avatar/01.jpg" alt="avatar" /></li>
                    <li className="avatar avatar-sm"><img className="avatar-img rounded-circle" src="assets/images/avatar/02.jpg" alt="avatar" /></li>
                    <li className="avatar avatar-sm"><img className="avatar-img rounded-circle" src="assets/images/avatar/03.jpg" alt="avatar" /></li>
                    <li className="avatar avatar-sm"><img className="avatar-img rounded-circle" src="assets/images/avatar/04.jpg" alt="avatar" /></li>
                  </ul>
                  <p className="mb-0 h6 fw-light ms-0 ms-sm-3">4k+ Students joined us, now it's your turn.</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 m-auto">
              <div className="row my-5">
                <div className="col-sm-10 col-xl-8 m-auto">
                  <img src="assets/images/element/03.svg" className="h-40px mb-2" alt="" />
                  <h2>Sign up for your account!</h2>
                  <p className="lead mb-4">Nice to see you! Please Sign up with your account.</p>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="form-label">Name</label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-person-fill"></i></span>
                        <input
                          type="text"
                          name="name"
                          className="form-control border-0 bg-light rounded-end ps-1"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Name"
                          id="name"
                        />
                      </div>
                      {formik.touched.name && formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="form-label">Email address *</label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill"></i></span>
                        <input
                          type="email"
                          name="email"
                          className="form-control border-0 bg-light rounded-end ps-1"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="E-mail"
                          id="email"
                        />
                      </div>
                      {formik.touched.email && formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phone" className="form-label">Phone No</label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-telephone-fill"></i></span>
                        <input
                          type="text"
                          name="phone"
                          className="form-control border-0 bg-light rounded-end ps-1"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Enter Phone No"
                          id="phone"
                        />
                      </div>
                      {formik.touched.phone && formik.errors.phone ? <div className="text-danger">{formik.errors.phone}</div> : null}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">Password *</label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-lock"></i></span>
                        <input
                          type="password"
                          name="password"
                          className="form-control border-0 bg-light rounded-end ps-1"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="*********"
                          id="password"
                        />
                      </div>
                      {formik.touched.password && formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}
                    </div>
                    <div className="align-items-center mt-0">
                      <div className="d-grid">
                        <button className="btn btn-primary mb-0" type="submit">Sign Up</button>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="position-relative my-4">
                      <hr />
                      <p className="small position-absolute top-50 start-50 translate-middle bg-body px-5">Or</p>
                    </div>
                    <div className="col-xxl-6 d-grid">
                      <a href="#" className="btn bg-google mb-2 mb-xxl-0"><i className="fab fa-fw fa-google text-white me-2"></i>Signup with Google</a>
                    </div>
                    <div className="col-xxl-6 d-grid">
                      <a href="#" className="btn bg-facebook mb-0"><i className="fab fa-fw fa-facebook-f me-2"></i>Signup with Facebook</a>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <span>Already have an account?<a href="sign-in.html"> Sign in here</a></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Registration;

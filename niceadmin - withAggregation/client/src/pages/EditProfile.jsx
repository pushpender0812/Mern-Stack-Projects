import React, { useState } from "react";
import { useAuth } from "../../store/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { user,authorizationToken ,getCurrentUser} = useAuth();

  if (!user || !user.result) {
    return <div>Loading...</div>; // or handle the case when user data is not available
  }
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    name: user.result.name,
    email: user.result.email,
    phone: user.result.phone,
  });

  const [image, setImage] = useState(null);

  const [pass, setPass] = useState({
    password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const handleChangePass = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setPass({
      ...pass,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const passwordChange = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/user/update-password?_id=${user.result._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken
          },
          body: JSON.stringify(pass),
        }
      );
      const res_data = await response.json();
      if (response.ok) {
        setPass({
          password: "",
          new_password: "",
          confirm_password: "",
        });
        toast.success("Password Updated Successfully");
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log("User Password edit Error", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", formdata.name);
    formData.append("email", formdata.email);
    formData.append("phone", formdata.phone);
    if (image) {
      formData.append("image", image);
    }
  
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/edit-profile?_id=${user.result._id}`,
        {
          method: "POST",
          "Content-Type": "application/json",
          headers: {
            Authorization: authorizationToken
          },
          body: formData, // Use formData directly without JSON.stringify
        }
      );
      const res_data = await response.json();
      if (response.ok) {
        setFormdata({
          ...formdata, // Keep the existing state values
        });
        getCurrentUser();
        toast.success("Profile Updated Successfully");
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log("User Profile update Error", error);
    }
  };
  

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
                        <p className="my-1 fs-4">
                          {user.result.name}{" "}
                          <i className="bi bi-patch-check-fill text-info small"></i>
                        </p>
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item h6 fw-light me-3 mb-1 mb-sm-0">
                            <i className="fas fa-star text-warning me-2"></i>
                            4.5/5.0
                          </li>
                          <li className="list-inline-item h6 fw-light me-3 mb-1 mb-sm-0">
                            <i className="fas fa-user-graduate text-orange me-2"></i>
                            12k Enrolled Students
                          </li>
                          <li className="list-inline-item h6 fw-light me-3 mb-1 mb-sm-0">
                            <i className="fas fa-book text-purple me-2"></i>25
                            Courses
                          </li>
                        </ul>
                      </div>

                      <div className="d-flex align-items-center mt-2 mt-md-0">
                        <a
                          href="instructor-create-course.html"
                          className="btn btn-success mb-0"
                        >
                          Create a course
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

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
                <nav className="navbar navbar-light navbar-expand-xl mx-0">
                  <div
                    className="offcanvas offcanvas-end"
                    tabindex="-1"
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                  >
                    <div className="offcanvas-header bg-light">
                      <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                        My profile
                      </h5>
                      <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>

                    <div className="offcanvas-body p-3 p-xl-0">
                      <div className="bg-dark border rounded-3 pb-0 p-3 w-100">
                        <div className="list-group list-group-dark list-group-borderless">
                          <a
                            className="list-group-item"
                            href="instructor-dashboard.html"
                          >
                            <i className="bi bi-ui-checks-grid fa-fw me-2"></i>
                            Dashboard
                          </a>
                          <a
                            className="list-group-item"
                            href="instructor-manage-course.html"
                          >
                            <i className="bi bi-basket fa-fw me-2"></i>My
                            Courses
                          </a>
                          <a
                            className="list-group-item"
                            href="instructor-earning.html"
                          >
                            <i className="bi bi-graph-up fa-fw me-2"></i>
                            Earnings
                          </a>
                          <a
                            className="list-group-item"
                            href="instructor-studentlist.html"
                          >
                            <i className="bi bi-people fa-fw me-2"></i>Students
                          </a>
                          <a
                            className="list-group-item"
                            href="instructor-order.html"
                          >
                            <i className="bi bi-folder-check fa-fw me-2"></i>
                            Orders
                          </a>
                          <a
                            className="list-group-item"
                            href="instructor-review.html"
                          >
                            <i className="bi bi-star fa-fw me-2"></i>Reviews
                          </a>
                          <a
                            className="list-group-item active"
                            href="instructor-edit-profile.html"
                          >
                            <i className="bi bi-pencil-square fa-fw me-2"></i>
                            Edit Profile
                          </a>
                          <a
                            className="list-group-item"
                            href="instructor-payout.html"
                          >
                            <i className="bi bi-wallet2 fa-fw me-2"></i>Payouts
                          </a>
                          <a
                            className="list-group-item"
                            href="instructor-setting.html"
                          >
                            <i className="bi bi-gear fa-fw me-2"></i>Settings
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>

              <div className="col-xl-9">
                <div className="card border rounded-3">
                  <div className="card-header border-bottom">
                    <h3 className="mb-0">Edit Profile</h3>
                  </div>

                  <div className="card-body">
                    <div className="mb-4">
                      <h5 className="mb-0">Personal Information</h5>
                      <small>Edit your account information and settings.</small>
                    </div>

                    <form onSubmit={handleSubmit} className="row">
                      <div className="col-md-6">
                        <label className="form-label">Full name</label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          value={formdata.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          value={formdata.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone</label>
                        <input
                          className="form-control"
                          type="text"
                          name="phone"
                          value={formdata.phone}
                          onChange={handleChange}
                          
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Profile Picture</label>
                        <input
                          className="form-control"
                          type="file"
                          name="image"
                          accept="image/*"
                        
                          onChange={handleImageChange}
                        />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary mt-3">
                          Save Changes
                        </button>
                      </div>
                    </form>

                    <div className="mt-4">
                      <h5 className="mb-0">Change Password</h5>
                      <small>Change your account password.</small>
                    </div>

                    <form onSubmit={passwordChange} className="row mt-3">
                      <div className="col-md-6">
                        <label className="form-label">Current Password</label>
                        <input
                          className="form-control"
                          type="password"
                          name="password"
                          value={pass.password}
                          onChange={handleChangePass}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">New Password</label>
                        <input
                          className="form-control"
                          type="password"
                          name="new_password"
                          value={pass.new_password}
                          onChange={handleChangePass}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Confirm Password</label>
                        <input
                          className="form-control"
                          type="password"
                          name="confirm_password"
                          value={pass.confirm_password}
                          onChange={handleChangePass}
                        />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary mt-3">
                          Change Password
                        </button>
                      </div>
                    </form>
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

export default EditProfile;

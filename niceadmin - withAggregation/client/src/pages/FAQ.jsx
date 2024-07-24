import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/Auth";
import { toast } from "react-toastify";

const FAQ = () => {
  const { getCategory, authorizationToken, token ,user} = useAuth();
  const [answer, setAnswer] = useState([]);

  const [ask, setAsk] = useState({
    category_name: "",
    question: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAsk((prevAsk) => ({
      ...prevAsk,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    
  if (!user) {
	toast.error("Please Login to Ask Qustions")
	return
  }

    try {
      const response = await fetch(
        `http://localhost:3000/api/user/ask-question`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(ask),
        }
      );

      console.log("While asking question ", response);

      const res_data = await response.json();

    //   console.log("qustion token", res_data.token);

      if (response.ok) {
        setAsk({
          category_name: "",
          question: "",
        });
        toast.success("Qustion asked Successfully");
      } else {
        // console.log("Error While Login Not response");
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log("Error while asking qustion", error);
    }
  };

  const getAnswer = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/get-answer`,
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

        setAnswer(data);
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.extraDetails ? errorData.extraDetails : errorData.message
        );
      }
    } catch (error) {
      console.error("Error fetching Answers", error);
    }
  };

  useEffect(() => {
    getAnswer();
  });

  return (
    <>
      <main style={{ marginTop: "140px" }}>
        <section class="bg-light py-5">
          <div class="container">
            <div class="row g-4 g-md-5 position-relative">
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

                <h1 class="display-6">Hello, how can we help?</h1>
                <h3 style={{ color: "yellowgreen", marginTop: "80px" }}>
                  Please Select the Category to Ask The Qustion Related to
                  Question
                </h3>

                <div class="col-lg-8 mx-auto text-center mt-4">
                  <form
                    class="bg-body shadow rounded p-2"
                    onSubmit={handleSubmit}
                  >
                    <div class="input-group">
                      {/* // category data  api  */}

                      <select
                        name="category_name"
                        id="category_name"
                        value={ask.category_name}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {getCategory.map((ele, index) => (
                          <option key={index} value={ele.category_name}>
                            {ele.category_name}
                          </option>
                        ))}
                      </select>

                      <input
                        class="form-control border-0 me-1"
                        value={ask.question}
                        onChange={handleChange}
                        type="text"
                        name="question"
                        placeholder="Ask a question for this particular category..."
                        required
                      />
                      <button type="submit" class="btn btn-blue mb-0 rounded">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div class="col-12">
                <div class="row g-4 text-center">
                  <p class="mb-0">
                    Choose a category to quickly find the help you need
                  </p>

                  <div class="col-sm-6 col-md-3">
                    <div class="card card-body card-border-hover p-0">
                      <a href="#" class="p-3">
                        <h2>
                          <i class="fas fa-street-view transition-base"></i>
                        </h2>
                        <h6 class="mb-0">User Guide</h6>
                      </a>
                    </div>
                  </div>

                  <div class="col-sm-6 col-md-3">
                    <div class="card card-body card-border-hover p-0">
                      <a href="#" class="p-3">
                        <h2>
                          <i class="fas fa-hands-helping transition-base"></i>
                        </h2>
                        <h6 class="mb-0">Assistance</h6>
                      </a>
                    </div>
                  </div>

                  <div class="col-sm-6 col-md-3">
                    <div class="card card-body card-border-hover p-0">
                      <a href="#" class="p-3">
                        <h2>
                          <i class="fas fa-exclamation-circle transition-base"></i>
                        </h2>
                        <h6 class="mb-0">General guide</h6>
                      </a>
                    </div>
                  </div>

                  <div class="col-sm-6 col-md-3">
                    <div class="card card-body card-border-hover p-0">
                      <a href="#" class="p-3">
                        <h2>
                          <i class="fas fa-flag transition-base"></i>
                        </h2>
                        <h6 class="mb-0">Getting started</h6>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="pt-5 pb-0 pb-lg-5">
          <div class="container">
            <div class="row g-4 g-md-5">
              <div class="col-lg-8">
                <h3 class="mb-4">Frequently Asked Questions</h3>

                <div
                  class="accordion accordion-icon accordion-bg-light"
                  id="accordionExample2"
                >
                  {answer.map((ans, index) =>
                  
                    	<div class="accordion-item mb-3">
                    	<h6 class="accordion-header font-base" id="heading-1">
                    		<button class="accordion-button fw-bold rounded d-inline-block collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-11" aria-expanded="true" aria-controls="collapse-11">
                    			{ans.question}
                    		</button>
                    	</h6>	

                    	<div id="collapse-11" class="accordion-collapse collapse show" aria-labelledby="heading-1" data-bs-parent="#accordionExample2">
                    		<div class="accordion-body mt-3">
                    			{ans.answer}
                    		</div>
                    	</div>
                    </div>
                  )}

                  {/* <div class="accordion-item mb-3">
                    <h6 class="accordion-header font-base" id="heading-1">
                      <button
                        class="accordion-button fw-bold rounded d-inline-block collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-1"
                        aria-expanded="true"
                        aria-controls="collapse-1"
                      >
                        How can we help?
                      </button>
                    </h6>

                    <div
                      id="collapse-1"
                      class="accordion-collapse collapse show"
                      aria-labelledby="heading-1"
                      data-bs-parent="#accordionExample2"
                    >
                      <div class="accordion-body mt-3">
                        Yet remarkably appearance gets him his projection.
                        Diverted endeavor bed peculiar men the not desirous.
                        Acuteness abilities ask can offending furnished
                        fulfilled sex. Warrant fifteen exposed ye at mistake.
                        Blush since so in noisy still built up an again. As
                        young ye hopes no he place means. Partiality diminution
                        gay yet entreaties admiration. In mention perhaps
                        attempt pointed suppose. Unknown ye chamber of warrant
                        of Norland arrived.
                      </div>
                    </div>
                  </div>

                  <div class="accordion-item mb-3">
                    <h6 class="accordion-header font-base" id="heading-2">
                      <button
                        class="accordion-button fw-bold rounded d-inline-block collapsed d-block pe-5"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-2"
                        aria-expanded="false"
                        aria-controls="collapse-2"
                      >
                        How to edit my Profile?
                      </button>
                    </h6>

                    <div
                      id="collapse-2"
                      class="accordion-collapse collapse"
                      aria-labelledby="heading-2"
                      data-bs-parent="#accordionExample2"
                    >
                      <div class="accordion-body mt-3">
                        What deal evil rent by real in. But her ready least set
                        lived spite solid. September how men saw tolerably two
                        behavior arranging. She offices for highest and replied
                        one venture pasture. Applauded no discovery in newspaper
                        allowance am northward. Frequently partiality possession
                        resolution at or appearance unaffected me. Engaged its
                        was the evident pleased husband. Ye goodness felicity do
                        disposal dwelling no. First am plate jokes to began to
                        cause a scale. Subjects he prospect elegance followed no
                        overcame possible it on. Improved own provided blessing
                        may peculiar domestic. Sight house has sex never. No
                        visited raising gravity outward subject my cottage Mr
                        be.
                      </div>
                    </div>
                  </div>

                  <div class="accordion-item mb-3">
                    <h6 class="accordion-header font-base" id="heading-3">
                      <button
                        class="accordion-button fw-bold collapsed rounded d-block pe-5"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-3"
                        aria-expanded="false"
                        aria-controls="collapse-3"
                      >
                        How much should I offer the sellers?
                      </button>
                    </h6>

                    <div
                      id="collapse-3"
                      class="accordion-collapse collapse"
                      aria-labelledby="heading-3"
                      data-bs-parent="#accordionExample2"
                    >
                      <div class="accordion-body mt-3">
                        Post no so what deal evil rent by real in. But her ready
                        least set lived spite solid. September how men saw
                        tolerably two behavior arranging. She offices for
                        highest and replied one venture pasture. Applauded no
                        discovery in newspaper allowance am northward.
                        Frequently partiality possession resolution at or
                        appearance unaffected me. Engaged its was the evident
                        pleased husband. Ye goodness felicity do disposal
                        dwelling no. First am plate jokes to began to cause a
                        scale. Subjects he prospect elegance followed no
                        overcame possible it on. Improved own provided blessing
                        may peculiar domestic. Sight house has sex never. No
                        visited raising gravity outward subject my cottage Mr
                        be. Hold do at tore in park feet near my case.
                        Invitation at understood occasional sentiments
                        insipidity inhabiting in. Off melancholy alteration
                        principles old. Is do speedily kindness properly oh.
                        Respect article painted cottage he is offices parlors.
                      </div>
                    </div>
                  </div>

                  <div class="accordion-item mb-3">
                    <h6 class="accordion-header font-base" id="heading-4">
                      <button
                        class="accordion-button fw-bold collapsed rounded d-block pe-5"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-4"
                        aria-expanded="false"
                        aria-controls="collapse-4"
                      >
                        Installation Guide
                      </button>
                    </h6>

                    <div
                      id="collapse-4"
                      class="accordion-collapse collapse"
                      aria-labelledby="heading-4"
                      data-bs-parent="#accordionExample2"
                    >
                      <div class="accordion-body mt-3">
                        <p>
                          What deal evil rent by real in. But her ready least
                          set lived spite solid. September how men saw tolerably
                          two behavior arranging. She offices for highest and
                          replied one venture pasture. Applauded no discovery in
                          newspaper allowance am northward. Frequently
                          partiality possession resolution at or appearance
                          unaffected me. Engaged its was the evident pleased
                          husband. Ye goodness felicity do disposal dwelling no.
                          First am plate jokes to began to cause a scale.
                          Subjects he prospect elegance followed no overcame
                          possible it on. Improved own provided blessing may
                          peculiar domestic. Sight house has sex never. No
                          visited raising gravity outward subject my cottage Mr
                          be.
                        </p>
                        <p class="mb-0">
                          At the moment, we only accept Credit/Debit cards and
                          Paypal payments. Paypal is the easiest way to make
                          payments online. While checking out your order. Be
                          sure to fill in correct details for fast & hassle-free
                          payment processing.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="accordion-item mb-3">
                    <h6 class="accordion-header font-base" id="heading-5">
                      <button
                        class="accordion-button fw-bold collapsed rounded d-block pe-5"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-5"
                        aria-expanded="false"
                        aria-controls="collapse-5"
                      >
                        Additional Options and Services
                      </button>
                    </h6>

                    <div
                      id="collapse-5"
                      class="accordion-collapse collapse"
                      aria-labelledby="heading-5"
                      data-bs-parent="#accordionExample2"
                    >
                      <div class="accordion-body mt-3">
                        Post no so what deal evil rent by real in. But her ready
                        least set lived spite solid. September how men saw
                        tolerably two behavior arranging. She offices for
                        highest and replied one venture pasture. Applauded no
                        discovery in newspaper allowance am northward.
                        Frequently partiality possession resolution at or
                        appearance unaffected me. Engaged its was the evident
                        pleased husband. Ye goodness felicity do disposal
                        dwelling no. First am plate jokes to began to cause a
                        scale. Subjects he prospect elegance followed no
                        overcame possible it on. Improved own provided blessing
                        may peculiar domestic. Sight house has sex never. No
                        visited raising gravity outward subject my cottage Mr
                        be. Hold do at tore in park feet near my case.
                        Invitation at understood occasional sentiments
                        insipidity inhabiting in. Off melancholy alteration
                        principles old. Is do speedily kindness properly oh.
                        Respect article painted cottage he is offices parlors.
                      </div>
                    </div>
                  </div> */}

                  {/* <div class="accordion-item">
                    <h6 class="accordion-header font-base" id="heading-6">
                      <button
                        class="accordion-button fw-bold collapsed rounded d-block pe-5"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-6"
                        aria-expanded="false"
                        aria-controls="collapse-6"
                      >
                        What's are the difference between a college and a
                        university?
                      </button>
                    </h6>

                    <div
                      id="collapse-6"
                      class="accordion-collapse collapse"
                      aria-labelledby="heading-6"
                      data-bs-parent="#accordionExample2"
                    >
                      <div class="accordion-body mt-3">
                        Post no so what deal evil rent by real in. But her ready
                        least set lived spite solid. September how men saw
                        tolerably two behavior arranging. She offices for
                        highest and replied one venture pasture. Applauded no
                        discovery in newspaper allowance am northward.
                        Frequently partiality possession resolution at or
                        appearance unaffected me. Engaged its was the evident
                        pleased husband. Ye goodness felicity do disposal
                        dwelling no. First am plate jokes to began to cause a
                        scale. Subjects he prospect elegance followed no
                        overcame possible it on. Improved own provided blessing
                        may peculiar domestic. Sight house has sex never. No
                        visited raising gravity outward subject my cottage Mr
                        be. Hold do at tore in park feet near my case.
                        Invitation at understood occasional sentiments
                        insipidity inhabiting in. Off melancholy alteration
                        principles old. Is do speedily kindness properly oh.
                        Respect article painted cottage he is offices parlors.
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>

              <div class="col-lg-4">
                <div class="row mb-5 mb-lg-0">
                  <div class="col-12 col-sm-6 col-lg-12">
                    <div class="mb-4">
                      <div class="d-flex justify-content-between align-items-center bg-info bg-opacity-10 rounded p-2 position-relative mb-3">
                        <h6 class="m-0 text-info">Last Question</h6>
                        <a
                          href="#"
                          class="badge text-white bg-info stretched-link"
                        >
                          2D ago
                        </a>
                      </div>
                      <div class="d-flex justify-content-between align-items-center bg-danger bg-opacity-10 rounded p-2 position-relative mb-3">
                        <h6 class="m-0 text-danger">Total Question</h6>
                        <a
                          href="#"
                          class="badge text-white bg-danger stretched-link"
                        >
                          15,525
                        </a>
                      </div>
                      <div class="d-flex justify-content-between align-items-center bg-success bg-opacity-10 rounded p-2 position-relative mb-3">
                        <h6 class="m-0 text-success">Answer</h6>
                        <a
                          href="#"
                          class="badge text-white bg-success stretched-link"
                        >
                          12536
                        </a>
                      </div>
                    </div>

                    <div class="card card-body shadow p-4 mb-4">
                      <h4 class="mb-3">Related Topic</h4>

                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <a href="#" class="h6 fw-light">
                          <i class="fas fa-caret-right text-orange me-2"></i>
                          Business
                        </a>
                        <span class="small">(21)</span>
                      </div>

                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <a href="#" class="h6 fw-light">
                          <i class="fas fa-caret-right text-orange me-2"></i>
                          Development
                        </a>
                        <span class="small">(86)</span>
                      </div>

                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <a href="#" class="h6 fw-light">
                          <i class="fas fa-caret-right text-orange me-2"></i>
                          Design
                        </a>
                        <span class="small">(92)</span>
                      </div>

                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <a href="#" class="h6 fw-light">
                          <i class="fas fa-caret-right text-orange me-2"></i>
                          Marketing
                        </a>
                        <span class="small">(62)</span>
                      </div>

                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <a href="#" class="h6 fw-light">
                          <i class="fas fa-caret-right text-orange me-2"></i>
                          Technology
                        </a>
                        <span class="small">(31)</span>
                      </div>

                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <a href="#" class="h6 fw-light">
                          <i class="fas fa-caret-right text-orange me-2"></i>
                          Course Taking
                        </a>
                        <span class="small">(06)</span>
                      </div>

                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <a href="#" class="h6 fw-light">
                          <i class="fas fa-caret-right text-orange me-2"></i>
                          Getting Started
                        </a>
                        <span class="small">(28)</span>
                      </div>

                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <a href="#" class="h6 fw-light">
                          <i class="fas fa-caret-right text-orange me-2"></i>
                          Mobile
                        </a>
                        <span class="small">(18)</span>
                      </div>

                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <a href="#" class="h6 fw-light">
                          <i class="fas fa-caret-right text-orange me-2"></i>
                          Payment Option
                        </a>
                        <span class="small">(32)</span>
                      </div>

                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <a href="#" class="h6 fw-light">
                          <i class="fas fa-caret-right text-orange me-2"></i>
                          Account & Profile
                        </a>
                        <span class="small">(56)</span>
                      </div>

                      <div class="d-flex justify-content-between align-items-center">
                        <a href="#" class="h6 fw-light">
                          <i class="fas fa-caret-right text-orange me-2"></i>
                          Course taking
                        </a>
                        <span class="small">(45)</span>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-sm-6 col-lg-12">
                    <div class="card card-body shadow p-4">
                      <h4 class="mb-3">Popular Tags</h4>
                      <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                          <a class="btn btn-outline-light btn-sm" href="#">
                            blog
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a class="btn btn-outline-light btn-sm" href="#">
                            business
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a class="btn btn-outline-light btn-sm" href="#">
                            theme
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a class="btn btn-outline-light btn-sm" href="#">
                            bootstrap
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a class="btn btn-outline-light btn-sm" href="#">
                            data science
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a class="btn btn-outline-light btn-sm" href="#">
                            web development
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a class="btn btn-outline-light btn-sm" href="#">
                            tips
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a class="btn btn-outline-light btn-sm" href="#">
                            machine learning
                          </a>
                        </li>
                      </ul>
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

export default FAQ;

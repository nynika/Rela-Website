import "./NavBar.css";

function NavBar() {
  return (
    <>
      <div className="header-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-9">
              <div className="top-left-menu">
                <div className="row">
                  <div className="col-lg-4">
                    <div id="social-sharing" className="social-sharing">
                      <ul>
                        <li>
                          <a href="https://twitter.com/Rela_Institute">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.facebook.com/dr.relainstitute/">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.instagram.com/relainstitute/">
                            <i className="fab fa-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.linkedin.com/company/dr-rela-institute-and-medical-centre/">
                            <i className="fab fa-linkedin"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.youtube.com/c/RelaHospital">
                            <i className="fab fa-youtube"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div id="top-menu" className="top-menu">
                      <ul>
                        <li>
                          <a href="https://www.relainstitute.com/about-us/">
                            ABOUT US
                          </a>
                        </li>
                        <li>
                          <a href="https://www.relainstitute.com/academics/">
                            ACADEMICS
                          </a>
                        </li>
                        <li>
                          <a href="https://www.relainstitute.com/careers/">
                            CAREERS
                          </a>
                        </li>
                        <li>
                          <a href="https://www.relainstitute.com/media">
                            MEDIA
                          </a>
                        </li>
                        <li>
                          <a href="https://www.relainstitute.com/events">
                            EVENTS
                          </a>
                        </li>
                        <li>
                          <a href="https://www.relainstitute.com/blog">BLOG</a>
                        </li>
                        <li>
                          <a href="https://www.relainstitute.com/contact-us/">
                            CONTACT
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="top-right-menu">
                <ul>
                  <li>
                    <a
                      className="packagebutton"
                      href="https://www.relainstitute.com/#makeanenquiry"
                    >
                      Make an Enquiry
                    </a>
                  </li>
                  {/* <!-- className="targetddiv" targetdivname="make-an-enquiry" --> */}
                  {/* <!-- <li><a href="#"><i className="fa-solid fa-user"></i> Sign In</a></li>--> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-sm-8 leftlogomobile">
              <div className="logo">
                <a href="https://www.relainstitute.com/">
                  <img
                    loading="eager"
                    decoding="sync"
                    fetchpriority="high"
                    src="https://www.relainstitute.com/wp-content/themes/relainstitute/img/logo.png"
                    alt="Logo"
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-7 mobiletabbottom">
              <div className="main-menu">
                <ul>
                  <li className="icon-m">
                    <a href="https://www.relainstitute.com/full-body-checkup/">
                      <img
                        loading="eager"
                        decoding="sync"
                        fetchpriority="high"
                        src="https://www.relainstitute.com/wp-content/themes/relainstitute/img/icons/health-package.svg"
                      />{" "}
                      Health <br />
                      Packages
                    </a>
                  </li>
                  {/* <li className="icon-m icon-2 mobiletabhiddenicon"><a href="#">Lab <br/>Services</a></li>
                                    <li className="icon-m icon-3"><a href="https://www.relainstitute.com/online-payment/">Online <br/>Payment</a></li> */}
                  <li className="icon-m">
                    <a href="https://www.relainstitute.com/doctors/">
                      <img
                        src="https://www.relainstitute.com/wp-content/themes/relainstitute/img/icons/find-a-doctor.svg"
                        loading="eager"
                        decoding="sync"
                        fetchpriority="high"
                      />{" "}
                      Find a <br />
                      Doctor
                    </a>
                  </li>
                  <li
                    className="icon-m modal_appointment_button"
                    modaltypename="Book an Appointment"
                    posturl="https://www.relainstitute.com/patient-portal/"
                  >
                    <a>
                      <img
                        src="https://www.relainstitute.com/wp-content/themes/relainstitute/img/icons/book-an-appointment.svg"
                        loading="eager"
                        decoding="sync"
                        fetchpriority="high"
                      />{" "}
                      Book an <br />
                      Appointment
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div id="menufixed" className="col-lg-2 col-sm-4 rightlogomobile">
              <div className="search-menu">
                <ul>
                  <li>
                    <a
                      className="search-heyperlink"
                      href="https://www.relainstitute.com/rela-search/"
                    >
                      <i className="fa fa-search"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="modal_phonenumber_button"
                      href="tel:+919384681770"
                    >
                      <i className="fa fa-phone"></i>
                    </a>
                  </li>
                  <li className="hiddenmaxdevice">
                    <a onclick="openNav();">
                      <i id="mobilemenubutton" className="fa fa-bars"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div id="mobiletabsidebar" className="header-bottom-nav">
        <div className="main-nav">
          <div id="mega-menu-wrap-main_menu" className="mega-menu-wrap">
            <div className="mega-menu-toggle">
              <div className="mega-toggle-blocks-left">
                <div
                  className="mega-toggle-block mega-menu-toggle-block mega-toggle-block-1"
                  id="mega-toggle-block-1"
                >
                  <span
                    className="mega-toggle-label"
                    role="button"
                    aria-expanded="false"
                  >
                    <span className="mega-toggle-label-closed">MENU</span>
                    <span className="mega-toggle-label-open">MENU</span>
                  </span>
                </div>
                <div
                  className="mega-toggle-block mega-menu-toggle-animated-block mega-toggle-block-2"
                  id="mega-toggle-block-2"
                >
                  <button
                    aria-label="Toggle Menu"
                    className="mega-toggle-animated mega-toggle-animated-slider"
                    type="button"
                    aria-expanded="false"
                  >
                    <span className="mega-toggle-animated-box">
                      <span className="mega-toggle-animated-inner"></span>
                    </span>
                  </button>
                </div>
                <div
                  className="mega-toggle-block mega-spacer-block mega-toggle-block-3"
                  id="mega-toggle-block-3"
                ></div>
              </div>
              <div className="mega-toggle-blocks-center"></div>
              <div className="mega-toggle-blocks-right">
                <div
                  className="mega-toggle-block mega-menu-toggle-animated-block mega-toggle-block-4"
                  id="mega-toggle-block-4"
                >
                  <button
                    aria-label="Toggle Menu"
                    className="mega-toggle-animated mega-toggle-animated-slider"
                    type="button"
                    aria-expanded="false"
                  >
                    <span className="mega-toggle-animated-box">
                      <span className="mega-toggle-animated-inner"></span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <ul
              id="mega-menu-main_menu"
              className="mega-menu max-mega-menu mega-menu-horizontal mega-no-js"
              data-event="hover"
              data-effect="fade_up"
              data-effect-speed="400"
              data-effect-mobile="slide"
              data-effect-speed-mobile="400"
              data-mobile-force-width="false"
              data-second-click="go"
              data-document-click="collapse"
              data-vertical-behaviour="standard"
              data-breakpoint="992"
              data-unbind="true"
              data-mobile-state="collapse_all"
              data-hover-intent-timeout="300"
              data-hover-intent-interval="100"
            >
              <li
                className="mega-menu-item mega-menu-item-type-custom mega-menu-item-object-custom mega-menu-item-has-children mega-menu-megamenu mega-align-bottom-left mega-menu-grid mega-menu-item-4250"
                id="mega-menu-item-4250"
              >
                <a
                  className="mega-menu-link"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ textDecoration: "none" }}
                >
                  CLINICAL EXCELLENCE
                  <span
                    className="mega-indicator"
                    role="button"
                    aria-label="CLINICAL EXCELLENCE submenu"
                  ></span>
                </a>
                <ul className="mega-sub-menu" id="mobiledropdown">
                  <li className="mega-menu-row" id="mega-menu-4250-0">
                    <ul className="mega-sub-menu">
                      <li
                        className="mega-menu-column mega-menu-columns-6-of-12"
                        id="mega-menu-4250-0-0"
                      >
                        <ul className="mega-sub-menu">
                          <li
                            className="mega-menu-item mega-menu-item-type-custom mega-menu-item-object-custom mega-menu-item-has-children mega-menu-item-4879"
                            id="mega-menu-item-4879"
                          >
                            <a className="mega-menu-link">
                              INSTITUTE
                              <span
                                className="mega-indicator"
                                role="button"
                                aria-label="INSTITUTE submenu"
                              ></span>
                            </a>
                            <ul className="mega-sub-menu">
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4470"
                                id="mega-menu-item-4470"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/institute-of-liver-disease-transplantation/"
                                >
                                  Liver Disease &#038; Transplantation
                                </a>
                              </li>{" "}
                            </ul>
                          </li>
                          <li
                            className="mega-menu-item mega-menu-item-type-custom mega-menu-item-object-custom mega-menu-item-has-children mega-2-columns mega-menu-item-4308"
                            id="mega-menu-item-4308"
                          >
                            <a className="mega-menu-link">
                              Centres of Excellence
                              <span
                                className="mega-indicator"
                                role="button"
                                aria-label="Centres of Excellence submenu"
                              ></span>
                            </a>
                            <ul className="mega-sub-menu">
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4471"
                                id="mega-menu-item-4471"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/institute-of-advanced-paediatrics/"
                                >
                                  Advanced Paediatrics
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4472"
                                id="mega-menu-item-4472"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/institute-of-anesthesia-and-critical-care/"
                                >
                                  Anaesthesia &#038; Critical Care
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4473"
                                id="mega-menu-item-4473"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/institute-of-cardiac-sciences/"
                                >
                                  Cardiac Sciences
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4474"
                                id="mega-menu-item-4474"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/institute-of-gastro-sciences/"
                                >
                                  Gastro Sciences
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4475"
                                id="mega-menu-item-4475"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/institute-of-neuro-sciences/"
                                >
                                  Neuroscience
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4476"
                                id="mega-menu-item-4476"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/institute-of-cancer-centre/"
                                >
                                  Cancer Centre
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4477"
                                id="mega-menu-item-4477"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/institute-of-orthopaedics/"
                                >
                                  Orthopaedics
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4478"
                                id="mega-menu-item-4478"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/institute-of-renal-sciences/"
                                >
                                  Renal Sciences
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4479"
                                id="mega-menu-item-4479"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/institute-of-trauma-centre-and-care/"
                                >
                                  Trauma Centre and Care
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4480"
                                id="mega-menu-item-4480"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/institute-of-reproductive-medicine/"
                                >
                                  Reproductive Medicine
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4481"
                                id="mega-menu-item-4481"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/institute-of-womens-health/"
                                >
                                  Women’s Health
                                </a>
                              </li>{" "}
                            </ul>
                          </li>{" "}
                        </ul>
                      </li>
                      <li
                        className="mega-menu-column mega-menu-columns-6-of-12"
                        id="mega-menu-4250-0-1"
                      >
                        <ul className="mega-sub-menu">
                          <li
                            className="mega-menu-item mega-menu-item-type-custom mega-menu-item-object-custom mega-menu-item-has-children mega-2-columns mega-menu-item-4290"
                            id="mega-menu-item-4290"
                          >
                            <a className="mega-menu-link">
                              Departments
                              <span
                                className="mega-indicator"
                                role="button"
                                aria-label="Departments submenu"
                              ></span>
                            </a>
                            <ul className="mega-sub-menu">
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4533"
                                id="mega-menu-item-4533"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/pulmonary-medicine/"
                                >
                                  Pulmonary Medicine
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4534"
                                id="mega-menu-item-4534"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/endocrinology-and-diabetology/"
                                >
                                  Endocrinology and Diabetology
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4535"
                                id="mega-menu-item-4535"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/ear-nose-throat/"
                                >
                                  Ear, Nose &#038; Throat
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4536"
                                id="mega-menu-item-4536"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/dermatology/"
                                >
                                  Dermatology
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4537"
                                id="mega-menu-item-4537"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/ophthalmology/"
                                >
                                  Ophthalmology
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4538"
                                id="mega-menu-item-4538"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/urology/"
                                >
                                  Urology
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-7220"
                                id="mega-menu-item-7220"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/bariatric-metabolic-surgery/"
                                >
                                  Bariatric &#038; Metabolic Surgery
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4540"
                                id="mega-menu-item-4540"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/dental-surgery/"
                                >
                                  Dental Surgery
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4541"
                                id="mega-menu-item-4541"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/vascular-surgery/"
                                >
                                  Vascular surgery
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4542"
                                id="mega-menu-item-4542"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/psychiatry-and-psychotherapy/"
                                >
                                  Psychiatry and Psychotherapy
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4543"
                                id="mega-menu-item-4543"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/infectious-disease/"
                                >
                                  Infectious Disease
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4544"
                                id="mega-menu-item-4544"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/clinical-laboratory/"
                                >
                                  Clinical Laboratory
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4546"
                                id="mega-menu-item-4546"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/plastic-and-reconstructive-surgery/"
                                >
                                  Plastic and Reconstructive Surgery
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4547"
                                id="mega-menu-item-4547"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/transfusion-medicine/"
                                >
                                  Transfusion Medicine
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4880"
                                id="mega-menu-item-4880"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/internal-medicine-and-diabetology/"
                                >
                                  Internal Medicine &#038; Diabetology
                                </a>
                              </li>
                              <li
                                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-department mega-menu-item-4549"
                                id="mega-menu-item-4549"
                              >
                                <a
                                  className="mega-menu-link"
                                  href="https://www.relainstitute.com/department/interventional-radiology-and-imaging-services/"
                                >
                                  Interventional Radiology and Imaging Services
                                </a>
                              </li>{" "}
                            </ul>
                          </li>{" "}
                        </ul>
                      </li>{" "}
                    </ul>
                  </li>
                </ul>
              </li>
              <li
                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-align-bottom-left mega-menu-flyout mega-menu-item-4307"
                id="mega-menu-item-4307"
              >
                <a
                  className="mega-menu-link"
                  href="https://www.relainstitute.com/international-patients/"
                  style={{ textDecoration: "none" }}
                >
                  INTERNATIONAL PATIENTS
                </a>
              </li>
              <li
                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-align-bottom-left mega-menu-flyout mega-menu-item-4254"
                id="mega-menu-item-4254"
              >
                <a
                  className="mega-menu-link"
                  href="https://www.relainstitute.com/patient-care/"
                  style={{ textDecoration: "none" }}
                >
                  PATIENT CARE
                </a>
              </li>
              <li
                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-align-bottom-left mega-menu-flyout mega-menu-item-4257"
                id="mega-menu-item-4257"
              >
                <a
                  className="mega-menu-link"
                  href="https://www.relainstitute.com/locations/"
                  style={{ textDecoration: "none" }}
                >
                  LOCATIONS
                </a>
              </li>
              <li
                className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-align-bottom-left mega-menu-flyout mega-menu-item-7629"
                id="mega-menu-item-7629"
              >
                <a
                  className="mega-menu-link"
                  href="https://www.relainstitute.com/resource-centre/"
                  style={{ textDecoration: "none" }}
                >
                  RESOURCE CENTRE
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;

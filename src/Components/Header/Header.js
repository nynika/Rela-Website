import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Container, Row, Col, Button } from "react-bootstrap";
import SplitButton from "react-bootstrap/SplitButton";
import Dropdown from "react-bootstrap/Dropdown";

const Header = () => {
  return (
    <>
      <Navbar expand="lg">
        <Container fluid style={{ margin: "auto" }}>
          <div className="mobile-container">
            <div>
              <Navbar.Toggle aria-controls="navbarScroll" />
            </div>
            <Navbar.Brand
              href="https://www.relainstitute.com/"
              className="mobile-logo"
              style={{ width: "180px" }}
            >
              <a href="https://www.relainstitute.com/">
                <img
                  src={require("./rela-logo.png")}
                  alt="Dr Rela Institute &amp; Medical Centre, Chennai, India"
                  title="Dr Rela Institute &amp; Medical Centre"
                  className="img-responsive"
                  style={{ width: "180px" }}
                />
              </a>
            </Navbar.Brand>
          </div>

          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-3 my-lg-0"
              style={{
                maxHeight: "300px",
                position: "relative",
                overflowX: "hidden",
              }}
              navbarScroll
            >
              <Navbar.Brand className="none" style={{ width: "300px" }}>
                <a href="https://www.relainstitute.com/">
                  <img
                    src={require("./rela-logo.png")}
                    alt="Dr Rela Institute &amp; Medical Centre, Chennai, India"
                    title="Dr Rela Institute &amp; Medical Centre"
                    className="img-responsive"
                    style={{ width: "300px" }}
                  />
                </a>
              </Navbar.Brand>
              <Row>
                <Col>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "22px",
                      background: "#f3a01c",
                      padding: "20px",
                      margin: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <Navbar.Brand href="https://www.relainstitute.com/">
                      <img
                        src={require("./nabh.png")}
                        width="60px"
                        alt="NABH"
                        title="NABH"
                        className="img-responsive"
                      />
                    </Navbar.Brand>
                    <Navbar.Brand href="https://www.relainstitute.com/">
                      <img
                        src={require("./jci.png")}
                        width="60px"
                        alt="JCI"
                        title="JCI"
                        className="img-responsive"
                      />
                    </Navbar.Brand>
                    <Navbar.Brand href="https://www.relainstitute.com/">
                      <img
                        src={require("./nabl.png")}
                        width="60px"
                        alt="NABL"
                        title="NABL"
                        className="img-responsive"
                      />
                    </Navbar.Brand>

                    <Button
                      href="https://www.relainstitute.com/about-us/"
                      style={{ fontFamily: "inherit", fontWeight: "400" }}
                      variant="secondary"
                    >
                      ABOUT US
                    </Button>
                    <Button
                      href="https://www.relainstitute.com/academics/"
                      style={{ fontFamily: "inherit", fontWeight: "400" }}
                      variant="secondary"
                    >
                      ACADEMICS
                    </Button>

                    <SplitButton
                      title="INSTITUTE & DEPARTMENTS"
                      id="dropdown-split-variants-secondary"
                      variant="secondary"
                      align="end"
                      className="font-change"
                      style={{
                        display: "flex",
                        fontWeight: "600",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        flexWrap: "wrap",
                        fontFamily: "inherit",
                      }}
                    >
                      <NavDropdown.Item
                        href="https://www.relainstitute.com/department/pulmonary-medicine/"
                        style={{ width: "auto" }}
                      >
                        Department of Pulmonary-Medicine
                      </NavDropdown.Item>
                      <Dropdown.Divider />
                      <NavDropdown.Item
                        href="https://www.relainstitute.com/department/ear-nose-throat/"
                        style={{ width: "auto" }}
                      >
                        Department of Ear-Nose-Throat
                      </NavDropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        href="https://www.relainstitute.com/department/ophthalmology/"
                        style={{ width: "auto" }}
                      >
                        Department of Ophthalmology
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        href="https://www.relainstitute.com/department/bariatric-metabolic-surgery/"
                        style={{ width: "auto" }}
                      >
                        Department of Bariatric-Metabolic-Surgery
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        href="https://www.relainstitute.com/department/vascular-surgery/"
                        style={{ width: "auto" }}
                      >
                        Department of Vascular-Surgery
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        href="https://www.relainstitute.com/department/infectious-disease/"
                        style={{ width: "auto" }}
                      >
                        Department of Infectious-Disease
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        href="https://www.relainstitute.com/department/plastic-and-reconstructive-surgery/"
                        style={{ width: "auto" }}
                      >
                        Department of Plastic-And-Reconstructive-Surgery
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        href="https://www.relainstitute.com/department/internal-medicine-and-diabetology/"
                        style={{ width: "auto" }}
                      >
                        Department of Medicine-And-Diabetology
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        href="https://www.relainstitute.com/department/endocrinology-and-diabetology/"
                        style={{ width: "auto" }}
                      >
                        Department of Endocrinology-And-Diabetology
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        href="https://www.relainstitute.com/department/dermatology/"
                        style={{ width: "auto" }}
                      >
                        Department of Dermatology
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        href="https://www.relainstitute.com/department/urology/"
                        style={{ width: "auto" }}
                      >
                        Department of Urology
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        href="https://www.relainstitute.com/department/dental-surgery/"
                        style={{ width: "auto" }}
                      >
                        Department of Dental-Surgery
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        href="https://www.relainstitute.com/department/psychiatry-and-psychotherapy/"
                        style={{ width: "auto" }}
                      >
                        Department of Psychiatry-And-Psychotherapy
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        href="https://www.relainstitute.com/department/clinical-laboratory/"
                        style={{ width: "auto" }}
                      >
                        Department of Clinical-Laboratory
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        href="https://www.relainstitute.com/department/transfusion-medicine/"
                        style={{ width: "auto" }}
                      >
                        Department of Transfusion-Medicine
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        href="https://www.relainstitute.com/department/interventional-radiology-and-imaging-services/"
                        style={{ width: "auto" }}
                      >
                        Department of Interventional-Radiology-And-Imaging
                        Services
                      </Dropdown.Item>
                    </SplitButton>
                    <Button
                      href=" https://www.relainstitute.com/media/"
                      style={{ fontFamily: "inherit", fontWeight: "400" }}
                      variant="secondary"
                    >
                      MEDIA
                    </Button>
                    <Button
                      href="https://www.relainstitute.com/careers/"
                      style={{ fontFamily: "inherit", fontWeight: "400" }}
                      variant="secondary"
                    >
                      CAREERS
                    </Button>
                    <Button
                      href="https://www.relainstitute.com/events/"
                      style={{ fontFamily: "inherit", fontWeight: "400" }}
                      variant="secondary"
                    >
                      EVENTS
                    </Button>
                    <Button
                      href=" https://www.relainstitute.com/blog/"
                      style={{ fontFamily: "inherit", fontWeight: "400" }}
                      variant="secondary"
                    >
                      BLOG
                    </Button>
                    <Button
                      href="https://www.relainstitute.com/contact-us/"
                      style={{ fontFamily: "inherit", fontWeight: "400" }}
                      variant="secondary"
                    >
                      CONTACT
                    </Button>
                    <Button
                      href="https://www.relainstitute.com/patient-care/"
                      style={{ fontFamily: "inherit", fontWeight: "400" }}
                      variant="secondary"
                    >
                      PATIENT CARE
                    </Button>
                    <Button
                      style={{ fontFamily: "inherit", fontWeight: "400" }}
                      variant="secondary"
                    >
                      ONLINE PAYMENT
                    </Button>
                    <Button
                      style={{ fontFamily: "inherit", fontWeight: "400" }}
                      variant="secondary"
                    >
                      FIND A DOCTOR
                    </Button>
                  </div>
                </Col>
              </Row>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

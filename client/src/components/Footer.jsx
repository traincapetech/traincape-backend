import React from "react";
import footersection from "../css/Footer.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
// import { TbPhoneCall } from "react-icons/tb";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import Employee from "../pages/Employee"
import Internship from "../pages/Internship";
// import WebsiteCounter from "./WebsiteCounter";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className={footersection.FooterContainer}>
      <div className={footersection.Details}>
        <div className={footersection.detailsDiv}>
          <div className={footersection.address}>
            <div className={footersection.iconDiv}>
              <FaMapLocationDot className={footersection.icon} />
            </div>
            <div className={footersection.addressText}>
              <h1>OFFICE ADDRESS</h1>
              <p>
              F/F, H NO.99/12A, R/S NATHU RAM HOUSINGH COMPLEX, <br />
              DABRI VILLAGE, New Delhi, South West Delhi, Delhi, 110045
              </p>
            </div>
          </div>
          {/* <div className={footersection.address}>
            <div className={footersection.iconDiv}>
              <LuTimerReset className={footersection.icon} />
            </div>
             <div>
              <h1>WORKING HOURS</h1>
              <p>Mon - Sat : 11am - 7pm</p>
            </div> 
          </div>{" "} */}
          <div className={footersection.address}>
            <div className={footersection.iconDiv}>
              <FaWhatsapp className={footersection.icon} />
            </div>
            <div className={footersection.addressText}>
              <h1>CONTACT - US</h1>
              <p>sales@traincapetech.info</p>
              <p
                onClick={() =>
                  (window.location.href = "https://wa.me/+916280281505")
                }
              >
                +91 6280281505
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={footersection.middleSection}>
        <div className={footersection.middle}>
          <div className={footersection.footerdiv}>
            <h1>ABOUT US</h1>
            <p>
              Traincape Technology's specific methodologies for measuring and
              prioritizing customer satisfaction. <br />
              <br />
              However, many companies use various methods to gauge and
              prioritize customer satisfaction.
            </p>
            <div className={footersection.social}>
              <div
                className={footersection.SocailDiv}
                onClick={() =>
                  (window.location.href =
                    "https://www.facebook.com/profile.php?id=100083755432171")
                }
              >
                <FaFacebookF className={footersection.Socialicon} />
              </div>
              <div className={footersection.SocailDiv}
                onClick= {()=>
                  (window.location.href ="https://www.instagram.com/traincape_technology?igsh=MWR5c3EyOTI4dHJ5eg==")
                }>
                <FaInstagram className={footersection.Socialicon} />
              </div>
              <div
                className={footersection.SocailDiv}
                onClick={() => {
                  window.location.href =
                    "https://in.linkedin.com/company/traincape-technology";
                }}
              >
                <FaLinkedinIn className={footersection.Socialicon} />
              </div>
            </div>
          </div>
          <div className={footersection.footerdiv}>
            <h1>Links</h1>
            <Link
              to="/frequently-asked-questions"
              className={footersection.linksfooter}
            >
              FAQ
            </Link>
            <Link to="/contact-us" className={footersection.linksfooter}>
              Contact Us
            </Link>
            {/* <Link
              to="/terms-and-conditions"
              className={footersection.linksfooter}
            >
              Terms & Conditions
            </Link> */}
            <Link to="/Our-Policies" className={footersection.linksfooter}>
              Policy
            </Link>
            <Link to="/Career-details" className={footersection.linksfooter}>
              Career
            </Link>
            { <Link to="/Employee" className={footersection.linksfooter}>Employee</Link> }
          </div>
          <div className={footersection.footerdiv}>
            <h1>Explore</h1>
            <Link className={footersection.linksfooter} to={"/about-us"}>
              What we do
            </Link>
            <Link to="/Our-Blogs" className={footersection.linksfooter}>
              Blogs
            </Link>
            <Link to="/Our-Blogs" className={footersection.linksfooter}>
              Latest Posts
            </Link>
            { <Link to="/Internship" className={footersection.linksfooter}>Internship</Link> }
          </div>
          <div className={footersection.footerdiv}>
            <h1>Office Map</h1>
            <div className={footersection.gMap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.744145964281!2d77.07744151353839!3d28.607451408196102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d05ecdc6529c1%3A0x7419fbbcac72b568!2sTraincape%20technology%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1717065345903!5m2!1sen!2sin"
                width="600"
                height="450"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className={footersection.copyRight}>
        <h1>Copyright © 2021 Traincape Technology. All Rights Reserved.</h1>
      </div>
      {/* <WebsiteCounter /> */}
    </div>
  );
};

export default Footer;

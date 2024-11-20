import React, { useEffect, useState } from "react";
import contactus from "../css/ContactUs.module.css";
import { FaWhatsapp } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import { RiTeamLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import banner from "../assets/Contact-us.jpg";
import { IoMailOutline } from "react-icons/io5";
import emailjs from "@emailjs/browser";
const ContactUs = () => {
  const [payoload, setPayoload] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phoneNumber: "",
    location: "",
  });

  const handleSubmit = (e) => {
    // Your EmailJS serviceIdD and templateId and Public Key
    const serviceId = "service_pjwgjas";
    const templateId = "template_eueffas";
    const publicId = "GmJ24jEVf6swWXgb0";

    // Create a new object that contains dynamic template params
    const [name, email, subject, message, phoneNumber, location] =
      Object.values(payoload);
    const templateParams = {
      from_name: name,
      from_email: email,
      from_subject: subject,
      to_name: "Parichay singh Rana",
      message: `Name - ${name}\nEmail - ${email}\nCountry Name - ${location}\nWhatsapp-Number - ${phoneNumber}\nService Required - ${subject}\nMessage - ${message}`,
    };
    e.preventDefault();

    //send the Email using EmailJS

    emailjs.send(serviceId, templateId, templateParams, publicId).then(
      (res) => {
        alert("Email sent successfully!", res);
      },
      (err) => {
        console.log(err);
      }
    );
    setPayoload({
      name: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
      location: "",
    });
  };

  const handleChange = (e) => {
    setPayoload({ ...payoload, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={contactus.container}>
      <div className={contactus.banner}>
        <img src={banner} alt="IMG" />
        <h1>Contact Us</h1>
      </div>
      <div className={contactus.OfficeAdress}>
        <div className={contactus.OfficeDetails}>
          <h1>Office Address</h1>
          <p>India, USA, Nigiria</p>
          <h2>Phone Number & Email</h2>
          <div className={contactus.addressdiv1}>
            <div className={contactus.iconDiv1}>
              <FaWhatsapp className={contactus.icon} />
              <Link
                className={contactus.link}
                to="https://wa.me/+916280281505"
                target="_blank"
              >
                +91 6280281505
              </Link>
            </div>
            <div className={contactus.textdiv1}>
              <IoMailOutline className={contactus.icon} />
              <Link
                className={contactus.link}
                to="mailto:sales@traincapetech.info"
                target="_blank"
              >
                sales@traincapetech.info
              </Link>
            </div>
          </div>
          <div className={contactus.underlinediv}></div>
          <div className={contactus.addressdiv}>
            <div className={contactus.iconDiv}>
              <GrLocation className={contactus.icon} />
            </div>
            <div className={contactus.textdiv}>
              <h2>Our Office Address</h2>
              <p>F/F, H NO.99/12A, R/S NATHU RAM HOUSINGH COMPLEX, <br />DABRI VILLAGE, New Delhi, South West Delhi, Delhi, 110045</p>
            </div>
          </div>
          <div className={contactus.underlinediv}></div>
          <div className={contactus.addressdiv}>
            <div className={contactus.iconDiv}>
              <RiTeamLine className={contactus.icon} />
            </div>
            <div className={contactus.textdiv}>
              <h2>Office Work Time</h2>
              <p>Mon - Sat : 11am - 7pm</p>
            </div>
          </div>
        </div>
        <div className={contactus.officeMail}>
          <h1>Contact Form </h1>
          <p>We're Ready To Connect You</p>
          <div className={contactus.NameAndEmail}>
            <br />
            <input
              type="text"
              name="name"
              value={payoload.name}
              className={contactus.inputbox}
              placeholder="Your Name"
              required
              onChange={handleChange}
            />
            <br />
            <input
              type="email"
              name="email"
              value={payoload.email}
              className={contactus.inputbox}
              placeholder="Your Email"
              required
              onChange={handleChange}
            />
            <br />
          </div>
          <input
            type="text"
            name="location"
            value={payoload.location}
            className={contactus.inputbox}
            placeholder="Country Name"
            required
            onChange={handleChange}
          />
          <input
            type="number"
            name="phoneNumber"
            value={payoload.phoneNumber}
            className={contactus.inputbox}
            placeholder="Whatsapp Number"
            required
            onChange={handleChange}
          />
          <select
            name="subject"
            id={contactus.select}
            required
            onChange={handleChange}
          >
            <option value="select course">Select Service</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Project Management">Project Management</option>
          </select>
          <br />
          <br />
          <textarea
            name="message"
            className={contactus.textarea}
            cols="30"
            rows="10"
            placeholder="Your Message"
            onChange={handleChange}
          ></textarea>
          <button className={contactus.contactBtn} onClick={handleSubmit}>
            Send Message
          </button>
        </div>
      </div>
      <div className={contactus.contactMap}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.744145964281!2d77.07744151353839!3d28.607451408196102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d05ecdc6529c1%3A0x7419fbbcac72b568!2sTraincape%20technology%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1717065345903!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;

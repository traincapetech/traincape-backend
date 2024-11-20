import React, { useState, useEffect } from "react";
import employeeStyles from '../css/Employee.module.css';
import contactStyles from "../css/ContactUs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

import teamImage from "../assets/Team_Image.jpg";
import emailjs from "emailjs-com";
import formImage from "../assets/Form_Image.jpg";

// Team member images
import madan from "../assets/madan.png";
import rajeshImage from "../assets/rajesh.png";
import poojaImage from "../assets/pooja.jpeg";
import akshitImage from "../assets/akshit.jpeg";
import prachiyeImage from "../assets/prachiyesir.jpeg";
import shivamImage from "../assets/shivam.jpeg";
import anadImage from "../assets/Anand.jpeg";
import sauravImage from "../assets/Saurav.jpeg";

const Employee = () => {
  const [hoveredMember, setHoveredMember] = useState(null);
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    link: "",
    message: "",
    phoneNumber: "",
    location: "",
  });
 

  const boardMembers = [
    { name: "Madan Mohan Tiwari", title: "International Sales EXECUTIVE & Team Leader", image: madan, linkdin: "https://www.linkedin.com/in/madan-mohan-tiwari-3a8532317/" },
    { name: "Rajesh", title: "Graphic Designer", image: rajeshImage, linkdin: "https://www.linkedin.com/in/rajesh-bhusal-32592023a/" },
    { name: "Anand Shukla", title: "Lead Generation EXECUTIVE", image: anadImage, linkdin: "/client/src/pages/AboutUS.jsx" },
    // { name: "Akshit", title: "International Sales EXECUTIVE", image: akshitImage, linkdin: "https://www.linkedin.com/in/akshit-r-896a92290/" },
    // { name: "Pooja", title: "Lead Generation EXECUTIVE", image: poojaImage, linkdin:"/client/src/pages/AboutUS.jsx" },
    { name: "Saurav Kumar", title: "Developer", image: sauravImage, linkdin: "https://www.linkedin.com/in/saurav-kumar-31223b260" },
  ];

  const leadershipTeam = [
    { name: "Parichay Singh Rana", title: "Director & CEO", image: prachiyeImage },
    { name: "Shivam", title: "Manager", image: shivamImage },
  ];

  const handleMouseEnter = (index) => setHoveredMember(index);
  const handleMouseLeave = () => setHoveredMember(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = "service_pjwgjas";
    const templateId = "template_eueffas";
    const publicId = "GmJ24jEVf6swWXgb0";

    const { name, email, subject, message, phoneNumber, location } = payload;
    const templateParams = {
      from_name: name,
      from_email: email,
      from_subject: subject,
      to_name: "Parichay Singh Rana",
      message: `Name - ${name}\nEmail - ${email}\nCountry - ${location}\nWhatsapp - ${phoneNumber}\nService Required - ${subject}\nMessage - ${message}`,
    };

    emailjs.send(serviceId, templateId, templateParams, publicId).then(
      (res) => alert("Email sent successfully!"),
      (err) => console.error("Failed to send email:", err)
    );

    setPayload({
      name: "",
      email: "",
      phoneNumber: "",
      link: "",
      message: "",
      location: "",
    });
  };

  const handleChange = (e) => setPayload({ ...payload, [e.target.name]: e.target.value });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={employeeStyles.teamContainer}>
      <h1 className={employeeStyles.teamHeading}>Our People</h1>
      <p className={employeeStyles.teamDescription}>
        This is our team, a lot of smiling happy people who work hard to empower your teams.
      </p>
      <div className={employeeStyles.underline}></div>

      <div className={employeeStyles.teamImageContainer}>
        <img src={teamImage} alt="Our Team" className={employeeStyles.teamImage} />
      </div>

      <h1 className={employeeStyles.teamHeading}>Our Leadership Team</h1>
      <p className={employeeStyles.teamDescription}>
        Discover the leaders who turn big ideas into bold actions, inspiring our team and shaping the future of our industry.
      </p>
      <div className={employeeStyles.underline}></div>

      <div className={employeeStyles.cardGroup}>
        {leadershipTeam.map((member, index) => (
          <div className={employeeStyles.card} key={index}>
            <img src={member.image} className={employeeStyles.cardImgTop} alt={member.name} />
            <div className={employeeStyles.cardBody}>
              <h5 className={employeeStyles.cardTitle}>{member.name}</h5>
              <p className={employeeStyles.cardText}>{member.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={employeeStyles.boardContainer}>
        <h1>Our Team Members</h1>
        <p>Meet the dedicated team driving our mission forward with expertise, innovation, and a commitment to excellence.</p>
        <div className={employeeStyles.boardMembers}>
          {boardMembers.map((member, index) => (
            <div
              className={employeeStyles.boardMember}
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={member.image}
                alt={member.name}
                style={{
                  transform: hoveredMember === index ? "translateY(-10px)" : "translateY(0)",
                  transition: "transform 0.3s ease",
                }}
              />
              <div className={employeeStyles.name}>{member.name}</div>
              <div className={employeeStyles.title}>{member.title}</div>
              <div className={employeeStyles.socialIcons}>
                {member.linkdin && (
                  <a href={member.linkdin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`}>
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Contact Us Form */}
      <div className={employeeStyles.officeMail}>
          <h1>Want to Join Us?</h1>
          <p>We're Ready To Connect You</p>
          <div className={employeeStyles.NameAndEmail}>
            <br />
            <input
              type="text"
              name="name"
              value={payload.name}
              className={employeeStyles.inputbox}
              placeholder="Your Name"
              required
              onChange={handleChange}
            />
            <br />
            <input
              type="email"
              name="email"
              value={payload.email}
              className={employeeStyles.inputbox}
              placeholder="Your Email"
              required
              onChange={handleChange}
            />
            <br />
          </div>
          <input
            type="text"
            name="location"
            value={payload.location}
            className={employeeStyles.inputbox}
            placeholder="Country Name"
            required
            onChange={handleChange}
          />
          <input
            type="number"
            name="phoneNumber"
            value={payload.phoneNumber}
            className={employeeStyles.inputbox}
            placeholder="Whatsapp Number"
            required
            onChange={handleChange}
          />
          {/* <select
            name="subject"
            id={contactStyles.select}
            required
            onChange={handleChange}
          >
            <option value="select course">Select Service</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Project Management">Project Management</option>
          </select>
          <br />
          <br /> */}
          <input 
          type="url"
          name="link"
          value={payload.link}
          className={employeeStyles.inputbox}
          placeholder="Resume Drive Link"
          required
          onChange={handleChange}
           />
          <textarea
            name="message"
            className={employeeStyles.textarea}
            cols="30"
            rows="10"
            placeholder="Your Message"
            onChange={handleChange}
          ></textarea>
          <button className={employeeStyles.contactBtn} onClick={handleSubmit}>
            Submit
          </button>
         
        </div>
        
      </div>
  );
};

export default Employee;

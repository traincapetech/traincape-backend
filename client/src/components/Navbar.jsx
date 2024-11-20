import React, { useState, useEffect } from "react";
import nav from "../css/Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/WhatsApp_Image_2024-06-22_at_10.01.48-removebg-preview.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slices/userSlice";

const Navbar = () => {
  // Define the account details
  const accountNumber = "732205000345";
  const bankName = "ICICI Bank";
  const branchName = "Palam Colony";
  const accountHolderName = "TRAINCAPE TECHNOLOGY (OPC) PRIVATE LIMITED";
  const ifscCode = "ICIC0007322";
  const Email = "sales@traincapetech.info";

  // Create the alert message
  const alertMessage = `Account Details :\nAccount Number: ${accountNumber}\nBank Name: ${bankName}\nBranch Name: ${branchName}\nAccount Holder Name: ${accountHolderName}\nIFSC Code: ${ifscCode}\nEMAIL : ${Email}\n`;

  // Use the alert function to display the message
const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // const {user,token} = useSelector((state)=>state.user)
  const token = localStorage.getItem("token")

  

  const handleLogin = ()=>{
    navigate("/login")
    setMenuOpen(!isMenuOpen);

  }
  const handleLogout = ()=>{
    dispatch(logoutUser())
    
    window.location.href = "/login";

    navigate('/login')
  }
  // console.log(token,user)

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setMenuOpen(false);
    }
  };

  return (
    <nav className={nav.container}>
      <div className={nav.navbar}>
        <div className={nav.logo} onClick={() => navigate("/")}>
          <img src={logo} alt="Traincape Technology" />
        </div>
        <div className={nav.hamburgerSymbol} onClick={toggleMenu}>
          {isMenuOpen ? <ImCross /> : <GiHamburgerMenu />}
        </div>
        <div className={`${nav.navlinks}`}>
          <Link className={nav.links} to="/" onClick={handleLinkClick}>
            Home
          </Link>
          {/* <Link
            className={nav.links}
            to="/ebook-page"
            onClick={handleLinkClick}
          >
            E-Book
          </Link> */}
          <Link className={nav.links} to="/about-us" onClick={handleLinkClick}>
            About
          </Link>
          <Link
            className={nav.links}
            to="/our-services"
            onClick={handleLinkClick}
          >
            Services
          </Link>
          <Link
            className={nav.links}
            to="/review-page"
            onClick={handleLinkClick}
          >
            Reviews
          </Link>
          {/* <Link className={nav.links} to="#" onClick={handleLinkClick}>
            Our Customers
          </Link> */}
          <Link
            className={nav.links}
            to="Courses-details"
            onClick={handleLinkClick}
          >
            Courses / Sources
          </Link>

          <Link
            className={nav.links}
            to="/contact-us"
            onClick={handleLinkClick}
          >
            Contact
          </Link>
        </div>

        <div
          className={`${nav.hamburgerSection} ${
            isMenuOpen ? nav.showHamburgerSection : ""
          }`}
        >
          <div className={nav.hamburgerOverlay} onClick={toggleMenu}></div>
          <div
            className={`${nav.hamburgerMenu} ${
              isMenuOpen ? nav.showHamburgerMenu : ""
            }`}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px 10px 0 0",
                marginBottom: "20px",
              }}
            >
              <ImCross
                onClick={toggleMenu}
                style={{
                  color: "black",
                  width: "20px",
                  height: "20px",
                  alignItems: "right",
                  mb: "10px",
                }}
              />
            </div>
            <div className={nav.hamburgerLinksActive}>
              {/* <Link className={nav.links} to="/home" onClick={toggleMenu}>
                Home
              </Link> */}
              <Link
                className={nav.links}
                to="/ebook-page"
                onClick={handleLinkClick}
              >
                E-Book
              </Link>
              <Link className={nav.links} to="/about-us" onClick={toggleMenu}>
                About
              </Link>
              <Link
                className={nav.links}
                to="/our-services"
                onClick={toggleMenu}
              >
                Services
              </Link>
              <Link className={nav.links} to="/contact-us" onClick={toggleMenu}>
                Contact
              </Link>
              <Link
                className={nav.links}
                to="/Courses-details"
                onClick={toggleMenu}
              >
                Courses
              </Link>
              <Link
                className={nav.links}
                to="/review-page"
                onClick={handleLinkClick}
              >
                Reviews
              </Link>
              <Link to="/Career-details" className={nav.links} onClick={toggleMenu}>
                Career
              </Link>
              <Link to="/Our-Blogs" className={nav.links} onClick={toggleMenu}>
                Blogs
              </Link>
              <Link to="/frequently-asked-questions" className={nav.links} onClick={toggleMenu}>
                FAQ
              </Link>
              <div className={nav.hamburgerMenuButtons}>
              { token &&<div
                  className={nav.dropdownLinkSection}
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <Link
                    className={nav.links}
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    Pay Now
                  </Link>
                  <div
                    className={`${nav.dropdownSection} ${
                      showDropdown ? nav.showDropdownSection : ""
                    }`}
                  >
                    <Link
                      className={nav.links}
                      to="https://paypal.me/ParichayP?country.x=IN&locale.x=en_GB"
                    >
                      Pay Pal
                    </Link>
                    <Link
                      className={nav.links}
                      to="https://buy.stripe.com/8wM2az10TaYQgww29d"
                    >
                      Credit / Debit Card
                    </Link>
                    <Link
                      className={nav.links}
                      onClick={() => alert(alertMessage)}
                    >
                      Bank Transfer
                    </Link>
                  </div>
                </div>
              }
                 {
                token ? <button className={nav.loginbtn} onClick={handleLogout}>
                Logout
              </button> :
              <button className={nav.loginbtn} onClick={handleLogin}>
              login
            </button>
              } 
              </div>
            </div>
          </div>
        </div>

        <div className={nav.buttons}>
           <div
            className={nav.dropdownLinkSection}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
           {token && <button className={nav.btn}>Pay Now</button>
          }
            <div
              className={`${nav.dropdownSection} ${
                showDropdown ? nav.showDropdownSection : ""
              }`}
            >
              <Link
                className={nav.links}
                to="https://paypal.me/ParichayP?country.x=IN&locale.x=en_GB"
              >
                Pay Pal
              </Link>
              <Link
                className={nav.links}
                to="https://buy.stripe.com/8wM2az10TaYQgww29d"
              >
                Credit / Debit Card
              </Link>
              <Link className={nav.links} onClick={() => alert(alertMessage)}>
                Bank Transfer
              </Link>
            </div>
          </div>
               {
                token ? <button className={nav.loginbtn} onClick={handleLogout}>
                Logout
              </button> :
              <button className={nav.loginbtn} onClick={()=> navigate("/login")}>
              login
            </button>
              } 
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


// //Udated code by saurav
// import React, { useState } from "react";
// import nav from "../css/Navbar.module.css";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/WhatsApp_Image_2024-06-22_at_10.01.48-removebg-preview.png";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { ImCross } from "react-icons/im";
// import { useDispatch } from "react-redux";
// import { logoutUser } from "../slices/userSlice";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isMenuOpen, setMenuOpen] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const token = localStorage.getItem("token");

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     window.location.href = "/login";
//     navigate('/login');
//   };

//   const toggleMenu = () => {
//     setMenuOpen(!isMenuOpen);
//   };

//   const handleLinkClick = () => {
//     if (window.innerWidth <= 768) {
//       setMenuOpen(false);
//     }
//   };

//   return (
//     <nav className={nav.container}>
//       <div className={nav.navbar}>
//         <div className={nav.logo} onClick={() => navigate("/")}>
//           <img src={logo} alt="Traincape Technology" />
//         </div>
//         <div className={nav.hamburgerSymbol} onClick={toggleMenu}>
//           {isMenuOpen ? <ImCross /> : <GiHamburgerMenu />}
//         </div>
//         <div className={`${nav.navlinks}`}>
//           <Link className={nav.links} to="/ebook-page" onClick={handleLinkClick}>E-Book</Link>
//           <Link className={nav.links} to="/about-us" onClick={handleLinkClick}>About</Link>
//           <Link className={nav.links} to="/our-services" onClick={handleLinkClick}>Services</Link>
//           <Link className={nav.links} to="/review-page" onClick={handleLinkClick}>Reviews</Link>
//           <Link className={nav.links} to="/Courses-details" onClick={handleLinkClick}>Courses / Sources</Link>
//           <Link className={nav.links} to="/contact-us" onClick={handleLinkClick}>Contact</Link>
//         </div>

//         <div className={`${nav.hamburgerSection} ${isMenuOpen ? nav.showHamburgerSection : ""}`}>
//           <div className={nav.hamburgerOverlay} onClick={toggleMenu}></div>
//           <div className={`${nav.hamburgerMenu} ${isMenuOpen ? nav.showHamburgerMenu : ""}`}>
//             <div style={{ display: "flex", justifyContent: "center", padding: "10px 10px 0 0", marginBottom: "20px" }}>
//               <ImCross onClick={toggleMenu} style={{ color: "black", width: "20px", height: "20px", alignItems: "right", mb: "10px" }} />
//             </div>
//             <div className={nav.hamburgerLinksActive}>
//               <Link className={nav.links} to="/ebook-page" onClick={handleLinkClick}>E-Book</Link>
//               <Link className={nav.links} to="/about-us" onClick={toggleMenu}>About</Link>
//               <Link className={nav.links} to="/our-services" onClick={toggleMenu}>Services</Link>
//               <Link className={nav.links} to="/contact-us" onClick={toggleMenu}>Contact</Link>
//               <Link className={nav.links} to="/Courses-details" onClick={toggleMenu}>Courses</Link>
//               <Link className={nav.links} to="/review-page" onClick={handleLinkClick}>Reviews</Link>
//               <Link to="/Career-details" className={nav.links} onClick={toggleMenu}>Career</Link>
//               <Link to="/Our-Blogs" className={nav.links} onClick={toggleMenu}>Blogs</Link>
//               <Link to="/frequently-asked-questions" className={nav.links} onClick={toggleMenu}>FAQ</Link>
//             </div>
//           </div>
//         </div>

//         <div className={nav.buttons}>
//           {token && <button className={nav.btn}>Pay Now</button>}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


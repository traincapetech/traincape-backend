// import React from "react";
// import { Routes, Route,Navigate } from "react-router-dom";
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import AboutUS from "../pages/AboutUS";
// import ContactUs from "../pages/ContactUs";
// import Signup from "../pages/Signup";
// import FAQ from "../pages/FAQ";
// import Services from "../pages/Services";
// import TermsAndCondition from "../pages/TermsAndCondition";
// import Courses from "../pages/Courses";
// import Career from "../pages/Career/Career";
// import Policy from "../pages/Policy";
// import PageNotFound from "../pages/404/PageNotFound";
// import Blogs from "../pages/Blogs/Blogs";
// import CompTIAsinglePage from "../pages/SinglePage/CompTIA/CompTIAsinglePage"


// import ReviewPage from "../pages/review/ReviewPage";
// import BookPage from "../pages/ebook/BookPage";
// import LandingPage from "../pages/landingPage/LandingPage";
// const AllRoute = () => {
//   const token = localStorage.getItem("token")
//   console.log(token)
//   return (
//     <Routes>
//       <Route path="/review-page" element={<ReviewPage />} />
//       <Route path="/" element={<Home />} />
//       {/* <Route path="/ebook-page" element={<BookPage />}/> */}
//        <Route path="/ebook-page" element={token ? <BookPage /> : <Navigate to="/login" replace />} /> 
     
//        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" replace />} />
// <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/" replace />} />

//       <Route path="/about-us" element={<AboutUS />} />
//       <Route path="/contact-us" element={<ContactUs />} />
//       <Route path="/frequently-asked-questions" element={<FAQ />} />
//       <Route path="/our-services" element={<Services />} />
//       <Route path="/Terms-and-Conditions" element={<TermsAndCondition />} />
     
//      <Route path="/Courses-details" element={token ? <Courses />  : <Navigate to="/login" replace />} />
   
     
//       <Route path="/Career-details" element={<Career />} />
//       <Route path="/Our-Policies" element={<Policy />} />
//       <Route path="/Our-Blogs" element={<Blogs />} />
//       <Route path="*" element={<PageNotFound />} />
     
//       <Route path="/CompTIA-single-page" element={<CompTIAsinglePage />} />
    
//       <Route path="/home" element={<LandingPage />} />
//     </Routes>
//   );
// };

// export default AllRoute;

// Updated by Saurav
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AboutUS from "../pages/AboutUS";
import ContactUs from "../pages/ContactUs";
import Signup from "../pages/Signup";
import FAQ from "../pages/FAQ";
import Services from "../pages/Services";
import TermsAndCondition from "../pages/TermsAndCondition";
import Courses from "../pages/Courses";
import Career from "../pages/Career/Career";
import Policy from "../pages/Policy";
import PageNotFound from "../pages/404/PageNotFound";
import Blogs from "../pages/Blogs/Blogs";
import CompTIAsinglePage from "../pages/SinglePage/CompTIA/CompTIAsinglePage";
import ReviewPage from "../pages/review/ReviewPage";
import BookPage from "../pages/ebook/BookPage";
import LandingPage from "../pages/landingPage/LandingPage";
import Employee from "../pages/Employee";
import Internship from "../pages/Internship";

const AllRoute = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/review-page" element={<ReviewPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/ebook-page" element={<BookPage />} /> {/* Allow access without token */}
      
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/" replace />} />
      <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/" replace />} />

      <Route path="/about-us" element={<AboutUS />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/frequently-asked-questions" element={<FAQ />} />
      <Route path="/our-services" element={<Services />} />
      <Route path="/Terms-and-Conditions" element={<TermsAndCondition />} />
      
      <Route path="/Courses-details" element={<Courses />} /> {/* Allow access without token */}
      
      <Route path="/Career-details" element={<Career />} />
      <Route path="/Our-Policies" element={<Policy />} />
      <Route path="/Our-Blogs" element={<Blogs />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/CompTIA-single-page" element={<CompTIAsinglePage />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/employee" element={<Employee/>} />
      <Route path="/internship" element={<Internship/>} />
    </Routes>
  );
};

export default AllRoute;

 
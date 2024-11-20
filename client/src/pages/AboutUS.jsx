// import React, { useEffect } from "react";
// // import aboutus from "../css/AboutUS.module.css";
// import aboutus from "../css/AboutUS.module.css";
// import banner from "../assets/about-us-new.jpeg";
// import { SiAmazonsimpleemailservice } from "react-icons/si";
// import { SiEsotericsoftware } from "react-icons/si";
// import { MdCall } from "react-icons/md";
// import { FaWhatsapp } from "react-icons/fa6";
// import childimg from "../assets/disccuss.jpg";
// import Consult from "../assets/smallImg.jpeg";
// import { useNavigate } from "react-router-dom";
// import traincapeInfo from "../assets/T-certificate-details.png";
// import review from "../assets/Feedback Gif.gif";
// import { Link } from "react-router-dom";
// import Slider from "../components/slider/Slider";

// const AboutUS = () => {
//   const navigate = useNavigate();
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   const handlePdf = () => {
//     const pdfUrl =
//       "https://drive.google.com/uc?export=download&id=1NdZDoLk-q9saDgfrWzNQ9mLIgUZHGKg8";
//     window.open(pdfUrl);
//   };
//   return (
//     <div className={aboutus.container}>
//       <div className={aboutus.banner}>
//         <img src={banner} alt="Default image" />
//         <h1>About Us</h1>
//       </div>
//       <div className={aboutus.PdfDiv}>
//         <img src={traincapeInfo} alt="PDF IMAGE" className={aboutus.pdfImg} />
//         <div className={aboutus.pdftext}>
//           <div className={aboutus.textpdf}>
//             <h1>
//               Traincape Technology Pvt Ltd was founded in 2021 by Parichay Singh
//               Rana with a vision to revolutionize the way businesses approach
//               technology. With years of experience in the industry, we
//               recognized the need for a company that could provide tailored,
//               reliable, and cutting-edge tech solutions. Our mission is to
//               empower businesses by leveraging the latest technologies and
//               innovations to drive growth, efficiency, and innovation. Our team
//               of experts has extensive experience in developing and implementing
//               custom software solutions, mobile apps, and web applications that
//               meet the unique needs of our clients. We pride ourselves on our
//               ability to understand our clients' business goals and develop
//               solutions that align with their objectives.
//             </h1>
//             <button className={aboutus.pdfDownloadBtn} onClick={handlePdf}>
//               Download Our Presentation
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className={aboutus.parent}>
//         <div className={aboutus.child1}>
//           <h4>Get Best IT Solutiion 2022</h4>
//           <h1>Inspiring Tech Needs For Bussiness</h1>
//           <p>
//             Traincape Technology was founded in 2021 by Parichay Singh Rana with
//             a vision to revolutionize the way businesses approach technology.
//             With years of experience in the industry, we recognized the need for
//             a company that could provide tailored, reliable, and cutting-edge
//             tech solutions.
//           </p>
//           <div className={aboutus.childdiv}>
//             <div className={aboutus.call}>
//               <div className={aboutus.icondiv}>
//                 <FaWhatsapp className={aboutus.icon} />
//               </div>
//               <div style={{ textAlign: "center" }}>
//                 <h2>WhatsApp To Ask Any Query</h2>
//                 <Link
//                   className={aboutus.link}
//                   to="https://wa.me/+916280281505"
//                   target="_blank"
//                 >
//                   +91 6280281505
//                 </Link>
//               </div>
//             </div>
//             <div className={aboutus.border}></div>
//             <div className={aboutus.founder}>
//               <p>Founder & CEO</p>
//               <h3>Parichay</h3>
//             </div>
//           </div>
//         </div>
//         <div className={aboutus.child2}>
//           <img src={childimg} alt="Child Image" />
//         </div>
//       </div>

//       {/* <div className={aboutus.Review}>
//         <div className={aboutus.ReviewDiv}>
//           <div className={aboutus.Quote}>
//             <p>OUR BEST REVIEWS</p>
//             <h1>Inspiring Tech Needs For Business</h1>
//           </div>
//           <div className={aboutus.vdobtn}>
//           </div>
//         </div>
//         <div className={aboutus.ReviewPersonDiv}>
//           <div className={aboutus.Reviewdiv1}>
//             <div className={aboutus.ReviewPerson}>
//               <img
//                 src="https://lh3.googleusercontent.com/a/ACg8ocI9VN6rcL2ZiH4q_UjppPI_CwuPobfiO3NOzKzXTVx0GDydug=w75-h75-p-rp-mo-br100"
//                 alt="review data"
//               />
//               <p>
//                 These guys are awesome 🤩. Whatever you wanna do just tell them.
//                 They offer comprehensive training programs for all level I.T
//                 programs.
//               </p>
//             </div>
//             <h1>DA BRO's</h1>
//             <h2>IT Customer</h2>
//           </div>
//           <div className={aboutus.Reviewdiv1}>
//             <div className={aboutus.ReviewPerson}>
//               <img src={jasveer} alt="review 1" />
//               <p>
//                 I did my azure training and certification from Traincape
//                 technology is just smooth experience. Going work on more goals
//                 in near future. Thanks Parichay and team.
//               </p>
//             </div>
//             <h1>Jasvir Gill</h1>
//             <h2>Azure Training</h2>
//           </div>
//         </div>
//       </div> */}
//       <Slider height="300px" />

//       <div className={aboutus.Postreview}>
//         <div className={aboutus.PostReviewText}>
//           <h1>
//             Traincape technology Pvt Ltd would love your feedback. Post a review
//             to our profile.{" "}
//           </h1>
//           <button
//             className={aboutus.reviewBTN}
//             onClick={() =>
//               window.open("https://g.page/r/CWi1cqy8-xl0EBE/review")
//             }
//           >
//             Post A Review
//           </button>
//         </div>
//         <div className={aboutus.reviewGif}>
//           <img src={review} alt="Feedback GIF" />
//         </div>
//       </div>

//       <div className={aboutus.consult}>
//         <img
//           src={Consult}
//           className={aboutus.img}
//           alt="Consult Image"
//           style={{ backgroundSize: "cover" }}
//         />
//         <div className={aboutus.consultdiv}>
//           <div className={aboutus.consultText}>
//             <p>We are here to answer your questions 24/7</p>
//             <h1>Need A Consultation?</h1>
//           </div>
//           <div className={aboutus.consultbtn}>
//             <button
//               className={aboutus.btn2}
//               onClick={() => navigate("/contact-us")}
//             >
//               GET A CONSULTATION
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUS;

import React from 'react'
import banner from '../assets/banner.jpeg';
import style from '../css/AboutUS.module.css';
import Owner from '../assets/owner.jpeg'
import image1 from '../assets/Traincape Technology Deck_page-0002.jpg';
import image2 from '../assets/Traincape Technology Deck_page-0012.jpg';
import image3 from '../assets/Traincape Technology Deck_page-0003.jpg';
import image4 from '../assets/Traincape Technology Deck_page-0004.jpg';
import image5 from '../assets/Traincape Technology Deck_page-0005.jpg';
import image6 from '../assets/Traincape Technology Deck_page-0008.jpg';
import vision from '../assets/vision.jpeg';
import values from '../assets/values.jpeg';
import mission from '../assets/mission.jpeg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";

const AboutUS = () => {

    // const settings = {
    //   dots: true,              // Display navigation dots
    //   infinite: true,          // Infinite loop sliding
    //   speed: 500,              // Transition speed
    //   slidesToShow: 1,         // Number of slides to show
    //   slidesToScroll: 1,       // Number of slides to scroll
    //   autoplay: true,          // Auto-slide images
    //   autoplaySpeed: 3000,     // Delay between slides (ms)
    // };

    // const images = [
    //   "public\apple-touch-icon.png",
    //   "https://via.placeholder.com/800x400/ff7f7f/333333?text=Slide+1",
    //   "https://via.placeholder.com/800x400/7fff7f/333333?text=Slide+2",
    //   "https://via.placeholder.com/800x400/7f7fff/333333?text=Slide+3",
    //   "https://via.placeholder.com/800x400/ffff7f/333333?text=Slide+4",
    //  {image1},
    // ];


    return (
      <div>

        <img src={banner} useMap="#image-map" className={style.bannerimg} alt='banner' />

        <map name="image-map">
          <area target="_self" alt="Training" title="" href="/CompTIA-single-page" coords="790,90,628,124" shape="rect" />
          <area target="_self" alt="Vouchers" title="" href="" coords="814,165,627,133" shape="rect" />
          <area target="_self" alt="internship" title="" href="/Internship" coords="815,173,637,203" shape="rect" />
          <area target="_self" alt="project" title="" href="" coords="812,244,639,217" shape="rect" />
          <area target="_self" alt="cyber security" title="" href="" coords="828,279,609,252" shape="rect" />
          <area target="_self" alt="App development" title="" href="" coords="591,326,858,296" shape="rect" />
          <area target="_self" alt="Website development" title="" href="" coords="616,336,834,402" shape="rect" />
          <area target="_self" alt="Software development" title="" href="" coords="619,414,818,479" shape="rect" />
          <area target="_self" alt="comptia" title="" href="/CompTIA-single-page" coords="862,192,1204,105" shape="rect" />
          <area target="_self" alt="Pecb" title="" href="" coords="888,210,1182,302" shape="rect" />
          <area target="_self" alt="certiport" title="" href="" coords="863,324,1274,415" shape="rect" />
          <area target="_self" alt="Website-link" title="" href="https://traincapetech.in/" coords="1064,548,770,579" shape="rect" />
          <area target="_self" alt="Gmail" title="" href="https://traincapetech.in/contact-us" coords="983,606,732,633" shape="rect" />
          <area target="_self" alt="WhatsApp" title="" href="https://wa.me/+441253928501" coords="1231,616,980,643" shape="rect" />
          <area target="_self" alt="WhatsApp" title="" href="https://wa.me/+916280281505" coords="1235,590,984,617" shape="rect" />
          <area target="_self" alt="Computer" title="" href="https://traincapetech.in/Courses-details" coords="1258,437,1103,555" shape="rect" />
          <area target="_self" alt="EnrollNow" title="" href="https://traincapetech.in/contact-us" coords="1024,477,820,536" shape="rect" />
          <area target="_self" alt="Traincape " title="" href="https://traincapetech.in/" coords="554,36,193,408" shape="rect" />
          <area target="_self" alt="" title="" href="" coords="" shape="rect" />
          <area target="_self" alt="" title="" href="" coords="" shape="rect" />
          
        </map>

        <div className={style.title}>
          <h4>Our Chairman</h4>
          <h1> Mr. Parichay Singh Rana</h1>


          <div className={style.owner}>

            <div className={style.ownerdiv}>
              <img src={Owner} alt="owner of traincape" className={style.ownerimg} />
            </div>
            <div className={style.ownerinfo}>
              <h3>Founded in 2021 by <span>Parichay Singh Rana</span> , Traincape Technology emerged with a vision to redefine how businesses harness the power of technology. Built on a foundation of expertise and innovation, our mission is to provide bespoke, reliable, and forward-thinking tech solutions. We believe in empowering businesses to unlock their true potential by delivering tools and strategies that drive success. At Traincape, we don’t just adapt to technological advancements; we anticipate them, ensuring our clients stay ahead in an ever-evolving digital landscape</h3>
            </div>
          </div>
        </div>

        {/* <div style={{ width: "80%", margin: "auto", padding: "20px 0" }}>
          <Slider {...settings}>
            {images.map((src, index) => (
              <div key={index}>
                <img src={src} alt={Slide ${index + 1}} style={{ width: "100%", height: "auto" }} />
              </div>
            ))}
          </Slider>
        </div> */}
      
        <div class={style.carouselcontainer}>
          <h1>Why We Are Best</h1>
          <div class={style.carouselslides}>
            <div class={style.carouselslide}>
              <img src={image1} alt="..." className={style.carouselimg} />
            </div>
            <div class={style.carouselslide}>
              <img src={image6} alt="..." className={style.carouselimg} />
            </div>
            <div class={style.carouselslide}>
              <img src={image3} alt="..." className={style.carouselimg} />
            </div>
            <div class={style.carouselslide}>
              <img src={image4} alt="..." className={style.carouselimg} />
            </div>
            <div class={style.carouselslide}>
              <img src={image5} alt="..." className={style.carouselimg} />
            </div>
            <div class={style.carouselslide}>
              <img src={image2} alt="..." className={style.carouselimg} />
            </div>
          </div>
        </div>

        {/* <div class={style.carousel}>
          <div class={style.carouselimages}>
            <img src={image1} alt='image1' />
            <img src={image3} alt='image1' />
            <img src={image4} alt='image1' />
            <img src={image2} alt='image1' />
          </div>
          <div class={style.carouselcontrols}>
            <button id="prev">Previous</button>
            <button id="next">Next</button>
          </div>
        </div> */}

        <div className={style.visionmission}>
          <h1>Our Vision & Mission</h1>
          <div className={style.purpose}>
            <div className={style.vision}>
              <img src={vision} alt="" />
              <h3>Vision</h3>
              <p>At Traincape Technology, our vision is to be a global leader in IT training and solutions, empowering individuals and businesses to achieve excellence through innovation, expertise, and cutting-edge technology. </p>
            </div>
            <div className={style.mission}>
              <img src={mission} alt="" />
              <h3>Mission</h3>
              <p>As an authorized partner of CompTIA and PECB, our mission is to deliver industry-leading training programs that empower professionals with globally recognized certifications. </p>
            </div>
            <div className={style.values}>
              <img src={values} alt="" />
              <h3>Values</h3>
              <p>We uphold innovation, integrity, customer-centricity, and a steadfast commitment to delivering quality in every service we provide.</p>
            </div>
          </div>
        </div>
      </div >
    )
  }
  export default AboutUS
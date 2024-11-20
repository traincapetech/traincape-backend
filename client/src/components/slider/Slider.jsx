import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import T1 from "../../assets/Traincape-info.jpg";
import T2 from "../../assets/Traincape Technology Deck_page-0002.jpg";
import T3 from "../../assets/Traincape Technology Deck_page-0003.jpg";
import T4 from "../../assets/Traincape Technology Deck_page-0004.jpg";
import T5 from "../../assets/Traincape Technology Deck_page-0005.jpg";
import T6 from "../../assets/Traincape Technology Deck_page-0007.jpg";
import T7 from "../../assets/Traincape Technology Deck_page-0008.jpg";
import T8 from "../../assets/Traincape Technology Deck_page-0009.jpg";
import T9 from "../../assets/Traincape Technology Deck_page-0010.jpg";
import T10 from "../../assets/Traincape Technology Deck_page-0011.jpg";
import T11 from "../../assets/Traincape Technology Deck_page-0012.jpg";

const imageStyle = {
  maxWidth: "100%",
  maxHeight: "100%",
};

const slideImages = [
  { url: T1 },
  { url: T2 },
  { url: T3 },
  { url: T4 },
  { url: T5 },
  { url: T6 },
  { url: T7 },
  { url: T8 },
  { url: T9 },
  { url: T10 },
  { url: T11 },
];

const Slider = ({ height }) => {
  const divStyle = {
    display: "flex",
    justifyContent: "center",
    height: height || "400px", // Use the height prop or default to 300px
  
  };

  return (
    <div className="slide-container">
      <Fade>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div style={divStyle}>
              <img
                style={imageStyle}
                src={slideImage.url}
                alt="Images of landing page"
              />
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Slider;

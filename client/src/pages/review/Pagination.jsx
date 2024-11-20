// import React from "react";

// const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const renderPageNumbers = () => {
//     const pages = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           disabled={currentPage === i}
//           style={{
//             margin: "0 5px",
//             padding: "5px 10px",
//           }}
//         >
//           {i}
//         </button>
//       );
//     }
//     return pages;
//   };

//   return (
//     <div
//       style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
//     >
//       {renderPageNumbers()}
//     </div>
//   );
// };

// export default Pagination;

// Updated by Tripti
import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
          style={{
            margin: "25px 5px",
            padding: "5px 10px",
          }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div
      style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
    >
      {renderPageNumbers()}
    </div>
  );
};

export default Pagination;

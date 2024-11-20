// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import ReviewCard from "./ReviewCard";
// import Pagination from "./Pagination";
// import reviewpage from "./ReviewPage.module.css";
// import Loading from "../loadingPage/Loading";

// const ReviewPage = () => {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchReviews(currentPage);
//   }, [currentPage]);

//   const fetchReviews = async (page) => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `https://traincape-backend-1.onrender.com/review/get-review?page=${page}&limit=20`
//       );
//       setData(res.data.review);
//       setCurrentPage(res.data.currentPage);
//       setTotalPages(res.data.totalPages);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false); // Set loading to false after fetching
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         <>
//           {totalPages > 1 && (
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               setCurrentPage={setCurrentPage}
//             />
//           )}
//           <div className={reviewpage.reviewContainer}>
//             {data.length > 0 ? (
//               data.map((item) => (
//                 <div key={item._id} className={reviewpage.reviewdiv}>
//                   <ReviewCard {...item} />
//                 </div>
//               ))
//             ) : (
//               <p>No reviews available.</p>
//             )}
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default ReviewPage;
// Updated by Tripti

import axios from "axios";
import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import reviewpage from "./ReviewPage.module.css";
import Loading from "../loadingPage/Loading";
import Pagination from "./Pagination";

const ReviewPage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);

  const fetchReviews = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://traincape-backend-1.onrender.com/review/get-review?page=${page}&limit=20`
      );
      setData(res.data.review);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          
          <div className={reviewpage.reviewContainer}>
            {data.length > 0 ? (
              data.map((item) => (
                <div key={item._id} className={reviewpage.reviewdiv}>
                  <ReviewCard {...item} />
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </>
  );
};
export default ReviewPage;

import React, { useState, useEffect } from "react";
import Rating from "react-rating-stars-component";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, auth, storage } from "../../firebaseConfig";
import "./RatingReviews.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import { Modal } from 'bootstrap';

const RatingReviews = () => {
  const [rating, setRating] = useState(0);
  const [files, setFiles] = useState([]);
  const [rejectedFilesCount, setRejectedFilesCount] = useState(0);
  const [ratingHeading, setRatingHeading] = useState("");
  const [comments, setComments] = useState("");
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const { productId } = useParams();

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/bmp","image/webp"];

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const filteredFiles = selectedFiles.filter((file) =>
      allowedTypes.includes(file.type)
    );
    const rejectedFiles = selectedFiles.filter(
      (file) => !allowedTypes.includes(file.type)
    );

    setFiles(filteredFiles);
    setRejectedFilesCount(rejectedFiles.length);
  };

  const handleFileRemove = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!productId || !userId) return; // Ensure userId is available

      const reviewsRef = collection(firestore, "ProductReviews");
      const q = query(reviewsRef, where("productId", "==", productId));
      const querySnapshot = await getDocs(q);

      const reviewsData = querySnapshot.docs.map((doc) => doc.data());
      setReviews(reviewsData);
    };

    fetchReviews();
  }, [productId, userId]); // Add userId to dependency array

  const uploadFiles = async () => {
    const uploadPromises = files.map(async (file) => {
      const storageRef = ref(storage, `reviews/${file.name}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    });
    return Promise.all(uploadPromises);
  };

  const handleFormSubmitRating = async (event) => {
    event.preventDefault();

    if (rating === 0) {
      toast.error("Please provide a rating before submitting.");
      return; // Stop further execution of the function
    }

    try {
      const fileUrls = await uploadFiles();

      await addDoc(collection(firestore, "ProductReviews"), {
        productId,
        userId,
        ratingHeading,
        rating,
        comments,
        files: fileUrls,
        timestamp: new Date(),
      });

      toast.success("Review submitted successfully!");

      setRatingHeading("");
      setRating(0);
      setComments("");
      setFiles([]);
      setRejectedFilesCount(0);
      window.location.reload();


      // Fetch the reviews again to include the newly added review
      const reviewsRef = collection(firestore, "ProductReviews");
      const q = query(reviewsRef, where("productId", "==", productId));
      const querySnapshot = await getDocs(q);

      const reviewsData = querySnapshot.docs.map((doc) => doc.data());
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col">
            <div className="d-flex">
              <h4 className="fw-bold">Ratings & Reviews</h4>

              <button
                className="ms-auto px-5 py-2 border-0 bg-primary text-white rounded-pill"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropRATING"
              >
                Rating
              </button>
            </div>
          </div>
          <div>
            {/* Modal */}
            <div
              className="modal fade"
              id="staticBackdropRATING"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1
                      className="modal-title fs-5 fw-bold"
                      id="staticBackdropLabel"
                    >
                      Ratings & Reviews
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>

                  <div className="modal-body">
                    <form onSubmit={handleFormSubmitRating}>
                      <div>
                        <div className="my-2">
                          <label htmlFor="ratingHeading">Rating Heading</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Rating Heading"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            name="ratingHeading"
                            value={ratingHeading}
                            onChange={(e) => setRatingHeading(e.target.value)}
                          />
                        </div>

                        <div className="my-2">
                          <label htmlFor="ratingStars">Rating Star</label>
                          <Rating
                            count={5}
                            onChange={handleRatingChange}
                            size={40}
                            activeColor="#ffd700"
                            value={rating}
                          />
                        </div>

                        <div className="my-2">
                          <label htmlFor="comments">Comments</label>
                          <div className="form-floating">
                            <textarea
                              className="form-control"
                              placeholder="Leave a comment here"
                              id="floatingTextarea"
                              value={comments}
                              onChange={(e) => setComments(e.target.value)}
                            ></textarea>
                          </div>
                        </div>

                        <div className="my-2">
                          <label htmlFor="fileUpload">Upload Photos</label>
                          <input
                            type="file"
                            className="form-control"
                            id="fileUpload"
                            multiple
                            onChange={handleFileChange}
                          />
                        </div>

                        {files.length > 0 && (
                          <div className="my-2">
                            <h5>Selected Files:</h5>
                            <ul className="list-group">
                              {files.map((file, index) => (
                                <li
                                  key={index}
                                  className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                  {file.name}
                                  <button
                                    type="button"
                                    className="btn text-danger btn-sm fw-bold"
                                    onClick={() => handleFileRemove(index)}
                                  >
                                    <i className="bi bi-x-lg"></i>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {rejectedFilesCount > 0 && (
                          <div className="my-2 text-danger">
                            <h6>
                              {rejectedFilesCount} file(s) were not accepted due
                              to invalid format. Only bitmap, jpeg, png, and jpg
                              are accepted.
                            </h6>
                          </div>
                        )}
                      </div>
                      <button type="submit" className="btn btn-primary text-center">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="review my-1 py-1">
                  <h5 className="fw-bold">{review.ratingHeading}</h5>
                  <div className="d-flex">
                    <div>
                    <Rating
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    value={review.rating}
                    edit={false}
                  /> 
                    </div>
                    <div className="px-2 my-2">
                    <p>{review.rating}.0 | 5.0</p> 

                    </div>
                  </div>
                  {review.files.length > 0 && (
                    <div className="d-flex mx-1 px-1 py-2">
                      {review.files.map((file, fileIndex) => (
                        <div key={fileIndex}>
                          <div>
                            <img
                              src={file}
                              className="px-2"
                              alt={`Review file ${fileIndex}`}
                              style={{ width: "150px" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <p>{review.comments}</p>
                  <p >
                 <span className="fw-bold">Submitted on:{" "}</span>   
                    {new Date(review.timestamp.toDate()).toDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center fw-bold text-danger">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RatingReviews;










// -----------------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import Rating from "react-rating-stars-component";
// import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
// import { firestore, auth } from "../../firebaseConfig";
// import "./RatingReviews.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useParams, useNavigate } from "react-router-dom";

// const RatingReviews = () => {
//   const [rating, setRating] = useState(0);
//   const [files, setFiles] = useState([]);
//   const [rejectedFilesCount, setRejectedFilesCount] = useState(0);
//   const [ratingHeading, setRatingHeading] = useState("");
//   const [comments, setComments] = useState("");
//   const [reviews, setReviews] = useState([]);
//   const navigate = useNavigate();
//   const { productId } = useParams();

//   const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/bmp"];

//   const handleRatingChange = (newRating) => {
//     setRating(newRating);
//   };

//   const handleFileChange = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     const filteredFiles = selectedFiles.filter((file) =>
//       allowedTypes.includes(file.type)
//     );
//     const rejectedFiles = selectedFiles.filter(
//       (file) => !allowedTypes.includes(file.type)
//     );

//     setFiles(filteredFiles);
//     setRejectedFilesCount(rejectedFiles.length);
//   };

//   const handleFileRemove = (index) => {
//     setFiles(files.filter((_, i) => i !== index));
//   };

//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setUserId(user.uid);
//       } else {
//         setUserId(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       if (!productId) return;

//       const reviewsRef = collection(firestore, "users", userId, "Rating");
//       const q = query(reviewsRef, where("productId", "==", productId));
//       const querySnapshot = await getDocs(q);

//       const reviewsData = querySnapshot.docs.map((doc) => doc.data());
//       setReviews(reviewsData);
//     };

//     fetchReviews();
//   }, [productId]);

//   const handleFormSubmitRating = async (event) => {
//     event.preventDefault();

//     try {
//       await addDoc(collection(firestore, "users", userId, "Rating"), {
//         productId,
//         userId,
//         ratingHeading,
//         rating,
//         comments,
//         files: files.map((file) => file.name),
//         timestamp: new Date(),
//       });

//       toast.success("Review submitted successfully!");

//       setRatingHeading("");
//       setRating(0);
//       setComments("");
//       setFiles([]);
//       setRejectedFilesCount(0);

//       // Fetch the reviews again to include the newly added review
//       const reviewsRef = collection(firestore, "users", userId, "Rating");
//       const q = query(reviewsRef, where("productId", "==", productId));
//       const querySnapshot = await getDocs(q);

//       const reviewsData = querySnapshot.docs.map((doc) => doc.data());
//       setReviews(reviewsData);
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };

//   return (
//     <>
//       <div className="container my-5">
//         <div className="row">
//           <div className="col">
//             <div className="d-flex">
//               <h4 className="fw-bold">Ratings & Reviews</h4>

//               <button
//                 className="ms-auto px-5 py-2 border-0 bg-primary text-white rounded-pill"
//                 data-bs-toggle="modal"
//                 data-bs-target="#staticBackdropRATING"
//               >
//                 Rating
//               </button>
//             </div>
//           </div>
//           <div>
//             {/* Modal */}
//             <div
//               className="modal fade"
//               id="staticBackdropRATING"
//               data-bs-backdrop="static"
//               data-bs-keyboard="false"
//               tabIndex={-1}
//               aria-labelledby="staticBackdropLabel"
//               aria-hidden="true"
//             >
//               <div className="modal-dialog modal-dialog-scrollable">
//                 <div className="modal-content">
//                   <div className="modal-header">
//                     <h1
//                       className="modal-title fs-5 fw-bold"
//                       id="staticBackdropLabel"
//                     >
//                       Ratings & Reviews
//                     </h1>
//                     <button
//                       type="button"
//                       className="btn-close"
//                       data-bs-dismiss="modal"
//                       aria-label="Close"
//                     />
//                   </div>

//                   <div className="modal-body">
//                     <form onSubmit={handleFormSubmitRating}>
//                       <div>
//                         <div className="my-2">
//                           <label htmlFor="ratingHeading">Rating Heading</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Rating Heading"
//                             aria-label="Username"
//                             aria-describedby="basic-addon1"
//                             name="ratingHeading"
//                             value={ratingHeading}
//                             onChange={(e) => setRatingHeading(e.target.value)}
//                           />
//                         </div>

//                         <div className="my-2">
//                           <label htmlFor="ratingStars">Rating Star</label>
//                           <Rating
//                             count={5}
//                             onChange={handleRatingChange}
//                             size={40}
//                             activeColor="#ffd700"
//                             value={rating}
//                           />
//                         </div>

//                         <div className="my-2">
//                           <label htmlFor="comments">Comments</label>
//                           <div className="form-floating">
//                             <textarea
//                               className="form-control"
//                               placeholder="Leave a comment here"
//                               id="floatingTextarea"
//                               value={comments}
//                               onChange={(e) => setComments(e.target.value)}
//                             ></textarea>
//                           </div>
//                         </div>

//                         <div className="my-2">
//                           <label htmlFor="fileUpload">Upload Photos</label>
//                           <input
//                             type="file"
//                             className="form-control"
//                             id="fileUpload"
//                             multiple
//                             onChange={handleFileChange}
//                           />
//                         </div>

//                         {files.length > 0 && (
//                           <div className="my-2">
//                             <h5>Selected Files:</h5>
//                             <ul className="list-group">
//                               {files.map((file, index) => (
//                                 <li
//                                   key={index}
//                                   className="list-group-item d-flex justify-content-between align-items-center"
//                                 >
//                                   {file.name}
//                                   <button
//                                     type="button"
//                                     className="btn text-danger btn-sm fw-bold"
//                                     onClick={() => handleFileRemove(index)}
//                                   >
//                                     <i className="bi bi-x-lg"></i>
//                                   </button>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}
//                         {rejectedFilesCount > 0 && (
//                           <div className="my-2 text-danger">
//                             <h6>
//                               {rejectedFilesCount} file(s) were not accepted due
//                               to invalid format. Only bitmap, jpeg, png, and jpg
//                               are accepted.
//                             </h6>
//                           </div>
//                         )}
//                       </div>
//                       <button type="submit" className="btn btn-primary">
//                         Submit
//                       </button>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container">
//         <div className="row">
//           <div className="col">
//             {reviews.length > 0 ? (
//               reviews.map((review, index) => (
//                 <div key={index} className="review">
//                   <h5>{review.ratingHeading}</h5>
//                   <Rating
//                     count={5}
//                     size={24}
//                     activeColor="#ffd700"
//                     value={review.rating}
//                     edit={false}
//                   />
//                    {review.files.length > 0 && (
//                     <div>
//                       <h6>Photos:</h6>
//                       {review.files.map((file, fileIndex) => (
//                         <div key={fileIndex}>
//                           <img
//                             src={`/path/to/your/uploaded/files/${file}`}
//                             alt={file}
//                             style={{ width: "100px", height: "100px" }}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                   <p>{review.comments}</p>
//                   <p>
//                     Submitted on:{" "}
//                     {new Date(review.timestamp.toDate()).toDateString()}
//                   </p>

//                 </div>
//               ))
//             ) : (
//               <p>No reviews yet.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RatingReviews;





// ==================================================================
// import React, { useState, useEffect } from "react";
// import Rating from "react-rating-stars-component";
// import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
// import { firestore, auth } from "../../firebaseConfig";
// import "./RatingReviews.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useParams, useNavigate } from "react-router-dom";

// const RatingReviews = () => {
//   const [rating, setRating] = useState(0);
//   const [files, setFiles] = useState([]);
//   const [rejectedFilesCount, setRejectedFilesCount] = useState(0);
//   const [ratingHeading, setRatingHeading] = useState("");
//   const [comments, setComments] = useState("");
//   const [reviews, setReviews] = useState([]);
//   const navigate = useNavigate();
//   const { productId } = useParams();

//   const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/bmp"];

//   const handleRatingChange = (newRating) => {
//     setRating(newRating);
//   };

//   const handleFileChange = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     const filteredFiles = selectedFiles.filter((file) =>
//       allowedTypes.includes(file.type)
//     );
//     const rejectedFiles = selectedFiles.filter(
//       (file) => !allowedTypes.includes(file.type)
//     );

//     setFiles(filteredFiles);
//     setRejectedFilesCount(rejectedFiles.length);
//   };

//   const handleFileRemove = (index) => {
//     setFiles(files.filter((_, i) => i !== index));
//   };

//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setUserId(user.uid);
//       } else {
//         setUserId(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       if (!productId) return;

//       const reviewsRef = collection(firestore, "ProductReviews");
//       const q = query(reviewsRef, where("productId", "==", productId));
//       const querySnapshot = await getDocs(q);

//       const reviewsData = querySnapshot.docs.map(doc => doc.data());
//       setReviews(reviewsData);
//     };

//     fetchReviews();
//   }, [productId]);

//   const handleFormSubmitRating = async (event) => {
//     event.preventDefault();

//     try {
//       await addDoc(collection(firestore, "ProductReviews"), {
//         productId,
//         userId,
//         ratingHeading,
//         rating,
//         comments,
//         files: files.map((file) => file.name),
//         timestamp: new Date(),
//       });

//       toast.success("Review submitted successfully!");

//       setRatingHeading("");
//       setRating(0);
//       setComments("");
//       setFiles([]);
//       setRejectedFilesCount(0);

//       // Fetch the reviews again to include the newly added review
//       const reviewsRef = collection(firestore, "ProductReviews");
//       const q = query(reviewsRef, where("productId", "==", productId));
//       const querySnapshot = await getDocs(q);

//       const reviewsData = querySnapshot.docs.map(doc => doc.data());
//       setReviews(reviewsData);

//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };

//   return (
//     <>
//       <div className="container my-5">
//         <div className="row">
//           <div className="col">
//             <div className="d-flex">
//               <h4 className="fw-bold">Ratings & Reviews</h4>

//               <button
//                 className="ms-auto px-5 py-2 border-0 bg-primary text-white rounded-pill"
//                 data-bs-toggle="modal"
//                 data-bs-target="#staticBackdropRATING"
//               >
//                 Rating
//               </button>
//             </div>
//           </div>
//           <div>
//             {/* Modal */}
//             <div
//               className="modal fade"
//               id="staticBackdropRATING"
//               data-bs-backdrop="static"
//               data-bs-keyboard="false"
//               tabIndex={-1}
//               aria-labelledby="staticBackdropLabel"
//               aria-hidden="true"
//             >
//               <div className="modal-dialog modal-dialog-scrollable">
//                 <div className="modal-content">
//                   <div className="modal-header">
//                     <h1
//                       className="modal-title fs-5 fw-bold"
//                       id="staticBackdropLabel"
//                     >
//                       Ratings & Reviews
//                     </h1>
//                     <button
//                       type="button"
//                       className="btn-close"
//                       data-bs-dismiss="modal"
//                       aria-label="Close"
//                     />
//                   </div>

//                   <div className="modal-body">
//                     <form onSubmit={handleFormSubmitRating}>
//                       <div>
//                         <div className="my-2">
//                           <label htmlFor="ratingHeading">Rating Heading</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Rating Heading"
//                             aria-label="Username"
//                             aria-describedby="basic-addon1"
//                             name="ratingHeading"
//                             value={ratingHeading}
//                             onChange={(e) => setRatingHeading(e.target.value)}
//                           />
//                         </div>

//                         <div className="my-2">
//                           <label htmlFor="ratingStars">Rating Star</label>
//                           <Rating
//                             count={5}
//                             onChange={handleRatingChange}
//                             size={40}
//                             activeColor="#ffd700"
//                             value={rating}
//                           />
//                         </div>

//                         <div className="my-2">
//                           <label htmlFor="comments">Comments</label>
//                           <div className="form-floating">
//                             <textarea
//                               className="form-control"
//                               placeholder="Leave a comment here"
//                               id="floatingTextarea"
//                               value={comments}
//                               onChange={(e) => setComments(e.target.value)}
//                             ></textarea>
//                           </div>
//                         </div>

//                         <div className="my-2">
//                           <label htmlFor="fileUpload">Upload Photos</label>
//                           <input
//                             type="file"
//                             className="form-control"
//                             id="fileUpload"
//                             multiple
//                             onChange={handleFileChange}
//                           />
//                         </div>

//                         {files.length > 0 && (
//                           <div className="my-2">
//                             <h5>Selected Files:</h5>
//                             <ul className="list-group">
//                               {files.map((file, index) => (
//                                 <li
//                                   key={index}
//                                   className="list-group-item d-flex justify-content-between align-items-center"
//                                 >
//                                   {file.name}
//                                   <button
//                                     type="button"
//                                     className="btn text-danger btn-sm fw-bold"
//                                     onClick={() => handleFileRemove(index)}
//                                   >
//                                     <i className="bi bi-x-lg"></i>
//                                   </button>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}
//                         {rejectedFilesCount > 0 && (
//                           <div className="my-2 text-danger">
//                             <h6>
//                               {rejectedFilesCount} file(s) were not accepted due
//                               to invalid format. Only bitmap, jpeg, png, and jpg
//                               are accepted.
//                             </h6>
//                           </div>
//                         )}
//                       </div>
//                       <button type="submit" className="btn btn-primary">
//                         Submit
//                       </button>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="container">
//         <div className="row">
//           <div className="col">
//             {reviews.length > 0 ? (
//               reviews.map((review, index) => (
//                 <div key={index} className="review">
//                   <h5>{review.ratingHeading}</h5>
//                   <Rating
//                     count={5}
//                     size={24}
//                     activeColor="#ffd700"
//                     value={review.rating}
//                     edit={false}
//                   />
//                   <p>{review.comments}</p>
//                   <p>Submitted on: {new Date(review.timestamp.toDate()).toDateString()}</p>
//                   {review.files.length > 0 && (
//                     <div>
//                       <h6>Photos:</h6>
//                       {review.files.map((file, fileIndex) => (
//                         <div key={fileIndex}>
//                           <img src={`/path/to/your/uploaded/files/${file}`} alt={file} style={{width: '100px'}} />
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p>No reviews yet.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RatingReviews;




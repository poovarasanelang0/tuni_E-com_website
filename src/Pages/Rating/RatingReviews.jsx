import React, { useState, useEffect } from "react";
import Rating from "react-rating-stars-component";
import { collection, addDoc } from "firebase/firestore";
import { firestore, auth } from "../../firebaseConfig";
import "./RatingReviews.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";


const RatingReviews = () => {
  const [rating, setRating] = useState(0);
  const [files, setFiles] = useState([]);
  const [rejectedFilesCount, setRejectedFilesCount] = useState(0);
  const [ratingHeading, setRatingHeading] = useState("");
  const [comments, setComments] = useState("");
  const navigate = useNavigate();

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/bmp"];

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

    // Cleanup function to unsubscribe from the listener when component unmounts
    return () => unsubscribe();
  }, []);

  const handleFormSubmitRating = async (event) => {
    event.preventDefault();

    const cartCollectionRef = collection(firestore, "users", userId, "Rating");

    try {
      await addDoc(cartCollectionRef, {
        ratingHeading,
        rating,
        comments,
        files: files.map((file) => file.name), // Storing file names, handle actual file uploads separately
        timestamp: new Date(),
      });
      // alert("Review submitted successfully!");
      toast.success("Review submitted successfully!");

      // Clear form fields
      setRatingHeading("");
      setRating(0);
      setComments("");
      setFiles([]);
      setRejectedFilesCount(0);

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
                                    <i class="bi bi-x-lg"></i>
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
                              to invalid format.Only bitmap, jpeg, png, and jpg
                              are accepted.
                            </h6>
                          </div>
                        )}
                      </div>
                      <button type="submit" className="btn btn-primary">
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
    </>
  );
};

export default RatingReviews;

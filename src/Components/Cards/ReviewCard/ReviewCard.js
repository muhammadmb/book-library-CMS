import React from 'react';
import './ReviewCardStyle.css';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReviews } from '../../../Store/ReviewsSlice';
import { useParams } from 'react-router-dom';

const ReviewCard = () => {

    const { reviews } = useSelector((state) => state.reviews);
    const { roles } = useSelector((state) => state.auth);
    const { genreId, bookId } = useParams();
    const dispatch = useDispatch();

    const handleDeleteReview = (reviewData) => {
        dispatch(deleteReviews(reviewData));
    }

    return (
        <div>
            {
                reviews.map(review =>

                    <div
                        key={review.id}
                        className='review-card'
                    >
                        <div className="info">
                            <Avatar
                                className="avatar"
                            >
                                {review.reviewerName?.substr(0, 1).toUpperCase()}
                            </Avatar>

                            <div className="reviwer-data">
                                <h5
                                    long={review.reviewerName?.length > 10 ? "true" : "false"}
                                >
                                    {review.reviewerName}
                                </h5>
                                <span className="date">{review.email}</span>
                                <Rating
                                    className="ratingStarts"
                                    name="hover-feedback"
                                    size="small"
                                    precision={1}
                                    value={review.bookRate}
                                    readOnly
                                />
                                <span className="date">{review.addedDate && review.addedDate.substr(0, 10)}</span>
                            </div>
                        </div>

                        <p>
                            {review.reviewDescription}
                        </p>

                        <div className="voting">
                            <button className="vote">
                                <ExpandLessIcon />
                                <span className="counter">{review.upVote}</span>
                            </button>

                            <button className="vote">
                                <ExpandMoreIcon />
                                <span className="counter">{review.downVote}</span>
                            </button>
                        </div>
                        {
                            roles.find((role) => role === "Master") &&
                            <button
                                className="card-btn delete"
                                onClick={() => handleDeleteReview({
                                    genreId,
                                    bookId,
                                    reviewId: review.id
                                })}
                            >
                                <i className="fa fa-trash" aria-hidden="true"></i> delete
                            </button>
                        }
                    </div>
                )
            }

        </div>
    );
}

export default ReviewCard;
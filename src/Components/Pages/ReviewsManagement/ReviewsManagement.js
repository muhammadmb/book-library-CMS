import React, { useState } from 'react';
import './ReviewsManagementStyle.css';
import Search from '../../Search/Search';
import Card from '../../Card/Card';

function ReviewsManagement() {

    const [reviewData, setReviewData] = useState([]);
    const searchData = (data) => {
        setReviewData(data);
    }

    return (
        <div className="page-container">
            <Search
                type="review"
                data={searchData}
            />

            {
                reviewData.map((review) => (
                    <Card
                        url={`genre/${review.genreId}/books/${review.bookId}`}
                        key={review.id}
                        type="review"
                        cardName={review.reviewDescription}
                        reviewId={review.id}
                        upVote={review.upVote}
                        downVote={review.downVote}
                        reviewerName={review.reviewerName}
                        email={review.email}
                    />
                ))
            }

        </div>
    )
}

export default ReviewsManagement;

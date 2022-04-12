import React, { useEffect, useState } from 'react';
import './ReviewsManagementStyle.css';
import '../ManagementsPagesStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../../Store/ReviewsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewCard from '../../Cards/ReviewCard/ReviewCard';
import LoadingAnimation from '../../../Loading/LoadingAnimation/LoadingAnimation';

function ReviewsManagement() {

    const { genreId, bookId, pageNumber } = useParams();
    const { reviews, headers, reviewsLoading, reviewDeleting, errors } = useSelector((state) => state.reviews);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [hasNext, setHasNext] = useState();
    const [hasPrevious, setHasPrevious] = useState();
    const [totalPages, setTotalPages] = useState();

    useEffect(() => {
        if (headers) {
            setHasNext(JSON.parse(headers["x-pagination"])?.hasNext);
            setHasPrevious(JSON.parse(headers["x-pagination"])?.hasPrevious);
            setTotalPages(JSON.parse(headers["x-pagination"])?.totalPages);
        }
    }, [headers, pageNumber]);

    useEffect(() => {
        if (reviewsLoading === false && reviews.length === 0 && headers && Number.parseInt(pageNumber) > 1) {
            navigate(`/reviews-management/genre/${genreId}/book/${bookId}/reviews/${Number.parseInt(pageNumber ? pageNumber : 1) - 1}`);
        }

        if (pageNumber > totalPages && pageNumber > 1) {
            navigate(`/reviews-management/genre/${genreId}/book/${bookId}/reviews/${Number.parseInt(totalPages)}`);
        }
    }, [reviews]);

    useEffect(() => {
        dispatch(getReviews({
            genreId,
            bookId,
            pageNumber: pageNumber ? pageNumber : 1,
            pageSize: 10
        }));
    }, [dispatch, genreId, bookId, pageNumber]);

    return (
        <>
            {
                reviewsLoading &&
                <div className='loading'>
                    <LoadingAnimation />
                </div>
            }
            {
                reviewDeleting && errors === null &&
                <div className='loading'>
                    <LoadingAnimation />
                </div>
            }

            <div className="page-container">
                {
                    reviewsLoading === false && reviews.length < 1 &&
                    <p className='no-reviews'>
                        this book has no reviews
                    </p>
                }
                <ReviewCard />
                {
                    reviews.length !== 0 &&
                    <div className='nav-buttons'>
                        <button
                            className='nav-btn previous'
                            onClick={() => navigate(`/reviews-management/genre/${genreId}/book/${bookId}/reviews/${Number.parseInt(pageNumber ? pageNumber : 1) - 1}`)}
                            disabled={!hasPrevious}
                        >
                            Previous
                        </button>

                        <button
                            className='nav-btn next'
                            onClick={() => navigate(`/reviews-management/genre/${genreId}/book/${bookId}/reviews/${Number.parseInt(pageNumber ? pageNumber : 1) + 1}`)}
                            disabled={!hasNext}
                        >
                            Next
                        </button>
                    </div>
                }
            </div>
        </>
    )
}

export default ReviewsManagement;

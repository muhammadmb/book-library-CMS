import React, { useEffect, useState } from 'react';
import FeedbackCard from '../../FeedbackCard/FeedbackCard';
import MuiAlert from '@material-ui/lab/Alert';
import './FeedbackStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedbacks } from '../../../Store/FeedbackSlice';
import { useNavigate, useParams } from 'react-router-dom';

const Feedback = () => {

    const { pageNumber } = useParams();
    const { feedbacks, headers, feedbackLoading, status } = useSelector((state) => state.feedbacks);
    const [hasNext, setHasNext] = useState();
    const [hasPrevious, setHasPrevious] = useState();
    const [totalPages, setTotalPages] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (headers) {
            setHasNext(JSON.parse(headers["x-pagination"])?.hasNext);
            setHasPrevious(JSON.parse(headers["x-pagination"])?.hasPrevious);
            setTotalPages(JSON.parse(headers["x-pagination"])?.totalPages);
        }
    }, [headers, pageNumber]);

    useEffect(() => {
        if (feedbackLoading === false && feedbacks.length === 0 && headers && Number.parseInt(pageNumber) > 1) {
            navigate(`/feedback/${Number.parseInt(pageNumber ? pageNumber : 1) - 1}`);
        }

        if (pageNumber > totalPages && pageNumber > 1) {
            navigate(`/feedback/${Number.parseInt(totalPages)}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [feedbacks]);

    useEffect(() => {
        dispatch(getFeedbacks({
            pageNumber: pageNumber ? pageNumber : 1,
            pageSize: 10
        }))
    }, [dispatch, pageNumber]);

    return (
        <div className='page-container'>
            {
                feedbacks.length === 0 &&
                feedbackLoading === false &&
                status === 200 &&
                <MuiAlert severity="success">You have no Feedback Now!</MuiAlert>

            }

            {
                feedbacks.map(feedback => (
                    <FeedbackCard
                        key={feedback.id}
                        feedback={feedback}
                    />
                ))
            }

            {
                feedbacks.length !== 0 &&
                <div className='nav-buttons'>
                    <button
                        className='nav-btn previous'
                        onClick={() => navigate(`/feedback/${Number.parseInt(pageNumber ? pageNumber : 1) - 1}`)}
                        disabled={!hasPrevious}
                    >
                        Previous
                    </button>

                    <button
                        className='nav-btn next'
                        onClick={() => navigate(`/feedback/${Number.parseInt(pageNumber ? pageNumber : 1) + 1}`)}
                        disabled={!hasNext}
                    >
                        Next
                    </button>
                </div>
            }

        </div>
    );
};

export default Feedback;

import React, { useEffect, useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import './SuggestionsPageStyle.css';
import SugesstionCard from '../../SugesstionCard/SugesstionCard';
import { useDispatch, useSelector } from 'react-redux';
import { getSuggestions } from '../../../Store/SuggestionsSlice';
import { useNavigate, useParams } from 'react-router-dom';

function SuggestionsPage() {

    const { pageNumber } = useParams();
    const { suggestions, headers, suggestionLoading, status } = useSelector((state) => state.suggestions);
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
        dispatch(getSuggestions({
            pageNumber: pageNumber ? pageNumber : 1,
            numberOfBookPagesize: 5
        }))
    }, [dispatch, pageNumber]);

    useEffect(() => {
        if (suggestionLoading === false && suggestions.length === 0 && headers && Number.parseInt(pageNumber) > 1) {
            navigate(`/suggestions/${Number.parseInt(pageNumber ? pageNumber : 1) - 1}`);
        }

        if (pageNumber > totalPages && pageNumber > 1) {
            navigate(`/suggestions/${Number.parseInt(totalPages)}`);
        }
    }, [suggestions]);

    return (
        <div className="page-container">

            {
                suggestions.length === 0 &&
                suggestionLoading === false &&
                status === 200 &&
                <MuiAlert severity="success">You have no Suggestions Now!</MuiAlert>
            }

            {
                suggestions.length !== 0 &&
                suggestionLoading === false &&
                suggestions.map((suggest) => (
                    <SugesstionCard
                        key={suggest.id}
                        suggest={suggest}
                    />
                ))
            }

            {
                suggestions.length !== 0 &&
                <div className='nav-buttons'>
                    <button
                        className='nav-btn previous'
                        onClick={() => navigate(`/suggestions/${Number.parseInt(pageNumber ? pageNumber : 1) - 1}`)}
                        disabled={!hasPrevious}
                    >
                        Previous
                    </button>

                    <button
                        className='nav-btn next'
                        onClick={() => navigate(`/suggestions/${Number.parseInt(pageNumber ? pageNumber : 1) + 1}`)}
                        disabled={!hasNext}
                    >
                        Next
                    </button>
                </div>
            }
        </div>
    )
}

export default SuggestionsPage;

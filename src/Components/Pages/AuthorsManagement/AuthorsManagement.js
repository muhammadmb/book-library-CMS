import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingAnimation from '../../../Loading/LoadingAnimation/LoadingAnimation';
import { getAuthors } from '../../../Store/AuthorSlice';
import AuthorCard from '../../Cards/AuthorCard/AuthorCard';
import Search from '../../Search/Search';
import './AuthorsManagementStyle.css';
import '../ManagementsPagesStyle.css';

const AuthorsManagement = () => {

    let { pageNumber } = useParams();
    const [hasNext, setHasNext] = useState();
    const [hasPrevious, setHasPrevious] = useState();
    const [searchQuery, setSearchQuery] = useState([]);
    const { authors, errors, authorsLoading, headers } = useSelector((state) => state.authors)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAuthors({
            fields: "",
            searchQuery,
            pageNumber,
            pageSize: 10
        }))
    }, [dispatch, searchQuery, pageNumber]);

    useEffect(() => {
        if (headers) {
            setHasNext(JSON.parse(headers["x-pagination"])?.hasNext);
            setHasPrevious(JSON.parse(headers["x-pagination"])?.hasPrevious);
        }
    }, [headers, pageNumber]);

    const searchData = (data) => {
        setSearchQuery(data);
    }

    return (

        <>
            {
                errors === null &&
                authorsLoading === true &&
                <div className='loading'>
                    <LoadingAnimation />
                </div>
            }
            <div className="page-container">
                <Search
                    type="author"
                    addUrl="/authors-management/add"
                    searchQuery={searchData}
                />

                {
                    authors.length !== 0 &&
                    authorsLoading === false &&
                    <div className="tb-header-5">
                        <span>author</span>
                        <span>genre</span>
                        <span>add</span>
                        <span>update</span>
                        <span>actions</span>
                    </div>
                }

                {
                    authors.length === 0 &&
                    errors === undefined &&
                    authorsLoading === false &&
                    <p className='notfound-message'>
                        we can't get your result about "{searchQuery}", try something else.
                    </p>
                }

                <AuthorCard />

                {
                    authors.length !== 0 &&
                    <div className='nav-buttons'>
                        <button
                            className='nav-btn previous'
                            onClick={() => navigate(`/authors-management/${Number.parseInt(pageNumber ? pageNumber : 1) - 1}`)}
                            disabled={!hasPrevious}
                        >
                            Previous
                        </button>

                        <button
                            className='nav-btn next'
                            onClick={() => navigate(`/authors-management/${Number.parseInt(pageNumber ? pageNumber : 1) + 1}`)}
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

export default AuthorsManagement;

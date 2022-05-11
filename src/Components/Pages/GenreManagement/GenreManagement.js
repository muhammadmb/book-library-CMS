import React, { useEffect, useState } from 'react';
import '../ManagementsPagesStyle.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingAnimation from '../../../Loading/LoadingAnimation/LoadingAnimation';
import { getGenres } from '../../../Store/GenresSlice';
import GenreCard from '../../Cards/GenreCard/GenreCard';
import Search from '../../Search/Search';

const GenreManagement = () => {

    const { pageNumber } = useParams();
    const [searchQuery, setSearchQuery] = useState();
    const { genres, errors, headers, genreLoading, genreDeleting, status } = useSelector((state) => state.genres);
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
        dispatch(getGenres({
            searchQuery,
            pageNumber,
            pageSize: 10
        }));
    }, [dispatch, pageNumber, searchQuery]);

    useEffect(() => {
        if (genreLoading === false && genres.length === 0 && headers && Number.parseInt(pageNumber) > 1) {
            navigate(`/genres-management/${Number.parseInt(pageNumber ? pageNumber : 1) - 1}`);
        }

        if (pageNumber > totalPages && pageNumber > 1) {
            navigate(`/genres-management/${Number.parseInt(totalPages)}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genres]);

    const searchData = (data) => {
        setSearchQuery(data);
    }
    return (

        <>
            {
                errors === null &&
                genreLoading &&
                <div className='loading'>
                    <LoadingAnimation />
                </div>
            }

            {
                errors === null &&
                genreDeleting &&
                <LoadingAnimation />
            }

            <div className='page-container'>

                <Search
                    type="genres"
                    addUrl="/genres-management/add"
                    searchQuery={searchData}
                />

                {
                    status === 200 &&
                    genres.length === 0 &&
                    <p className='notfound-message'>
                        we can't get your result about "{searchQuery}", try something else.
                    </p>
                }

                {
                    genres.length !== 0 &&
                    genreLoading === false &&
                    <div className="tb-header-4">
                        <span>Genre</span>
                        <span>add</span>
                        <span>update</span>
                        <span>actions</span>
                    </div>
                }

                <GenreCard />
                {
                    genres.length !== 0 &&
                    <div className='nav-buttons'>
                        <button
                            className='nav-btn previous'
                            onClick={() => navigate(`/genres-management/${Number.parseInt(pageNumber ? pageNumber : 1) - 1}`)}
                            disabled={!hasPrevious}
                        >
                            Previous
                        </button>

                        <button
                            className='nav-btn next'
                            onClick={() => navigate(`/genres-management/${Number.parseInt(pageNumber ? pageNumber : 1) + 1}`)}
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

export default GenreManagement;
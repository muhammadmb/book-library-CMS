import React, { useEffect, useState } from 'react';
import BookCard from '../../Cards/BookCard/BookCard';
import Search from '../../Search/Search';
import { getBooks } from '../../../Store/BooksSlice';
import './BooksManagementStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import BookLoading from '../../../Loading/BookLoading/BookLoading';
import { useNavigate, useParams } from 'react-router-dom';
import '../ManagementsPagesStyle.css';

const BooksManagement = () => {

    let { pageNumber } = useParams();
    const { books, errors, booksLoading, headers } = useSelector((state) => state.books);
    const [hasNext, setHasNext] = useState();
    const [hasPrevious, setHasPrevious] = useState();
    const [searchQuery, setSearchQuery] = useState([]);
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
        if (booksLoading === false && books.length === 0 && headers && Number.parseInt(pageNumber) > 1) {
            navigate(`/books-management/${Number.parseInt(pageNumber ? pageNumber : 1) - 1}`);
        }

        if (pageNumber > totalPages && pageNumber > 1) {
            navigate(`/books-management/${Number.parseInt(totalPages)}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [books]);

    useEffect(() => {
        dispatch(getBooks({
            fields: "id,genre,bookTitle,bookCover,publisher, addedDate, updateDate, author",
            searchQuery,
            pageNumber: pageNumber ? pageNumber : 1,
            pageSize: 10
        }));
    }, [dispatch, searchQuery, pageNumber]);

    const searchData = (data) => {
        setSearchQuery(data);
    }

    return (
        <div className="page-container">
            <Search
                type="book"
                addUrl="/books-management/add"
                searchQuery={searchData}
            />

            {
                errors === null &&
                booksLoading === true &&
                <BookLoading />
            }

            {
                books.length === 0 &&
                errors === null &&
                booksLoading === false &&
                <p className='notfound-message'>
                    we can't get your result about "{searchQuery}", try something else.
                </p>
            }

            {
                books.length !== 0 &&
                booksLoading === false &&
                <div className="tb-header-6">
                    <span>book title</span>
                    <span>genre</span>
                    <span>add</span>
                    <span>update</span>
                    <span>reviews</span>
                    <span>actions</span>
                </div>
            }

            <BookCard />

            {
                books.length !== 0 &&
                <div className='nav-buttons'>
                    <button
                        className='nav-btn previous'
                        onClick={() => navigate(`/books-management/${Number.parseInt(pageNumber ? pageNumber : 1) - 1}`)}
                        disabled={!hasPrevious}
                    >
                        Previous
                    </button>

                    <button
                        className='nav-btn next'
                        onClick={() => navigate(`/books-management/${Number.parseInt(pageNumber ? pageNumber : 1) + 1}`)}
                        disabled={!hasNext}
                    >
                        Next
                    </button>
                </div>
            }
        </div>
    )
}

export default BooksManagement;

import React, { useEffect, useState } from 'react';
import BookCard from '../../Cards/BookCard/BookCard';
import Search from '../../Search/Search';
import { getBooks } from '../../../Store/BooksSlice';
import './BooksManagementStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import BookLoading from '../../../Loading/BookLoading/BookLoading';
import { useNavigate, useParams } from 'react-router-dom';

const BooksManagement = () => {

    let { pageNumber } = useParams();
    const { books, errors, booksLoading, headers } = useSelector((state) => state.books);
    const [hasNext, setHasNext] = useState();
    const [hasPrevious, setHasPrevious] = useState();
    const [searchQuery, setSearchQuery] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (headers) {
            setHasNext(JSON.parse(headers["x-pagination"])?.hasNext);
            setHasPrevious(JSON.parse(headers["x-pagination"])?.hasPrevious);
        }
    }, [headers, pageNumber]);

    useEffect(() => {
        dispatch(getBooks({
            fields: "id,genre,bookTitle,bookCover,publisher, addedDate, updateDate, author",
            searchQuery,
            pageNumber,
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
                <div className="books-container">
                    <span>book title</span>
                    <span>genre</span>
                    <span>added date</span>
                    <span>update Date</span>
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

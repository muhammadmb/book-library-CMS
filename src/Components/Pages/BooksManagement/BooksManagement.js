import React, { useEffect, useState } from 'react';
import BookCard from '../../Cards/BookCard/BookCard';
import Search from '../../Search/Search';
import { getBooks } from '../../../Store/BooksSlice';
import './BooksManagementStyle.css';
import { useDispatch, useSelector } from 'react-redux';

const BooksManagement = () => {

    const { books, errors, booksLoading } = useSelector((state) => state.books);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState([]);
    useEffect(() => {
        dispatch(getBooks({
            fields: "id,genre,bookTitle,bookCover,publisher, addedDate, updateDate, author",
            searchQuery,
            pageNumber: 1,
            pageSize: 10
        }));
    }, [dispatch, searchQuery]);

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
        </div>
    )
}

export default BooksManagement;

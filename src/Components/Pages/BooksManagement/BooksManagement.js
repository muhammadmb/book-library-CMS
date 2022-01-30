import React, { useState } from 'react';
import Card from '../../Card/Card';
import Search from '../../Search/Search';
import './BooksManagementStyle.css';

const BooksManagement = () => {

    const [bookData, setBookData] = useState([]);
    const searchData = (data) => {
        setBookData(data);
    }

    return (
        <div className="page-container">
            <Search
                type="book"
                addUrl="/books-management/add"
                data={searchData}
            />
            {
                bookData.map((book) => (
                    <Card
                        key={book.id}
                        pic={book.bookCover}
                        type="book"
                        cardName={book.bookTitle}
                        bookId={book.id}
                        genreId={book.genreId}
                        genre={book.genre}
                        publisher={book.publisher}
                    />
                ))
            }

        </div>
    )
}

export default BooksManagement;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { APP_URL } from '../../../API/URLConstants';
import { deleteBook } from '../../../Store/BooksSlice';
import './BookCardStyle.css';

const BookCard = () => {

    const { books } = useSelector((state) => state.books);
    const { roles } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handelDeleteBook = async (genreId, bookId) => {
        dispatch(deleteBook({
            bookId,
            genreId
        }));
    }

    return (
        <div className='book-cards'>
            {
                books.map((book) => (
                    <div className='book' key={book.id}>
                        <span>
                            <span>
                                <img className='card-img' src={book.bookCover} alt={book.bookTitle} />
                            </span>
                            <span className='book-title'>
                                <span>
                                    <a href={`${APP_URL}/genes/${book.genre?.id}/books/${book.id}`} >
                                        {book.bookTitle}
                                    </a>
                                </span>
                                <span
                                    className='author-name'
                                >
                                    <a href={`${APP_URL}/authors/${book.author?.id}`}>
                                        {book.author?.name}
                                    </a>
                                </span>
                            </span>
                        </span>
                        <span>
                            {book.genre?.genreName}
                        </span>
                        <span>
                            {book.addedDate?.substring(0, 10)}
                        </span>
                        <span>
                            {book.updateDate?.substring(0, 4) === "0001" ? "No update" : book.updateDate?.substring(0, 10)}
                        </span>

                        <span>
                            <button className="card-btn edit">
                                <Link
                                    to={`/books-management/edit-book/genre/${book.genre?.id}/book/${book.id}`}
                                >
                                    <i className="fa fa-pencil" aria-hidden="true"></i> edit
                                </Link>
                            </button>
                            {
                                roles.find((role) => role === "Master") &&
                                <button
                                    className="card-btn delete"
                                    onClick={() => handelDeleteBook(book.genre?.id, book.id)}
                                >
                                    <i className="fa fa-trash" aria-hidden="true"></i> delete
                                </button>
                            }
                        </span>
                    </div>
                ))
            }
        </div>
    )
}

export default BookCard;
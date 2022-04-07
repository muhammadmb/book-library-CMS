import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { APP_URL } from '../../../API/URLConstants';
import { deleteAuthor } from '../../../Store/AuthorSlice';
import '../CardsStyle.css';

const AuthorCard = () => {

    const { authors } = useSelector((state) => state.authors);
    const { roles } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleDeleteBook = async (authorId) => {
        dispatch(deleteAuthor(authorId));
    }

    return (
        <div className='cards'>
            {
                authors.map((author) => (
                    <div className='card-content' key={author.id}>
                        <span>
                            <span>
                                <img className='card-img' src={author.pictureUrl} alt={author.name} />
                            </span>
                            <span className='card-title'>
                                <a href={`${APP_URL}/Authors/${author.id}`} >
                                    {author.name}
                                </a>
                            </span>
                        </span>
                        <span>
                            {author.genre?.genreName}
                        </span>
                        <span>
                            {author.addedDate?.substring(0, 10)}
                        </span>
                        <span>
                            {author.updateDate?.substring(0, 4) === "0001" ? "No update" : author.updateDate?.substring(0, 10)}
                        </span>

                        <span>
                            <button className="card-btn edit">
                                <Link
                                    to={`/authors-management/edit-author/${author.id}`}
                                >
                                    <i className="fa fa-pencil" aria-hidden="true"></i> edit
                                </Link>
                            </button>
                            {
                                roles.find((role) => role === "Master") &&
                                <button
                                    className="card-btn delete"
                                    onClick={() => handleDeleteBook(author.id)}
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

export default AuthorCard;
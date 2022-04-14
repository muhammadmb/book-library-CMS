import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { APP_URL } from '../../../API/URLConstants';
import { deleteGenre } from '../../../Store/GenresSlice';

const GenreCard = () => {

    const { genres } = useSelector((state) => state.genres);
    const { roles } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handelDeleteBook = (genreId) => {
        dispatch(deleteGenre({
            genreId
        }));
    }

    return (
        <div className='cards'>
            {
                genres.map(genre => (
                    <div
                        key={genre.id}
                        className='card-content-4'
                    >
                        <span >
                            <img className="card-img" src={genre.picUrl} alt={genre.genreName} />
                            <span className='card-title'>
                                <a href={`${APP_URL}/genre/${genre.id}`} >
                                    {genre.genreName}
                                </a>
                            </span>
                        </span>
                        <span>
                            {genre.addedDate?.substring(0, 10)}
                        </span>
                        <span>
                            {genre.updateDate?.substring(0, 4) === "0001" ? "No update" : genre.updateDate?.substring(0, 10)}
                        </span>
                        <span>
                            <Link
                                className="card-btn edit"
                                to={`/genres-management/edit-genre/${genre.id}`}
                            >
                                <i className="fa fa-pencil" aria-hidden="true"></i> edit
                            </Link>
                            {
                                roles.find((role) => role === "Master") &&
                                <button
                                    className="card-btn delete"
                                    onClick={() => handelDeleteBook(genre.id)}
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

export default GenreCard;
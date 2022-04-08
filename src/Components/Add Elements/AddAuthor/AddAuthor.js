import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from '../../../API/axios';
import { API_URL } from '../../../API/URLConstants';
import { Debounce } from '../../../Helper/Debounce';
import { editAuthor, insertAuthor } from '../../../Store/AuthorSlice';
import '../AddElemntsStyle.css';
import Alert from '@material-ui/lab/Alert';
import { resetState } from '../../../Store/AuthorSlice';

const AddAuthor = () => {

    const [author, setAuthor] = useState({
        id: "",
        name: "",
        pictureUrl: "",
        genreId: "",
        dateOfBirth: "",
        dateOfDeath: "",
        bio: ""
    });

    const { authorId } = useParams();
    const [genres, setGenres] = useState([]);
    const [genreValue, setGenreValue] = useState("");
    const [successAlert, setSuccessAlert] = useState(false);
    const [openGenresOptions, setOpenGenresOptions] = useState(false);
    const { errors, authorAdded, authorUpdated } = useSelector((state) => state.authors);
    const dispatch = useDispatch();

    useEffect(() => {
        const getAuthor = async () => {
            const author = await axios.get(`${API_URL}/authors/${authorId}`);
            setAuthor(author.data);
            setGenreValue(author.data?.genre?.genreName);
            setAuthor(author => ({
                ...author,
                genreId: author.genre?.id
            }));
        }
        if (authorId) {
            getAuthor();
        }
    }, [authorId]);

    useEffect(() => {
        const close = () => {
            setTimeout(() => {
                setSuccessAlert(false);
                dispatch(resetState());
            }, 10000);
        }
        if (authorAdded || authorUpdated) {
            setSuccessAlert(true);
            close();
        }
    }, [authorAdded, authorUpdated, dispatch]);



    const handleSubmit = (e) => {
        e.preventDefault();
        if (authorId !== undefined) {
            dispatch(editAuthor(author));
        } else {
            dispatch(insertAuthor(author));
        }
    }

    const handleGenreChange = async (value) => {
        const genreSearch = await axios.get(`${API_URL}/Genres?fields=id,genreName&SearchQuery=${value}`);
        setGenres(genreSearch.data);
    }

    const DebouncedGenreChange = useCallback(Debounce(handleGenreChange), []);

    return (
        <div className='page-container addition'>
            <h2>
                {
                    authorId !== undefined ?
                        `edit ${author.name}'s information`
                        :
                        "Add a new Author"
                }
            </h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <span className="lable">Name</span>
                    <input
                        value={author.name}
                        type="text"
                        onChange={(e) => {
                            setAuthor(author => ({
                                ...author,
                                name: e.target.value
                            }))
                        }}
                        required />
                </div>

                <div>
                    <span className="lable">Picture</span>
                    <input
                        value={author.pictureUrl}
                        type="url"
                        onChange={(e) => {
                            setAuthor(author => ({
                                ...author,
                                pictureUrl: e.target.value
                            }))
                        }}
                        required />
                </div>

                <div>
                    <span className="lable">Date Of Birth</span>
                    <input
                        value={author.dateOfBirth?.substring(0, 10)}
                        type="date"
                        onChange={(e) => {
                            setAuthor(author => ({
                                ...author,
                                dateOfBirth: e.target.value
                            }))
                        }}
                        required />
                </div>

                <div>
                    <span className="lable">Date Of Death</span>
                    <input
                        value={author.dateOfDeath !== null && author.dateOfDeath.substring(0, 4) !== "0001" ? author.dateOfDeath.substring(0, 10) : null}
                        type="date"
                        onChange={(e) => {
                            setAuthor(author => ({
                                ...author,
                                dateOfDeath: e.target.value
                            }))
                        }}
                    />
                </div>

                <div>
                    <span className="lable">genre</span>
                    <input
                        type="text"
                        value={genreValue}
                        onChange={(event) => {
                            setGenreValue(event.target.value);
                            DebouncedGenreChange(event.target.value);
                        }}
                        onFocus={() => {
                            setOpenGenresOptions(true);
                        }}
                        onBlur={() => {
                            setTimeout(() => {
                                setOpenGenresOptions(false);
                            }, 100);
                        }}
                        required
                    />
                    {
                        openGenresOptions &&
                        genres.length !== 0 &&
                        <ul className='options'>
                            {
                                genres.map((genre) => (
                                    <li
                                        key={genre.id}
                                        onClick={() => {
                                            setGenreValue(genre.genreName);
                                            setAuthor(author => ({
                                                ...author,
                                                genreId: genre.id
                                            }));
                                            setOpenGenresOptions(false);
                                        }}
                                    >
                                        {genre.genreName}
                                    </li>
                                ))
                            }
                        </ul>
                    }
                </div>

                <div className="textarea-div">
                    <span className="lable">Bio</span>
                    <textarea
                        value={author.bio}
                        onChange={(e) => {
                            setAuthor(author => ({
                                ...author,
                                bio: e.target.value
                            }))
                        }}
                        required />
                </div>
                <input className="submit-btn" type="submit" value="Save" />
            </form>

            {
                successAlert && (authorAdded || authorUpdated) ?
                    <Alert severity="success"> "{author.name}" {authorAdded ? "added succesfuly" : authorUpdated ? "updated successfuly" : null}</Alert>
                    : null
            }

            {
                errors &&
                <Alert severity="error">{errors}</Alert>

            }
        </div>
    );
};

export default AddAuthor;

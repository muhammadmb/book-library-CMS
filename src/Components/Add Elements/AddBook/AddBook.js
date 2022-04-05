import React, { useCallback, useEffect, useState } from 'react';
import '../AddElemntsStyle.css';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import { useParams } from 'react-router-dom';
import axios from '../../../API/axios';
import { API_URL } from '../../../API/URLConstants';
import { Debounce } from '../../../Helper/Debounce';
import { useDispatch, useSelector } from 'react-redux';
import { editBook, insertBook } from '../../../Store/BooksSlice';
import LoadingAnimation from '../../../Loading/LoadingAnimation/LoadingAnimation';
import Alert from '@material-ui/lab/Alert';

const AddBook = (props) => {

    const [book, setBook] = useState({
        bookTitle: "",
        bookCover: "",
        publisher: "",
        dateOfPublish: "",
        numberOfBookPages: "",
        genreId: "",
        authorId: "",
        description: "",
        id: "",
        genre: {},
        author: {}
    });

    const tages = [
        "science",
        "magic",
        "mechanics",
        "fantasy",
        "novel",
        "children",
        "engineering",
        "technology",
        "history",
        "literature"
    ];

    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [openGenresOptions, setOpenGenresOptions] = useState(false);
    const [openAuthorsOptions, setOpenAuthorsOptions] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [genreValue, setGenreValue] = useState("");
    const [authorValue, setAuthorValue] = useState("");
    const { genreId, bookId } = useParams();
    const edit = genreId !== undefined || bookId !== undefined;
    const { bookUpdate, bookAdd, bookProccess, errors } = useSelector((state) => state.books);
    const dispatch = useDispatch();

    useEffect(() => {
        const getbooks = async () => {
            const book = await axios.get(`${API_URL}/Genres/${genreId}/Books/${bookId}`);
            setBook(book.data);
            setGenreValue(book.data?.genre?.genreName);
            setAuthorValue(book.data?.author?.name);
            setBook(book => ({
                ...book,
                genreId: book?.genre?.id,
                authorId: book?.author?.id
            }))
        }
        if (edit) {
            getbooks();
        }
    }, [genreId, bookId, edit]);

    const handleGenreChange = async (value) => {
        const genreSearch = await axios.get(`${API_URL}/Genres?fields=id,genreName&SearchQuery=${value}`);
        setGenres(genreSearch.data);
    }

    const handleAuthorChange = async (value) => {
        const authorSearch = await axios.get(`${API_URL}/Authors?fields=id,name&SearchQuery=${value}`);
        setAuthors(authorSearch.data);
    }

    const close = () => {
        setTimeout(() => {
            setSuccessAlert(false)
        }, 10000)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edit) {
            dispatch(editBook(book));
        } else {
            dispatch(insertBook(book));
        }
        if (errors === "" || errors === null) {
            setSuccessAlert(true);
            close();
        }
    }

    const handleClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(item => item !== tag));
        }
        else
            setSelectedTags([...selectedTags, tag]);
    };

    const DebouncedGenreChange = useCallback(Debounce(handleGenreChange), []);
    const DebouncedAuthorChange = useCallback(Debounce(handleAuthorChange), []);

    return (
        <>
            {
                bookProccess &&
                <div className='submit-change'>
                    <LoadingAnimation />
                </div>
            }
            <div className="page-container addition">

                <h2>
                    {props.header}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <span className="lable">Book's title</span>
                        <input
                            type="text"
                            value={book.bookTitle}
                            onChange={(e) => setBook(book => ({
                                ...book,
                                bookTitle: e.target.value
                            }))}
                            required
                        />
                    </div>

                    <div>
                        <span className="lable">Book's cover</span>
                        <input
                            type="url"
                            value={book.bookCover}
                            onChange={(e) => setBook(book => ({
                                ...book,
                                bookCover: e.target.value
                            }))}
                            required
                        />
                    </div>

                    <div>
                        <span className="lable">publisher</span>
                        <input
                            type="text"
                            value={book.publisher}
                            onChange={(e) => setBook(book => ({
                                ...book,
                                publisher: e.target.value
                            }))}
                            required
                        />
                    </div>

                    <div>
                        <span className="lable">date Of Publish</span>
                        <input
                            type="date"
                            value={book.dateOfPublish?.substring(0, 10)}
                            onChange={(e) => setBook(book => ({
                                ...book,
                                dateOfPublish: e.target.value
                            }))}
                            required
                        />
                    </div>

                    <div>
                        <span className="lable">pages</span>
                        <input
                            type="number"
                            value={book.numberOfBookPages}
                            onChange={(e) => setBook(book => ({
                                ...book,
                                numberOfBookPages: e.target.value
                            }))}
                            min={0}
                            step="1"
                            required
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
                                }, 100)
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
                                                setBook(book => ({
                                                    ...book,
                                                    genreId: genre.id
                                                }))
                                                setOpenGenresOptions(false)
                                            }}
                                        >
                                            {genre.genreName}
                                        </li>
                                    ))
                                }
                            </ul>
                        }
                    </div>

                    <div>
                        <span className="lable">author</span>
                        <input
                            type="text"
                            value={authorValue}
                            onChange={(event) => {
                                setAuthorValue(event.target.value);
                                DebouncedAuthorChange(event.target.value);
                            }}
                            onFocus={() => {
                                setOpenAuthorsOptions(true);
                            }}
                            onBlur={() => {
                                setTimeout(() => {
                                    setOpenAuthorsOptions(false);
                                }, 100)
                            }}
                            required
                        />
                        {
                            openAuthorsOptions &&
                            authors.length !== 0 &&
                            <ul className='options'>
                                {
                                    authors.map((author) => (
                                        <li
                                            key={author.id}
                                            onClick={() => {
                                                setAuthorValue(author.name);
                                                setBook(book => ({
                                                    ...book,
                                                    authorId: author.id
                                                }))
                                                setOpenAuthorsOptions(false)
                                            }}
                                        >
                                            {author.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        }
                    </div>

                    <div>
                        <span className="lable">tags</span>
                        {
                            tages.map((t) =>
                                <button
                                    type="button"
                                    key={tages.indexOf(t)}
                                    className={selectedTags.includes(t) ? 'primary' : 'outline'}
                                    onClick={() => handleClick(t)}
                                >
                                    {t}
                                    {
                                        selectedTags.includes(t) ?
                                            <CancelIcon className="chip-icon" />
                                            :
                                            <DoneIcon className="chip-icon" />
                                    }
                                </button>
                            )
                        }

                    </div>

                    <div className="textarea-div">
                        <span className="lable">description</span>
                        <textarea
                            value={book.description}
                            onChange={(e) => setBook(book => ({
                                ...book,
                                description: e.target.value
                            }))}
                            required
                        />
                    </div>
                    <input className="submit-btn" type="submit" value="Save" />

                </form>

                {
                    successAlert && (bookAdd || bookUpdate) ?
                        <Alert severity="success"> "{book.bookTitle}" {bookAdd ? "added succesfuly" : bookUpdate ? "updated successfuly" : null}</Alert>
                        : null
                }

                {
                    errors &&
                    <Alert severity="error">{errors}</Alert>

                }

            </div>
        </>
    )
}

export default AddBook;

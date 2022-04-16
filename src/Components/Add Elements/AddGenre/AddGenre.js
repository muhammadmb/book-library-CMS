import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from '../../../API/axios';
import { API_URL } from '../../../API/URLConstants';
import LoadingAnimation from '../../../Loading/LoadingAnimation/LoadingAnimation';
import { editGenre, insertGenre } from '../../../Store/GenresSlice';
import Alert from '@material-ui/lab/Alert';

const AddGenre = () => {

    const { genreId } = useParams();
    const [successAlert, setSuccessAlert] = useState(false);
    const { genreAdding, genreUpdating, errors, status } = useSelector((state) => state.genres)
    const dispatch = useDispatch();

    const [genre, setGenre] = useState({
        genreId,
        genreName: "",
        description: "",
        picUrl: "",
        addedDate: "",
        updateDate: ""
    });

    const close = () => {
        setTimeout(() => {
            setSuccessAlert(false)
        }, 10000)
    }

    useEffect(() => {
        const getGenre = async () => {
            const genreData = await axios.get(`${API_URL}/genres/${genreId}`);
            setGenre(genreData.data);
            setGenre(genre => ({
                ...genre,
                genreId
            }));
        }
        if (genreId) {
            getGenre();
        }
    }, [genreId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (genreId) {
            dispatch(editGenre(genre));
        } else {
            dispatch(insertGenre(genre))
        }
        if (errors === null) {
            setSuccessAlert(true);
            close();
        }
    }

    return (
        <>
            {
                (genreAdding || genreUpdating) &&
                <div className='submit-change'>
                    <LoadingAnimation />
                </div>
            }

            <div className="page-container addition">
                <h2>
                    {
                        genreId ? `Edit ${genre.genreName}` : "Add new genre"
                    }
                </h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <span className="lable">Name</span>
                        <input
                            type="text"
                            value={genre.genreName}
                            onChange={(e) => setGenre(genre => ({
                                ...genre,
                                genreName: e.target.value
                            }))}
                            required
                        />
                    </div>

                    <div>
                        <span className="lable">gener cover</span>
                        <input
                            type="text"
                            value={genre.picUrl}
                            onChange={(e) => setGenre(grenre => ({
                                ...genre,
                                picUrl: e.target.value
                            }))}
                            required
                        />
                    </div>

                    <div className="textarea-div">
                        <span className="lable">description</span>
                        <textarea
                            value={genre.description}
                            onChange={(e) => setGenre(genre => ({
                                ...genre,
                                description: e.target.value
                            }))}
                            required
                        />
                    </div>
                    <input className="submit-btn" type="submit" value="Save" />
                </form>
                {
                    successAlert && (status === 204 || status === 201) ?
                        <Alert severity="success"> "{genre.genreName}" {status === 201 ? "added succesfuly" : status === 204 ? "updated successfuly" : null}</Alert>
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

export default AddGenre;
import React, { useEffect, useState } from 'react';
import DeleteWindow from '../DeleteWindow/DeleteWindow';
import './CardStyle.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';

const Card = (props) => {

    const [Open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [del, setDelete] = useState(false);

    useEffect(() => {
        if (del === true) {
            const timer = setTimeout(() => {
                setTimeout(DeleteCard());
            }, 10000);
            return () => clearTimeout(timer);
        }
    });

    const DeleteCard = () => {
        if (del === true) {
            setOpenSnackbar(false);
            console.log('deleted');
        }
    }

    const handelUndo = () => {
        setDelete(false);
        setOpenSnackbar(false);
    }

    const handelDelete = () => {
        setDelete(true);
    }

    const handleClick = () => {
        setOpenSnackbar(true);
    };

    const handleClose = (event, reason) => {
        setOpenSnackbar(false);
    };

    const OpenWindow = () => {
        setOpen(true);
    };

    const CloseWindow = () => {
        setOpen(false);
    };

    return (
        <>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    {...props}
                    onClose={handleClose}
                    severity="warning"
                >
                    The book deleted
                    <button className="undo-btn" onClick={handelUndo}>
                        UNDO
                    </button>

                </MuiAlert>
            </Snackbar>
            <div className={del ? "card-container hide" : "card-container"}>

                {
                    Open ?
                        <>
                            <DeleteWindow
                                handleClick={handleClick}
                                CloseWindow={CloseWindow}
                                handelDelete={handelDelete}
                                booktitle={props.bookTitle}
                                genre={props.genre}
                            />

                        </>
                        : null
                }

                <span>
                    <a
                        href={`http://localhost:3001/genre/${props.genreId}/books/${props.bookId}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {props.bookTitle}
                    </a>
                </span>
                <span>{props.publisher}</span>
                <span>{props.genre}</span>

                <div className="btn-container">

                    <Link to={`/books-management/edit-book/genre/${props.genreId}/book/${props.bookId}`}>
                        <button
                            className="card-btn edit"
                        >
                            <i className="fa fa-pencil" aria-hidden="true"></i> edit
                        </button>
                    </Link>

                    <button
                        className="card-btn delete"
                        onClick={() => OpenWindow()}
                    >
                        <i className="fa fa-trash" aria-hidden="true"></i> delete
                    </button>

                </div>

            </div>
        </>

    )
}

export default Card;

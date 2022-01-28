import React, { useEffect, useState } from 'react';
import DeleteWindow from '../DeleteWindow/DeleteWindow';
import './CardStyle.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import { APP_URL } from '../API/URLConstants';

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
                    The {props.cardName} deleted
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
                                cardName={props.cardName}
                                genre={props.genre}
                                email={props.email}
                            />
                        </>
                        : null
                }

                {
                    props.pic ?
                        <div className="img-div">
                            <img className="card-img" src={props.pic} alt={props.cardName} />
                        </div>
                        :
                        null
                }

                {
                    props.cardName ?
                        <span>
                            <a
                                href={`${APP_URL}/${props.url}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {props.cardName.length > 50 ? props.cardName.substring(0, 50) + "....." : props.cardName}
                            </a>
                        </span>
                        :
                        null
                }

                {
                    props.genre ?
                        <span>{props.genre}</span>
                        :
                        null
                }

                {
                    props.publisher ?
                        <span>{props.publisher}</span>
                        :
                        null
                }

                {
                    props.reviewerName ?
                        <span>{props.reviewerName}</span>
                        :
                        null
                }

                {
                    props.email ?
                        <span>{props.email}</span>
                        :
                        null
                }

                {
                    props.upVote ?
                        <span>{props.upVote} vote UP</span>
                        :
                        null
                }

                {
                    props.downVote || props.downVote >= 0 ?
                        <span>{props.downVote} vote DOWN</span>
                        :
                        null
                }
                <div className="btn-container">

                    {
                        props.editPage ?

                            <Link
                                to={props.editPage}
                            >
                                <button className="card-btn edit">
                                    <i className="fa fa-pencil" aria-hidden="true"></i> edit
                                </button>
                            </Link>
                            :
                            null
                    }

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

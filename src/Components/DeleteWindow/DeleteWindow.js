import React, { useState } from 'react';
import './DeleteWindowStyle.css';

const DeleteWindow = ({ CloseWindow, booktitle, genre, handleClick, handelDelete }) => {

    const [able, setAble] = useState(false);

    const HandelInputChange = (e) => {
        if (e.target.value.toLowerCase() === `${genre}/${booktitle}`.toLowerCase()) {
            setAble(true);
        } else {
            setAble(false);
        }
    }

    const DeleteAction = () => {
        if (able) {
            CloseWindow();
            handleClick();
            handelDelete();
        }
    }

    return (
        <>
            <div
                className="delete-window"
                onClick={() => CloseWindow()}
            ></div>
            <div className="delete-confirm">
                <div>Are you absolutely sure?</div>
                <p className="window-header"><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> This action cannot be undone. This will permanently delete the {booktitle} book, reviews, comments, and rate.</p>
                <p className="assurance-message">Please type <span>{genre}/{booktitle}</span> to confirm.</p>

                <input type="text" onChange={(input) => HandelInputChange(input)} />

                <button className={able ? "card-btn delete" : "card-btn able"} onClick={() => DeleteAction()}>Delete</button>
                <button className="card-btn edit" onClick={() => CloseWindow()}>Cancel</button>
            </div>
        </>
    )
}

export default DeleteWindow;

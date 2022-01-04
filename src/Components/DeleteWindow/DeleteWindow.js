import React, { useState } from 'react';
import './DeleteWindowStyle.css';

const DeleteWindow = ({ CloseWindow, cardName, genre, handleClick, handelDelete, email }) => {

    const [able, setAble] = useState(false);

    const HandelInputChange = (e) => {
        if (email && e.target.value.toLowerCase() === `${email}`.toLowerCase()) {
            setAble(true);
        }
        else if (e.target.value.toLowerCase() === `${genre}/${cardName}`.toLowerCase()) {
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
                <p className="window-header"><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> This action cannot be undone. This will permanently delete the {cardName}</p>
                <p className="assurance-message">Please type <span>{email ? email : genre`/` + cardName}</span> to confirm.</p>

                <input type="text" onChange={(input) => HandelInputChange(input)} />

                <button className={able ? "card-btn delete" : "card-btn able"} onClick={() => DeleteAction()}>Delete</button>
                <button className="card-btn edit" onClick={() => CloseWindow()}>Cancel</button>
            </div>
        </>
    )
}

export default DeleteWindow;

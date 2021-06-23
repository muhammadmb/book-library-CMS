import React from 'react';
import './CardStyle.css';

const Card = (props) => {
    return (

        <div className="card-container">
            <span><a href={`http://localhost:3001/genre/${props.genreId}/books/${props.bookId}`} target="_blank" rel="noreferrer">{props.bookTitle}</a></span>
            <span>{props.publisher}</span>
            <span>{props.genre}</span>

            <div className="btn-container">

                <button
                    className="card-btn edit"
                >
                    <i className="fa fa-pencil" aria-hidden="true"></i> edit
                </button>

                <button
                    className="card-btn delete"
                >
                    <i className="fa fa-trash" aria-hidden="true"></i> delete
                </button>

            </div>

        </div>

    )
}

export default Card;

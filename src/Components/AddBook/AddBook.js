import React, { useState } from 'react';
import './AddBookStyle.css';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import { useParams } from 'react-router-dom';

const AddBook = (props) => {

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

    const [selectedTags, setSelectedTags] = useState([]);
    const params = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(item => item !== tag));
        }
        else
            setSelectedTags([...selectedTags, tag]);
    };

    return (
        <div className="add-book">

            <h2>
                {props.header}
            </h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <span className="lable">Book's title</span>
                    <input type="text" required />
                </div>

                <div>
                    <span className="lable">Book's cover</span>
                    <input type="url" required />
                </div>

                <div>
                    <span className="lable">publisher</span>
                    <input type="text" required />
                </div>

                <div>
                    <span className="lable">date Of Publish</span>
                    <input type="date" required />
                </div>

                <div>
                    <span className="lable">pages</span>
                    <input type="number" required />
                </div>

                <div>
                    <span className="lable">genre</span>
                    <input
                        type="text"
                        defaultValue={params.genreId}
                        required
                    />
                </div>

                <div>
                    <span className="lable">author</span>
                    <input type="text" required />
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
                    <textarea required />
                </div>

                <input className="submit-btn" type="submit" value="Save" />

            </form>

        </div>
    )
}

export default AddBook;

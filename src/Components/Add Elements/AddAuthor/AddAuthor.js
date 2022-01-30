import React from 'react';
import '../AddElemntsStyle.css';

const AddAuthor = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='page-container addition'>
            <h2>
                Add a new Author
            </h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <span className="lable">Name</span>
                    <input type="text" required />
                </div>

                <div>
                    <span className="lable">Picture</span>
                    <input type="url" required />
                </div>

                <div>
                    <span className="lable">Date Of Birth</span>
                    <input type="date" required />
                </div>

                <div>
                    <span className="lable">Date Of Death</span>
                    <input type="date" />
                </div>

                <div>
                    <span className="lable">genre</span>
                    <input
                        type="text"
                        required
                    />
                </div>

                <div className="textarea-div">
                    <span className="lable">Bio</span>
                    <textarea required />
                </div>

                <input className="submit-btn" type="submit" value="Save" />

            </form>
        </div>
    );
};

export default AddAuthor;

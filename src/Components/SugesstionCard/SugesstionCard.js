import React, { useState } from 'react';
import './SugesstionCardStyle.css';
import AddBook from '../AddBook/AddBook';

const SugesstionCard = (props) => {

    const [add, setAdd] = useState(false);

    const HandleAdd = () => {
        setAdd(!add);
    }

    const HandleDelete = (id) => {
        props.HandelDelete(id)
    }

    return (
        <div className='sugesstion-card'>
            <div className='sugesstion-details'>
                <div>
                    <div>
                        <span className="sg-lable">Book's title: </span>
                        <span className="sugesstion sg-lable">{props.BookTitle}</span>
                    </div>

                    <div>
                        <span className="sg-lable">Publisher: </span>
                        <span className="sugesstion sg-lable">{props.Publisher}</span>
                    </div>

                    <div>
                        <span className="sg-lable">Pages: </span>
                        <span className="sugesstion sg-lable">{props.Pages}</span>
                    </div>

                    <div>
                        <span className="sg-lable">Author: </span>
                        <span className="sugesstion sg-lable">{props.Author}</span>
                    </div>
                </div>

                <div>
                    <div>
                        <span className="sg-lable">Book's Cover: </span>
                        <span className="sugesstion sg-lable">{props.BookCover}</span>
                    </div>

                    <div>
                        <span className="sg-lable">Date Of Publish: </span>
                        <span className="sugesstion sg-lable">{JSON.stringify(props.DateOfPublish).substring(1, 11)}</span>
                    </div>

                    <div>
                        <span className="sg-lable">Genre: </span>
                        <span className="sugesstion sg-lable">{props.Genre}</span>
                    </div>

                    <div>
                        <span className="sg-lable">Description:</span>
                        <span className="sugesstion sg-lable">{props.Description}</span>
                    </div>

                </div>
            </div>

            {
                add ?
                    <AddBook />
                    :
                    <>
                        <button className='add' onClick={HandleAdd}>ADD</button>
                        <button className='delete' onClick={() => HandleDelete(props.id)}>DELETE</button>
                    </>
            }

        </div>
    );
};

export default SugesstionCard;

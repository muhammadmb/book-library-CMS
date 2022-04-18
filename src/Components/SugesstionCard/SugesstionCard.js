import React, { useState } from 'react';
import './SugesstionCardStyle.css';
import AddBook from '../Add Elements/AddBook/AddBook';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSuggestion } from '../../Store/SuggestionsSlice';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const SugesstionCard = ({ suggest }) => {

    const [add, setAdd] = useState(false);
    const { suggestions, headers, suggestionLoading } = useSelector((state) => state.suggestions);
    const dispatch = useDispatch();

    const HandleAdd = () => {
        setAdd(!add);
    }

    const HandleDelete = (id) => {
        dispatch(deleteSuggestion(id))
    }

    return (
        <>
            <div className='suggest-card'>
                <div className='suggest-details'>
                    <div>
                        <span className="sg-lable">Book's Title: </span>
                        <span className="suggest sg-lable">{suggest?.bookTitle}</span>
                    </div>

                    <div>
                        <span className="sg-lable">E-Mail: </span>
                        <span className="suggest sg-lable">{suggest?.email}</span>
                    </div>

                    <div>
                        <span className="sg-lable">Publisher: </span>
                        <span className="suggest sg-lable">{suggest?.publisher}</span>
                    </div>

                    <div>
                        <span className="sg-lable">Pages: </span>
                        <span className="suggest sg-lable">{suggest?.numberOfBookPages}</span>
                    </div>

                    <div>
                        <span className="sg-lable">Author: </span>
                        <span className="suggest sg-lable">{suggest?.author?.name}</span>
                    </div>

                    <div>
                        <span className="sg-lable">Genre: </span>
                        <span className="suggest sg-lable">{suggest?.genre?.genreName}</span>
                    </div>

                    <div>
                        <span className="sg-lable">Book's Cover: </span>
                        {
                            suggest?.bookCover &&
                            <img className="sg-img" src={suggest?.bookCover} alt={suggest?.bookTitle} title={suggest?.bookCover} />
                        }
                    </div>

                    <div>
                        <span className="sg-lable">Date Of Publish: </span>
                        <span className="suggest sg-lable">{suggest?.dateOfPublish?.substring(0, 4) === "0001" ? "" : suggest?.dateOfPublish?.substring(0, 10)}</span>
                    </div>

                    <div>
                        <span className="sg-lable">Added Date: </span>
                        <span className="suggest sg-lable">{suggest?.addedDate?.substring(0, 10)}</span>
                    </div>

                    <div>
                        <span className="sg-lable">Description:</span>
                        <span className="suggest sg-lable">{suggest?.description}</span>
                    </div>

                </div>
                {
                    add ?
                        <>
                            <AddBook bookData={suggest} />
                            <ArrowDropUpIcon
                                fontSize='large'
                                className='close-btn'
                                onClick={HandleAdd}
                                titleAccess="close"
                            />
                        </>
                        :
                        <div className='control-btn'>
                            <button className='add' onClick={HandleAdd}>ADD</button>
                            <button className='delete' onClick={() => HandleDelete(suggest.id)}>DELETE</button>
                        </div>
                }
            </div>
        </>
    );
};

export default SugesstionCard;

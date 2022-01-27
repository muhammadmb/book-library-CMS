import React, { useState } from 'react';
import './FeedbackCardStyle.css';
import LocalPostOfficeIcon from '@material-ui/icons/LocalPostOffice';
import DraftsIcon from '@material-ui/icons/Drafts';
import CloseIcon from '@material-ui/icons/Close';

const FeedbackCard = (props) => {

    const [readed, setReaded] = useState(props.read);
    const [readMore, setReadMore] = useState(props.details.length <= 150);
    const isNew = (
        props.date.getFullYear() === new Date().getFullYear() &&
        props.date.getMonth() === new Date().getMonth() &&
        props.date.getDate() === new Date().getDate()
    );

    const handleReaded = (id) => {
        setReaded(!readed);
        props.handelRead(id, readed);
    }

    const handelDelete = (id) => {
        props.handelDelete(id);
    }

    const handelReadMore = (id) => {
        setReadMore(true);
    }

    return (
        <>
            <div className={readed ? 'info-card read' : 'info-card'}>
                <div className="status">
                    <h3>{props.email}</h3>
                    <div className='readed'>
                        {
                            readed ?
                                <DraftsIcon
                                    titleAccess='mark as unread'
                                    className="icon"
                                    onClick={() => handleReaded(props.id)}
                                />
                                :
                                <>
                                    {
                                        isNew ?
                                            <span className='new'>
                                                NEW
                                            </span>
                                            :
                                            null
                                    }

                                    <LocalPostOfficeIcon
                                        titleAccess='mark as read'
                                        className="icon"
                                        onClick={() => handleReaded(props.id)}
                                    />
                                </>
                        }
                        <CloseIcon
                            titleAccess='delete message'
                            className='delete-icon'
                            onClick={() => handelDelete(props.id)}
                        />
                    </div>
                </div>

                <p className='details'>
                    {
                        readMore ?
                            props.details
                            :
                            <>
                                {JSON.stringify(props.details).substring(1, 150) + "... "}
                                <span className='read-more' onClick={() => handelReadMore(props.id)}>READ MORE</span>
                            </>
                    }

                </p>
                <span
                    className='date'
                >
                    {JSON.stringify(props.date).substring(3, 11)}
                </span>
            </div>

        </>
    );
};

export default FeedbackCard;

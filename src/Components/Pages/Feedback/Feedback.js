import React, { useState } from 'react';
import FeedbackCard from '../../FeedbackCard/FeedbackCard';
import MuiAlert from '@material-ui/lab/Alert';
import './FeedbackStyle.css';

const Feedback = () => {

    const [Data, setData] = useState([
        {
            id: 0,
            "email": "ABC@Example.com",
            "read": false,
            "date": new Date(),
            "details": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque excepturi dolor illo recusandae, molestiae, pariatur quibusdam maxime non expedita numquam omnis incidunt accusamus veritatis. Consequatur sequi deserunt quasi vitae voluptatem."
        },
        {
            id: 1,
            "email": "XYZ@Example.com",
            "read": false,
            "date": new Date(),
            "details": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque excepturi dolor illo recusandae, molestiae, pariatur quibusdam maxime non expedita numquam omnis incidunt accusamus veritatis. Consequatur sequi deserunt quasi vitae voluptatem."
        },
        {
            id: 2,
            "email": "QWE@Example.com",
            "read": false,
            "date": new Date(2022, 2, 27),
            "details": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque excepturi dolor illo recusandae, molestiae, pariatur quibusdam maxime non expedita numquam omnis incidunt accusamus veritatis. Consequatur sequi deserunt quasi vitae voluptatem."
        },
        {
            id: 3,
            "email": "TYT@Example.com",
            "read": true,
            "date": new Date(2022, 0, 21),
            "details": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque excepturi dolor illo recusandae, molestiae, pariatur quibusdam maxime non expedita numquam omnis incidunt accusamus veritatis. Consequatur sequi deserunt quasi vitae voluptatem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque excepturi dolor illo recusandae, molestiae, pariatur quibusdam maxime non expedita numquam omnis incidunt accusamus veritatis. Consequatur sequi deserunt quasi vitae voluptatem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque excepturi dolor illo recusandae, molestiae, pariatur quibusdam maxime non expedita numquam omnis incidunt accusamus veritatis. Consequatur sequi deserunt quasi vitae voluptatem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque excepturi dolor illo recusandae, molestiae, pariatur quibusdam maxime non expedita numquam omnis incidunt accusamus veritatis. Consequatur sequi deserunt quasi vitae voluptatem."
        }
    ]);

    const handelDelete = (id) => {
        setData(Data.filter(s => s.id !== id));
    }

    const handelRead = (id, read) => {
        if (!parseInt(id) >= Data.length) {
            Data[parseInt(id)].read = read;
        } else {
            Data[0].read = read;
        }
    }

    return (
        <div className='page-container'>
            {
                Data.length === 0 ? <MuiAlert severity="success">You have no Feedback Now!</MuiAlert> : null
            }

            {
                Data.map((s) => (
                    <div key={s.id}>
                        <FeedbackCard
                            email={s.email}
                            details={s.details}
                            id={s.id}
                            read={s.read}
                            date={s.date}
                            handelDelete={(id) => handelDelete(id)}
                            handelRead={(id, read) => handelRead(id, read)}
                        />
                    </div>
                ))
            }

        </div>
    );
};

export default Feedback;

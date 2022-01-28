import React, { useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import './SuggestionsPageStyle.css';
import SugesstionCard from '../../SugesstionCard/SugesstionCard';

function SuggestionsPage() {

    const [Data, setData] = useState([
        {
            id: 0,
            "BookTitle": "book1",
            "BookCover": "https://example.com",
            "Publisher": "x",
            "DateOfPublish": new Date(2022, 0, 10),
            "Pages": "520",
            "Genre": "x",
            "Author": "x",
            "Description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis facilis aut similique accusamus, voluptate ratione. Omnis aliquam architecto totam officiis distinctio maxime aspernatur voluptas debitis vitae, eum hic sapiente assumenda!"
        },
        {
            id: 1,
            "BookTitle": "book2",
            "BookCover": "https://example.com",
            "Publisher": "x",
            "DateOfPublish": new Date(2022, 0, 10),
            "Pages": "520",
            "Genre": "x",
            "Author": "x",
            "Description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis facilis aut similique accusamus, voluptate ratione. Omnis aliquam architecto totam officiis distinctio maxime aspernatur voluptas debitis vitae, eum hic sapiente assumenda!"
        },
        {
            id: 2,
            "BookTitle": "book3",
            "BookCover": "https://example.com",
            "Publisher": "x",
            "DateOfPublish": new Date(2022, 0, 10),
            "Pages": "520",
            "Genre": "x",
            "Author": "x",
            "Description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis facilis aut similique accusamus, voluptate ratione. Omnis aliquam architecto totam officiis distinctio maxime aspernatur voluptas debitis vitae, eum hic sapiente assumenda!"
        },
        {
            id: 3,
            "BookTitle": "book4",
            "BookCover": "https://example.com",
            "Publisher": "x",
            "DateOfPublish": new Date(2022, 0, 10),
            "Pages": "520",
            "Genre": "x",
            "Author": "x",
            "Description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis facilis aut similique accusamus, voluptate ratione. Omnis aliquam architecto totam officiis distinctio maxime aspernatur voluptas debitis vitae, eum hic sapiente assumenda!"
        },
        {
            id: 4,
            "BookTitle": "book5",
            "BookCover": "https://example.com",
            "Publisher": "x",
            "DateOfPublish": new Date(2022, 0, 10),
            "Pages": "520",
            "Genre": "x",
            "Author": "x",
            "Description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis facilis aut similique accusamus, voluptate ratione. Omnis aliquam architecto totam officiis distinctio maxime aspernatur voluptas debitis vitae, eum hic sapiente assumenda!"
        }
    ]);

    const HandelDelete = (id) => {
        setData(Data.filter(d => d.id !== id));
    }

    return (
        <div className="page-container">
            {
                Data.length === 0 ? <MuiAlert severity="success">You have no Suggestions Now!</MuiAlert> : null
            }

            {
                Data.map(s => (
                    <SugesstionCard
                        key={s.id}
                        id={s.id}
                        BookTitle={s.BookTitle}
                        BookCover={s.BookCover}
                        Publisher={s.Publisher}
                        Pages={s.Pages}
                        Author={s.Author}
                        DateOfPublish={s.DateOfPublish}
                        Description={s.Description}
                        Genre={s.Genre}
                        HandelDelete={(id) => HandelDelete(id)}
                    />
                ))
            }



        </div>


    )
}

export default SuggestionsPage;

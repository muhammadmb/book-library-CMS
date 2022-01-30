import React, { useState } from 'react';
import Card from '../../Card/Card';
import Search from '../../Search/Search';
import './AuthorsManagementStyle.css';

const AuthorsManagement = () => {

    const [authData, setAuthData] = useState([]);
    const searchData = (data) => {
        setAuthData(data);
    }

    return (
        <div className="page-container">
            <Search
                type="author"
                addUrl="/authors-management/add"
                data={searchData}
            />

            {
                authData.map((author) => (
                    <Card
                        key={author.authorId}
                        cardName={author.name}
                        authorId={author.id}
                        genre={author.genre}
                        pic={author.pictureUrl}
                    />
                ))
            }


        </div>
    )
}

export default AuthorsManagement;

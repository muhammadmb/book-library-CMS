import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../Card/Card';
import './BooksManagementStyle.css';

const BooksManagement = () => {
    return (
        <div className="bm-container">
            <div className="bm-header">
                <div className="search-area">
                    <input className="search" type="text" placeholder="search" />
                    <i className="fa fa-search" aria-hidden="true"></i>
                </div>

                <Link to="/books-management/add"><button className="btn-add">Add +</button></Link>
            </div>

            <hr />

            <Card bookTitle="Amar the brave" bookId="00000000-2222-0000-abcd-000000000000" genreId="00000000-0000-0000-abcd-000000000000" publisher="Noon" genre="Classics" />
            <Card bookTitle="Amar the brave" bookId="00000000-2222-0000-abcd-000000000000" genreId="00000000-0000-0000-abcd-000000000000" publisher="Noon" genre="Classics" />
            <Card bookTitle="Amar the brave" bookId="00000000-2222-0000-abcd-000000000000" genreId="00000000-0000-0000-abcd-000000000000" publisher="Noon" genre="Classics" />
            <Card bookTitle="Amar the brave" bookId="00000000-2222-0000-abcd-000000000000" genreId="00000000-0000-0000-abcd-000000000000" publisher="Noon" genre="Classics" />
            <Card bookTitle="Amar the brave" bookId="00000000-2222-0000-abcd-000000000000" genreId="00000000-0000-0000-abcd-000000000000" publisher="Noon" genre="Classics" />
            <Card bookTitle="Amar the brave" bookId="00000000-2222-0000-abcd-000000000000" genreId="00000000-0000-0000-abcd-000000000000" publisher="Noon" genre="Classics" />
            <Card bookTitle="Amar the brave" bookId="00000000-2222-0000-abcd-000000000000" genreId="00000000-0000-0000-abcd-000000000000" publisher="Noon" genre="Classics" />
            <Card bookTitle="Amar the brave" bookId="00000000-2222-0000-abcd-000000000000" genreId="00000000-0000-0000-abcd-000000000000" publisher="Noon" genre="Classics" />
            <Card bookTitle="Amar the brave" bookId="00000000-2222-0000-abcd-000000000000" genreId="00000000-0000-0000-abcd-000000000000" publisher="Noon" genre="Classics" />
            <Card bookTitle="Amar the brave" bookId="00000000-2222-0000-abcd-000000000000" genreId="00000000-0000-0000-abcd-000000000000" publisher="Noon" genre="Classics" />
            <Card bookTitle="Amar the brave" bookId="00000000-2222-0000-abcd-000000000000" genreId="00000000-0000-0000-abcd-000000000000" publisher="Noon" genre="Classics" />
            <Card bookTitle="A milion to one" bookId="00000000-1111-0000-abcd-000000000000" genreId="00000000-0000-0000-abcd-000000000000" publisher="Noon" genre="Classics" />
            <Card bookTitle="star nose" bookId="cb38f198-e143-4f4d-94f9-08d8f098cb1e" genreId="00000000-0000-0000-abcd-000000000000" publisher="Noon" genre="Classics" />
        </div>
    )
}

export default BooksManagement;

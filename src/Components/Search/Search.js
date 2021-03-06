import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchStyle.css';

const Search = (props) => {

    const [search, setSearch] = useState([]);

    const handelSearch = () => {
        props.searchQuery(search);
    }

    const handelKeyPress = e => {
        if (e.key === "Enter") {
            handelSearch();
        }
    }

    return (
        <div className="search-container">
            <div className="search-header">
                <div className="search-area">
                    <input
                        className="search-box"
                        type="search"
                        placeholder="search"
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyPress={handelKeyPress} />
                    <i
                        onClick={handelSearch}
                        className="fa fa-search"
                        aria-hidden="true"
                    ></i>
                </div>
                {
                    props.type !== "review" ?
                        <Link to={props.addUrl}><button className="btn-add">Add +</button></Link>
                        :
                        null
                }

            </div>

            <hr />
        </div>
    )
}

export default Search;

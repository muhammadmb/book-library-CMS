import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import './SuggestionsPageStyle.css';

function SuggestionsPage() {

    const [suggestionsData, setSuggestionsData] = useState([]);

    return (
        <div className="su-container">
            {
                suggestionsData.length == 0 ? <p>You have no Suggestions yet</p> : null
            }


            {
                suggestionsData.map((suggest) => (
                    <></>
                ))
            }

        </div>
    )
}

export default SuggestionsPage;

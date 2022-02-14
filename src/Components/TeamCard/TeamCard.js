import React, { useState } from 'react';
import './TeamCardStyle.css';

const TeamCard = () => {

    const [options, setOptions] = useState(false);
    const [rolls, setRolls] = useState(false);

    return (
        <div className='team-card-container'>
            <div>
                <div className="main-details">
                    <img
                        src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                        alt="profile"
                    />
                    <div>
                        <h3>Muhammad</h3>
                        <span>28 yrs, Male</span>
                    </div>

                </div>
                <i
                    className="fa fa-ellipsis-v"
                    aria-hidden="true"
                    onMouseEnter={() => setOptions(true)}
                    onMouseLeave={() => setOptions(false)}
                ></i>
                {
                    options &&
                    <ul className='drop-down'
                        onMouseEnter={() => setOptions(true)}
                        onMouseLeave={() => setOptions(false)}
                    >
                        {!rolls &&
                            <>
                                <li>Delete</li>
                                <li onClick={() => setRolls(true)} >Role {'>'}</li>
                            </>
                        }

                        {rolls &&
                            <>
                                <li onClick={() => setRolls(false)} >{'<'}</li>
                                <li>Master</li>
                                <li>Admin</li>
                                <li>Editor</li>
                            </>
                        }

                    </ul>
                }
            </div>

            <div>
                <span className='phone'>+31 0255 012 0110</span>
                <span>contact</span>
            </div>


            <div>
                <span>3 Feb 2017</span>
                <span>Editor</span>
            </div>

        </div>
    )
}

export default TeamCard;
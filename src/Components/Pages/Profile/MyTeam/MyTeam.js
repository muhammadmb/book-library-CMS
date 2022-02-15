import React from 'react';
import './MyTeamStyle.css';
import backgroundImg from '../../../../Images/b1.jpg';
import TeamCard from '../../../TeamCard/TeamCard';

const MyTeam = () => {
    return (
        <div
            className='page-container my-team-container'
        >
            <div
                className="team-header"
                style={{ "backgroundImage": `url(${backgroundImg})` }}
            >
            </div>

            <h2>Welcome to Bookers Team</h2>

            <div className="team-cards">
                <TeamCard />
                <TeamCard />
                <TeamCard />
                <TeamCard />
                <TeamCard />
                <TeamCard />
                <TeamCard />
                <TeamCard />
            </div>


        </div>
    )
}

export default MyTeam;
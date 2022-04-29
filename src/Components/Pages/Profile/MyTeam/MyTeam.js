import React, { useEffect } from 'react';
import './MyTeamStyle.css';
import backgroundImg from '../../../../Images/b1.jpg';
import TeamCard from '../../../TeamCard/TeamCard';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../../Store/UsersSlice';
import { getRoles } from '../../../../Store/RolesSlice';
import LoadingAnimation from '../../../../Loading/LoadingAnimation/LoadingAnimation';

const MyTeam = () => {

    const { users, usersLoading, errors } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getRoles());
    }, [dispatch]);

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
            <>
                {usersLoading && errors === null ?
                    <LoadingAnimation />
                    :
                    <div className="team-cards">
                        {
                            users.map((user) => (
                                <TeamCard
                                    key={user.id}
                                    user={user}
                                />
                            ))
                        }
                    </div>
                }
            </>
        </div>
    )
}

export default MyTeam;
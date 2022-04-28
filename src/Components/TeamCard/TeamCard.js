import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAge } from '../../Helper/GetAge';
import './TeamCardStyle.css';
import maleAvatar from '../../Images/male-avatar.png';
import femaleAvatar from '../../Images/female-avatar.png';
import { addUserToRole, deleteUser, removeUserFromRole } from '../../Store/UsersSlice';
import LoadingAnimation from '../../Loading/LoadingAnimation/LoadingAnimation';

const TeamCard = ({ user }) => {

    const [options, setOptions] = useState(false);
    const [roleOptions, setRoleOptions] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const { userDeleting } = useSelector((state => state.users));
    const { appRoles } = useSelector((state) => state.roles);
    const [userRole, setUserRole] = useState(user.roles);
    const dispatch = useDispatch();

    const handleRoleChange = (role) => {
        if (userRole.includes(role)) {
            setUserRole(userRole.filter(r => r !== role));
            dispatch(removeUserFromRole({
                role,
                email: user.email
            }));
        } else {
            setUserRole(userRole => [...userRole, role]);
            dispatch(addUserToRole({
                role,
                email: user.email
            }));
        }
    }

    const handleDelete = (email) => {
        dispatch(deleteUser(email))
        setDeleting(true);
    }

    const UserAge = () => {
        return (
            <span>
                {
                    user.dateOfBirth.substr(0, 4) !== "0001" &&
                    <>
                        {
                            GetAge(new Date(user.dateOfBirth.substr(0, 10)))
                        }
                        <> yrs, </>
                    </>
                }
                {user.gender}
            </span>
        )
    }

    const UserOptions = () => {
        return (
            <>
                {
                    options &&
                    <ul className='drop-down'
                        onMouseEnter={() => setOptions(true)}
                        onMouseLeave={() => setOptions(false)}
                    >
                        {!roleOptions ?
                            <>
                                <li onClick={() => handleDelete(user.email)} >Delete</li>
                                <li onClick={() => setRoleOptions(true)} >Role {'>'}</li>
                            </>
                            :
                            <>
                                <li onClick={() => setRoleOptions(false)} >{'<'}</li>
                                {
                                    appRoles.map((role) => (
                                        <li
                                            key={role.id}
                                            className=
                                            {
                                                userRole.includes(role.name) ?
                                                    "selected"
                                                    :
                                                    ""
                                            }
                                            onClick={() => handleRoleChange(role.name)}
                                        >
                                            {role.name}
                                        </li>
                                    ))
                                }

                            </>
                        }
                    </ul>
                }
            </>
        )
    }

    return (
        <>
            {
                (userDeleting && deleting) ?
                    <LoadingAnimation />
                    :
                    <div className='team-card-container'>
                        <div>
                            <div className="main-details">

                                <img
                                    src={
                                        user.pictureUrl ?
                                            user.pictureUrl
                                            :
                                            user.gender.toLowerCase() === "male" ?
                                                maleAvatar
                                                :
                                                femaleAvatar
                                    }
                                    alt="profile"
                                />

                                <div>
                                    <h3>{user.firstName}</h3>
                                    <UserAge />
                                </div>
                            </div>

                            <i
                                className="fa fa-ellipsis-v"
                                aria-hidden="true"
                                onMouseEnter={() => setOptions(true)}
                                onMouseLeave={() => setOptions(false)}
                            ></i>
                            <UserOptions />

                        </div>

                        <div>
                            {
                                user.phoneNumber &&
                                <>
                                    <span className='phone'>{user.phoneNumber}</span>
                                    <span>{user.email}</span>
                                </>
                            }
                        </div>

                        <div>
                            <span>{user.addedDate.substr(0, 10)}</span>
                            <span>{userRole.toString().replace(",", ", ")}</span>
                        </div>
                    </div>
            }

        </>
    )
}

export default TeamCard;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, getProfile } from "../../../Store/ProfileSlice";
import './ProfileStyle.css';
import maleAvatar from '../../../Images/male-avatar.png';
import femaleAvatar from '../../../Images/female-avatar.png';
import LoadingAnimation from "../../../Loading/LoadingAnimation/LoadingAnimation";

const Profile = () => {

  const dispatch = useDispatch();
  const [updatedProfile, setUpdatedProfile] = useState({});
  const { profile, status, profileUpdating, profileLoading, errors } = useSelector((state) => state.profile);
  const [changePic, setChangePic] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newProfile = [];
    if (Object.keys(updatedProfile).length > 0) {
      for (const key in updatedProfile) {
        newProfile.push({
          "op": "replace",
          "path": `/${key}`,
          "value": updatedProfile[key]
        })
      }
      dispatch(editProfile(newProfile));
    }
  }

  const isImage = (url) => {
    const img = new Image();
    img.src = url;
    if (img.complete) {
      return true;
    } else {
      img.onload = () => {
        return true;
      };
      img.onerror = () => {
        return false;
      };
    }
  }

  useEffect(() => {
    if (status === "") {
      dispatch(getProfile());
    }
  }, [dispatch, status]);

  return (
    <div className="page-container profile-container">
      {
        profileLoading ?
          <LoadingAnimation />
          :
          <div className="information">
            <h2>Edit Information</h2>
            <div className="profile-img">
              <img
                src={
                  changePic
                    ? updatedProfile.pictureUrl :
                    isImage(profile.pictureUrl) ?
                      profile.pictureUrl :
                      profile.gender?.toLowerCase() === "male" ?
                        maleAvatar :
                        femaleAvatar
                }
                alt={profile.firstName}
              />
              <button
                onClick={() => {
                  setChangePic(!changePic);
                  setUpdatedProfile(pro => ({
                    ...pro,
                    pictureUrl: profile.pictureUrl
                  }))
                }}
              >
                <i className="fa fa-camera" aria-hidden="true"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {
                changePic &&
                <input
                  type="url"
                  className="pic-input"
                  defaultValue={profile.pictureUrl}
                  onChange={(e) => setUpdatedProfile(pro => ({
                    ...pro,
                    pictureUrl: e.target.value
                  }))}
                />
              }

              <h3>Account Information</h3>

              <div className="lable">
                <span>First Name</span>
                <input
                  type="text"
                  defaultValue={profile.firstName}
                  onChange={(e) => setUpdatedProfile(pro => ({
                    ...pro,
                    firstName: e.target.value
                  }))}
                  required
                />
              </div>

              <div className="lable">
                <span>Last Name</span>
                <input
                  type="text"
                  defaultValue={profile.lastName}
                  onChange={(e) => setUpdatedProfile(pro => ({
                    ...pro,
                    lastName: e.target.value
                  }))}
                  required
                />
              </div>

              <div className="lable">
                <span>E-mail</span>
                <input
                  type="email"
                  defaultValue={profile.email}
                  onChange={(e) => setUpdatedProfile(pro => ({
                    ...pro,
                    email: e.target.value
                  }))}
                  required
                />
              </div>

              <div className="lable">
                <span>Role</span>
                <input type="text" defaultValue={profile?.roles?.toString().replace(",", ", ")} disabled={true} />
              </div>

              <div className="lable">
                <span>phone number</span>
                <input
                  type="phoneNumber"
                  defaultValue={profile.phoneNumber}
                  onChange={(e) => setUpdatedProfile(pro => ({
                    ...pro,
                    phoneNumber: e.target.value
                  }))}
                />
              </div>

              <div className="lable">
                <span>date of birth</span>
                <input
                  type="date"
                  defaultValue={profile.dateOfBirth?.substring(0, 10)}
                  onChange={(e) => setUpdatedProfile(pro => ({
                    ...pro,
                    dateOfBirth: e.target.value
                  }))}
                />
              </div>

              <div className="lable">
                <span>country</span>
                <input
                  type="text"
                  defaultValue={profile.country}
                  onChange={(e) => setUpdatedProfile(pro => ({
                    ...pro,
                    country: e.target.value
                  }))}
                />
              </div>

              <div className="lable">
                <span>address</span>
                <input
                  type="text"
                  defaultValue={profile.address}
                  onChange={(e) => setUpdatedProfile(pro => ({
                    ...pro,
                    address: e.target.value
                  }))}
                />
              </div>

              <div className="lable">
                <span>gender</span>
                <input
                  type="text"
                  defaultValue={profile.gender}
                  onChange={(e) => setUpdatedProfile(pro => ({
                    ...pro,
                    gender: e.target.value
                  }))}
                />
              </div>

              <div className="lable">
                <span>Join Date</span>
                <input
                  type="text"
                  defaultValue={profile.addedDate?.substring(0, 10)}
                  disabled={true}
                />
              </div>

              <div className="submit-button">
                <input
                  className={profileUpdating ? "hide" : ""}
                  type="submit"
                  value="Update"
                />
                <div className="load-row">
                  <div className={profileUpdating && errors === null ? "load-block-anim" : "load-block"}></div>
                  <div className={profileUpdating && errors === null ? "load-block-anim" : "load-block"}></div>
                  <div className={profileUpdating && errors === null ? "load-block-anim" : "load-block"}></div>
                </div>
              </div>

            </form>
          </div>
      }
    </div>
  );
};

export default Profile;
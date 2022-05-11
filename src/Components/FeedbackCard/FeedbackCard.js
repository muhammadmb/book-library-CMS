import React, { useEffect, useState } from "react";
import "./FeedbackCardStyle.css";
import LocalPostOfficeIcon from "@material-ui/icons/LocalPostOffice";
import DraftsIcon from "@material-ui/icons/Drafts";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch } from "react-redux";
import { deleteFeedback, editFeedback } from "../../Store/FeedbackSlice";

const FeedbackCard = ({ feedback }) => {
  const [readed, setReaded] = useState(feedback.isReaded);
  const [readMore, setReadMore] = useState(feedback.description?.length < 150);
  const isNew = (((new Date()).getTime() - new Date(feedback.addedDate).getTime()) / (1000 * 3600 * 24) < 7);
  const dispatch = useDispatch();

  const handleReaded = () => {
    setReaded(!readed);
  };

  useEffect(() => {
    dispatch(editFeedback({
      id: feedback.id,
      path: "isReaded",
      value: readed
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readed]);

  const handelDelete = () => {
    dispatch(deleteFeedback(feedback.id));
  };

  const handelReadMore = () => {
    setReadMore(true);
  };

  return (
    <div
      className={readed ? "info-card read" : "info-card"}
    >
      <div className="status">
        <h3>{feedback.email}</h3>
        <div className="readed">
          {
            readed ?
              (
                <DraftsIcon
                  titleAccess="mark as unread"
                  className="icon"
                  onClick={handleReaded}
                />
              )
              :
              (
                <>
                  {
                    isNew &&
                    <span className="new">NEW</span>
                  }
                  <LocalPostOfficeIcon
                    titleAccess="mark as read"
                    className="icon"
                    onClick={handleReaded}
                  />
                </>
              )
          }
          <CloseIcon
            titleAccess="delete message"
            className="delete-icon"
            onClick={handelDelete}
          />
        </div>
      </div>

      <p className="details">
        {
          readMore ? (feedback.description)
            :
            (
              <>
                {JSON.stringify(feedback.description).substring(1, 150) + "... "}
                <span
                  className="read-more"
                  onClick={handelReadMore}
                >
                  READ MORE
                </span>
              </>
            )
        }
      </p>
      <span className="date">
        {JSON.stringify(feedback.addedDate).substring(3, 11)}
      </span>
    </div>
  );
};

export default FeedbackCard;

import { useState } from "react";
import "./CommentFilled.css";
import CommentForm from "./CommentForm";

function CommentFilled(props) {
  const [score, setScore] = useState(props.score);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState();
  const [showEditForm, setShowEditForm] = useState(false);
  const [editText, setEditText] = useState();

  function handleReplyButton() {
    setReplyText(`@${props.username} `);
    setShowReplyForm(true);
  }

  function handleDeleteButton() {
    props.setShowModalDelete(true);
    props.setDeleteID(props.id);
  }

  function handleEditButton() {
    setEditText(
      props.replyingTo ? `@${props.replyingTo} ${props.text}` : props.text
    );
    setShowEditForm(true);
  }

  return (
    <div>
      <div
        className={`comment-box ${props.replyingTo ? "reply-comment" : ""}`}
        id={props.id}
      >
        <div className="comment-box__score">
          <div className="plus-bg" onClick={() => setScore(score + 1)}>
            <svg
              className="icon-score plus"
              width="11"
              height="11"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" />
            </svg>
          </div>
          <p className="score">{score}</p>
          <div className="minus-bg" onClick={() => setScore(score - 1)}>
            <svg
              className="icon-score minus"
              width="11"
              height="3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" />
            </svg>
          </div>
        </div>
        <div className="comment-box__wrapper">
          <div className="comment-box__user">
            <img src={props.userImg} alt="user" className="user-image" />
            <p className="username">{props.username}</p>
            {props.username === "juliusomo" && <p className="you-label">you</p>}
            <p className="date">{props.date}</p>
            {props.username === "juliusomo" && (
              <div className="delete-wrapper modify-phone">
                <svg
                  className="icon-delete"
                  width="12"
                  height="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" />
                </svg>
                <p className="delete" onClick={handleDeleteButton}>
                  Delete
                </p>
              </div>
            )}
            {props.username === "juliusomo" && (
              <div className="edit-wrapper modify-phone">
                <svg
                  className="icon-edit"
                  width="14"
                  height="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" />
                </svg>
                <p className="edit" onClick={handleEditButton}>
                  Edit
                </p>
              </div>
            )}
            {props.username !== "juliusomo" && (
              <div className="reply-wrapper">
                <svg
                  className="icon-reply"
                  width="14"
                  height="13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" />
                </svg>
                <p className="reply" onClick={handleReplyButton}>
                  Reply
                </p>
              </div>
            )}
          </div>
          {!showEditForm && (
            <p className="comment-box__content">
              {props.replyingTo && (
                <span className="comment-box__reply-to">
                  @{props.replyingTo}
                </span>
              )}
              <span className="comment-box__text">{" " + props.text}</span>
            </p>
          )}
          {showEditForm && (
            <CommentForm
              btnValue="update"
              textareaValue={editText}
              setTextareaValue={setEditText}
              showEditForm={showEditForm}
              setShowEditForm={setShowEditForm}
              index={props.index}
              username={props.username}
              replyingTo={props.replyingTo}
              text={props.text}
              setCommentsData={props.setCommentsData}
            />
          )}
        </div>
      </div>
      {showReplyForm && (
        <CommentForm
          btnValue="reply"
          textareaValue={replyText}
          setTextareaValue={setReplyText}
          showReplyForm={showReplyForm}
          setShowReplyForm={setShowReplyForm}
          index={props.index}
          username={props.username}
          replyingTo={props.replyingTo}
          setCommentsData={props.setCommentsData}
        />
      )}
    </div>
  );
}

export default CommentFilled;

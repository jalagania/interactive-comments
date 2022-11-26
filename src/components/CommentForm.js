import "./CommentForm.css";
import { useEffect, useRef } from "react";
import { data } from "../data";

function CommentForm(props) {
  const textareaRef = useRef();

  function autoGrow(field) {
    if (field.scrollHeight > field.clientHeight) {
      field.style.height = `${field.scrollHeight}px`;
    } else {
      field.style.height = "100px";
    }
  }

  useEffect(() => {
    autoGrow(textareaRef.current);
  }, [props.showEditForm, props.textareaValue]);

  function getTime() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function handleTextareaChange(event) {
    props.setTextareaValue(event.target.value);
  }

  function handelCommentSubmit(event) {
    event.preventDefault();
    if (props.textareaValue.trim() !== "") {
      if (event.target.textContent === "send") {
        props.setCommentsData((prevState) => {
          return {
            ...prevState,
            comments: [
              ...prevState.comments,
              {
                id: prevState.comments.length + 1,
                content: props.textareaValue.trim(),
                createdAt: `${getTime()} Today`,
                score: 0,
                user: {
                  image: {
                    png: "./images/avatars/image-juliusomo.png",
                  },
                  username: "juliusomo",
                },
              },
            ],
          };
        });
        props.setTextareaValue("");
      }

      if (
        event.target.textContent === "reply" &&
        props.textareaValue.trim() !== `@${props.username}`
      ) {
        props.setShowReplyForm(false);
        props.setCommentsData((prevState) => {
          return {
            ...prevState,
            comments: [
              ...prevState.comments.slice(0, props.index + 1),
              {
                id: Math.random() * 1000,
                content:
                  props.textareaValue.split(" ")[0] === `@${props.username}`
                    ? props.textareaValue.split(" ").slice(1).join(" ").trim()
                    : props.textareaValue.trim(),
                createdAt: `${getTime()} Today`,
                score: 0,
                replyingTo: props.username,
                user: {
                  image: {
                    png: "./images/avatars/image-juliusomo.png",
                  },
                  username: "juliusomo",
                },
              },
              ...prevState.comments.slice(props.index + 1),
            ],
          };
        });
      }

      if (
        event.target.textContent === "update" &&
        props.textareaValue.trim() !== `@${props.replyingTo}`
      ) {
        props.setShowEditForm(false);
        props.setCommentsData((prevState) => {
          return {
            ...prevState,
            comments: [
              ...prevState.comments.slice(0, props.index),
              {
                ...prevState.comments[props.index],
                content:
                  props.textareaValue.split(" ")[0] === `@${props.replyingTo}`
                    ? props.textareaValue.split(" ").slice(1).join(" ").trim()
                    : props.textareaValue.trim(),
                createdAt: `${getTime()} Today (edited)`,
              },
              ...prevState.comments.slice(props.index + 1),
            ],
          };
        });
      }
    }
  }

  return (
    <form
      className={`add-comment-box ${props.showReplyForm ? "margin-top" : ""} ${
        props.replyingTo && props.showReplyForm ? "reply-comment" : ""
      } ${props.showEditForm ? "padding-zero" : ""}`}
    >
      <div
        className={`add-comment-wrapper ${
          props.showEditForm ? "flex-column" : ""
        }`}
      >
        <img
          src={data.currentUser.image.png}
          alt={data.currentUser.username}
          className={`image-current-user ${props.showEditForm ? "hidden" : ""}`}
        />
        <textarea
          autoFocus
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length
            )
          }
          ref={textareaRef}
          className="add-comment-field"
          placeholder={props.placeholder}
          value={props.textareaValue}
          onChange={handleTextareaChange}
          onKeyUp={() => autoGrow(textareaRef.current)}
        ></textarea>
        <button className="btn btn-submit" onClick={handelCommentSubmit}>
          {props.btnValue}
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
